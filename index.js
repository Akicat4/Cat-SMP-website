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
          flex-direction: column;
          align-items: center;
          gap: 15px;
          max-width: 300px;
          margin: 0 auto;
        }
        .btn {
          background-color: #ffcc00;
          color: #1a1a1a;
          width: 100%;
          padding: 15px 0;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: bold;
          border-radius: 8px;
          transition: background 0.2s, transform 0.2s;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
          display: inline-block;
        }
        .btn:hover {
          background-color: #e6b800;
          transform: translateY(-2px);
        }
      </style>
    </head>
    <body>
      <h1>Cat SMP</h1>
      <p>Welcome to the official Cat SMP website! Jump into the action below.</p>
      
      <div class="button-container">
        <a href="https://discord.gg/YZTjWw3h9" target="_blank" class="btn">Join Discord</a>
        <a href="https://cat-01.onrender.com" target="_blank" class="btn">Server Status</a>
        <a href="/shop" class="btn">Store</a>
        <a href="/vote" class="btn">Vote</a>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Cat SMP server is running on port ${PORT}`);
});
