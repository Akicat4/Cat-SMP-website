const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat SMP</title>
      <style>
        body {
          background-color: #1a1a1a;
          color: #ffffff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          text-align: center;
          padding-top: 50px;
        }
        h1 {
          color: #ffcc00;
          font-size: 3rem;
          margin-bottom: 10px;
        }
        p {
          color: #b0b0b0;
          font-size: 1.2rem;
          margin-bottom: 40px;
        }
        .button-container {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .btn {
          background-color: #4CAF50;
          color: white;
          padding: 15px 30px;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: bold;
          border-radius: 8px;
          transition: background 0.2s, transform 0.2s;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        }
        .btn:hover {
          background-color: #45a049;
          transform: translateY(-2px);
        }
        .btn-shop { background-color: #2196F3; }
        .btn-shop:hover { background-color: #0b7dda; }
        .btn-vote { background-color: #ff9800; }
        .btn-vote:hover { background-color: #e68900; }
      </style>
    </head>
    <body>
      <h1>Cat SMP</h1>
      <p>Welcome to the official Cat SMP website! Jump into the action below.</p>
      
      <div class="button-container">
        <a href="#" class="btn" onclick="alert('Server IP copied: play.catsmp.com')">Copy Server IP</a>
        <a href="/shop" class="btn btn-shop">Store</a>
        <a href="/vote" class="btn btn-vote">Vote</a>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Cat SMP server is running on port ${PORT}`);
});
