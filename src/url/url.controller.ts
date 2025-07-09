import { Controller, Body, Get, Post, Param, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { Response } from 'express';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUrlDto } from './dto/create-url.dto';

@ApiTags('URLs')
@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('api/shorten')
  @ApiOperation({ summary: 'Create a short URL for a given original URL' })
  @ApiBody({ type: CreateUrlDto })
  @ApiResponse({ status: 201, description: 'Short URL created successfully' })
  async createShortUrl(@Body() createUrlDto: CreateUrlDto) {
    const url = await this.urlService.create(createUrlDto);
    const shortUrl = `${process.env.BASE_URL}/r/${url.shortUrl}`;
    return {
      message: 'Short URL created successfully',
      shortUrl,
      originalUrl: url.originalUrl,
    };
  }

  @Get('r/:shortUrl')
  @ApiOperation({ summary: 'Redirect to original URL by short URL code' })
  @ApiParam({ name: 'shortUrl', description: 'Short URL code to redirect' })
  @ApiResponse({ status: 302, description: 'Redirection to original URL' })
  @ApiResponse({ status: 404, description: 'URL not found' })
  async redirect(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    const url = await this.urlService.findAndIncrement(shortUrl);
    if (url) {
      return res.redirect(url.originalUrl);
    }
    return res.status(404).send('URL not found');
  }

  @Get('api/stats/:shortUrl')
  @ApiOperation({ summary: 'Get analytics for a short URL' })
  @ApiParam({ name: 'shortUrl', description: 'Short URL code' })
  @ApiResponse({ status: 200, description: 'URL stats retrieved successfully' })
  @ApiResponse({ status: 404, description: 'URL not found' })
  async getStats(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    const url = await this.urlService.getStats(shortUrl);
    if (url) {
      const fullShortUrl = `${process.env.BASE_URL}/r/${url.shortUrl}`;
      return res.status(200).json({
        originalUrl: url.originalUrl,
        shortUrl: fullShortUrl,
        clicks: url.count,
        createdAt: url.createdAt,
      });
    }
    return res.status(404).send('URL not found');
  }
}
