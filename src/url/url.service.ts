import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './schemas/url.schema'; // assuming schema is in ./schemas/url.schema
import { CreateUrlDto } from './dto/create-url.dto';
import { nanoid } from 'nanoid';
@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private readonly urlModel: Model<Url>) {}

  async findAndIncrement(shortUrl: string): Promise<Url | null> {
    return this.urlModel
      .findOneAndUpdate({ shortUrl }, { $inc: { count: 1 } }, { new: true })
      .exec();
  }

  async create(createUrlDto: CreateUrlDto): Promise<Url> {
    const shortUrl = this.generateShortCode();
    const newUrl = new this.urlModel({
      originalUrl: createUrlDto.originalUrl,
      shortUrl,
    });
    return newUrl.save();
  }

  private generateShortCode(): string {
    return nanoid(8);
  }

  async getStats(shortUrl: string): Promise<Url | null> {
    return this.urlModel.findOne({ shortUrl }).exec();
  }
}
