# 🔗 URL Shortener API

A RESTful URL Shortener service built with **NestJS**, **MongoDB**, and **Mongoose**.  
It allows users to shorten long URLs, create custom short codes, redirect using the short URL, and get analytics (click count, creation date).

---

## 🚀 Features

- Shorten long URLs
- Generate custom short codes (optional)
- Redirect to original URL via short URL
- Track number of clicks
- View analytics for each short URL
- API documentation using Swagger

---

## 🛠 Tech Stack

- **Backend Framework**: NestJS
- **Database**: MongoDB
- **ODM**: Mongoose
- **API Docs**: Swagger 
---

## 📦 Installation

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
npm install
```
## ⚙️ Environment Variables

- Create a .env file in the root with
```bash
MONGODB_URI=mongodb://localhost:27017/url-shortener
BASE_URL=http://localhost:8000
PORT=8000
```
- Update BASE_URL accordingly when deploying (e.g., on Render).

## 🚨 Swagger API Docs

- Available at:
```bash
GET https://url-shortener-backend-ygx6.onrender.com/docs
```

## 🚀 Running the App
```bash
# development
npm run start:dev

# production
npm run build
npm run start:prod
```

## 🧪 API Endpoints

- ➕ POST /api/shoten
```bash
POST https://url-shortener-backend-ygx6.onrender.com/api/shorten

Request Body:
{
  "originalUrl": "https://example.com",
}
```

- 🔁 GET /r/:shortCode

Redirect to original URL by short url.
e.g. http://localhost:8000/r/abc123
```bash
GET https://url-shortener-backend-ygx6.onrender.com/r/:shortCode
```

- 📊 GET /api/stats/:shortCode
  Get analytics (click count, createdAt)
```bash
GET https://url-shortener-backend-ygx6.onrender.com/api/stats/:shortCode

Response:
{
  "originalUrl": "https://example.com",
  "shortUrl": "http://localhost:8000/r/abc123",
  "clicks": 5,
  "createdAt": "2025-07-09T08:58:16.874Z"
}

```

## 🌐 Deployment (Render)
```
Build Command:
npm install && npm run build

Start Command:
npm run start:prod
```
## Set Environment Variables on Render:
- MONGODB_URI=your-mongo-uri
- BASE_URL=https://your-app-name.onrender.com
- PORT=10000 (or keep it default)

📺 Live Deployment:
🌍 Deployed Link: https://url-shortener-backend-ygx6.onrender.com

📹 Loom Video Walkthrough
▶️ Video Demo: https://www.loom.com/share/3f9a466a544844c89ef9da356999079e?sid=bcc10f19-6c2d-47b4-8700-9e87605f1b3f



