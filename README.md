<div align="center">

  <div>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge" alt="JavaScript Badge" />
    <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=for-the-badge" alt="Express Badge" />
    <img src="https://img.shields.io/badge/API-4B8BBE?style=for-the-badge" alt="API Badge" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge" alt="MongoDB Badge" />
    <img src="https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white&style=for-the-badge" alt="Mongoose Badge" />
    <img src="https://img.shields.io/badge/Microservices-FF6F00?style=for-the-badge" alt="Microservices Badge" />

  </div>

  <h3 align="center">Stock Market App — API in Express</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. ✨ [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🔗 [Assets](#links)
6. 🚀 [More](#more)

## 🚨 Intro

This repository contains the API written for the stock analyser app I written in Vue JS.

[Here's the link to the front-end for this application.](https://github.com/Apfirebolt/vue_stock_tracker)

Initially I planned to write this API in FastAPI using Python but for some reasons I went with Express. It was quite long stretch since I last worked in Express, wanted to get hands-on experience with Express using MongoDB as database.

## <a name="introduction">✨ Introduction</a>

AI-powered modern stock market app built with Vue.js, Tailwind CSS and Headless UI. Track real-time prices, set personalized alerts, explore company insights, and manage watchlists. The admin dashboard allows managing stocks, publishing news, and monitoring user activity, while event-driven workflows power automated alerts, AI-driven daily digests, earnings notifications, and sentiment analysis—perfect for devs who want a dynamic, real-time financial platform.

If you're getting started and need assistance or face any bugs, please reach out to me via email at [aspper20@gmail.com](mailto:aspper20@gmail.com) or visit my portfolio website at [https://apgiiit.com](https://apgiiit.com).

## <a name="tech-stack">⚙️ Tech Stack</a>

- **[Better Auth](https://www.better-auth.com/)** is a framework-agnostic authentication and authorization library for TypeScript. It provides built-in support for email/password login, social sign-on (Google, GitHub, Apple, and more), and multi-factor authentication, simplifying user authentication and account management.

- **[Finnhub](https://finnhub.io/)** is a real-time financial data API that provides stock, forex, and cryptocurrency market data. It offers developers access to fundamental data, economic indicators, and news, making it useful for building trading apps, dashboards, and financial analysis tools.

- **[MongoDB](https://www.mongodb.com/)** is a flexible, high-performance NoSQL database. It stores data in JSON-like documents, supports dynamic schemas, and provides robust features for scalability, replication, and querying.

- **[Nodemailer](https://nodemailer.com/)** is a Node.js library for sending emails easily. It supports various transport methods such as SMTP, OAuth2, and third-party services, making it a reliable tool for handling transactional emails, notifications, and contact forms in applications.

- **[Vue.js](https://vuejs.org/)** is a progressive JavaScript framework for building user interfaces and single-page applications. It features a reactive data-binding system, component-based architecture, and a gentle learning curve, making it ideal for both small projects and large-scale applications.

- **[TailwindCSS](https://tailwindcss.com/)** is a utility-first CSS framework that allows developers to build custom, responsive designs quickly without leaving their HTML. It provides pre-defined classes for layout, typography, colors, and more.

## <a name="features">🔋 Features</a>

👉 **Stock Dashboard**: Track real-time stock prices with interactive line and candlestick charts, including historical data, and filter stocks by industry, performance, or market cap.

👉 **Powerful Search**: Quickly find the best stocks with an intelligent search system that helps you navigate through Signalist.

👉 **Company Insights**: Explore detailed financial data such as PE ratio, EPS, revenue, recent news, filings, analyst ratings, and sentiment scores for informed decision-making.

👉 **Analytics & Insights**: Gain insights into user behavior, stock trends, and engagement metrics, enabling smarter business and trading decisions.

👉 **Class Diagrams in Python**: Some low-level class diagrams in Python which simulates properties and methods for stocks, portfolio, users and accounts.

And many more, including code architecture and reusability.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/adrianhajdin/signalist_stock-tracker-app.git
cd signalist_stock-tracker-app
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
MONGO_URI="mongodb://localhost/express-stock"
JWT_SECRET="somesupersecret"
NODE_ENV="production"
```

**Running the Project**

```bash
npm run server
```
The API Should be running on port 5000 in your system.

## <a name="more">🚀 More</a>

**Check by blog for more updates**

Enjoyed creating this project? Dive deeper into some of my other projects on my blog. Give it a go!