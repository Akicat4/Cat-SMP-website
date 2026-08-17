const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Reusable styling for all pages to keep it consistent
const siteStyles = `
  <style>
    body {
      background-color: #1a1a1a;
      color: #ffffff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      text-align: center;
      padding: 50px 20px;
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
      margin: 0 auto 50px auto;
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
    .content-box {
      max-width: 600px;
      margin: 0 auto;
      text-align: left;
      background-color: #242424;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.4);
    }
    .content-box h2 {
      color: #ffcc00;
      text-align: center;
      margin-top: 0;
    }
    .back-home {
      display: inline-block;
      margin-top: 30px;
      color: #ffcc00;
      text-decoration: none;
      font-weight: bold;
    }
    .back-home:hover {
      text-decoration: underline;
    }
    .ad-container {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
  </style>
`;

// Reusable Adsterra banner snippet function to keep code clean
const adBannerHTML = `
  <div class="ad-container">
    <script>
      atOptions = {
        'key' : '6d1d513e7029b77d54e1471992ff0468',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    </script>
    <script src="https://www.highperformanceformat.com/6d1d513e7029b77d54e1471992ff0468/invoke.js"></script>
  </div>
`;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat SMP</title>
      ${siteStyles}
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

      <div class="content-box">
        <h2>🐱 How to Join CAT SMP</h2>
        <p style="text-align: center; margin-bottom: 20px;">Cat SMP is a survival Minecraft server with many features!</p>
        
        <p><strong>IP:</strong> CatSMPgg.aternos.me<br>
        <strong>Bedrock Port:</strong> 34018</p>

        <h3 style="color: #4CAF50;">💻 Java</h3>
        <ol style="color: #cccccc; line-height: 1.6;">
          <li>Open Minecraft Java.</li>
          <li>Go to Multiplayer → Add Server.</li>
          <li>Put <strong>CatSMPgg.aternos.me</strong> in the Server Address.</li>
          <li>Click Done and join the server.</li>
        </ol>

        <h3 style="color: #4CAF50;">📱 Bedrock</h3>
        <ol style="color: #cccccc; line-height: 1.6;">
          <li>Open Minecraft Bedrock.</li>
          <li>Go to Play → Servers → Add Server.</li>
          <li>Server Address: <strong>CatSMPgg.aternos.me</strong></li>
          <li>Port: <strong>34018</strong></li>
          <li>Save it and join.</li>
        </ol>

        <h3 style="color: #4CAF50;">🎮 PlayStation (Bedrock Online)</h3>
        <ol style="color: #cccccc; line-height: 1.6;">
          <li>Download/open Bedrock Online on your phone.</li>
          <li>Make sure your phone and PlayStation are on the same Wi-Fi.</li>
          <li>Add the server in Bedrock Online:
            <ul>
              <li>IP: CatSMPgg.aternos.me</li>
              <li>Port: 34018</li>
            </ul>
          </li>
          <li>Start the connection in Bedrock Online.</li>
          <li>Open Minecraft on your PlayStation.</li>
          <li>Go to Play → Worlds.</li>
          <li>You should see the Bedrock Online world there.</li>
          <li>Join it and you should be on CAT SMP.</li>
        </ol>

        <p style="text-align: center; margin-top: 30px; font-weight: bold; color: #ffcc00;">That’s it, enjoy CAT SMP 🐱</p>
      </div>
    </body>
    </html>
  `);
});

// Shop Main Route with Buttons and Banner inside a content box
app.get('/shop', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat SMP - Store</title>
      ${siteStyles}
    </head>
    <body>
      <h1>Cat SMP Store</h1>
      <p>Support the server and get cool perks!</p>
      
      <div class="content-box">
        <h2>🛍️ Server Store</h2>
        <div class="button-container" style="margin-top: 20px;">
          <a href="/shop/currency" class="btn">Currency</a>
          <a href="/shop/rank" class="btn">Rank</a>
          <a href="/shop/coming-soon" class="btn">Coming soon</a>
        </div>
        ${adBannerHTML}
      </div>
      
      <a href="/" class="back-home">← Back to Home</a>
    </body>
    </html>
  `);
});

// Shop Sub-Route: Currency
app.get('/shop/currency', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat SMP - Currency</title>
      ${siteStyles}
    </head>
    <body>
      <h1>Store - Currency</h1>
      <p>In-game currency items.</p>
      
      <div class="content-box">
        <h2>💰 Currency</h2>
        <p style="text-align: center; color: #cccccc;">This is empty, please comeback later!</p>
      </div>
      
      <br>
      <a href="/shop" class="back-home">← Back to Store</a>
    </body>
    </html>
  `);
});

// Shop Sub-Route: Rank
app.get('/shop/rank', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat SMP - Rank</title>
      ${siteStyles}
    </head>
    <body>
      <h1>Store - Ranks</h1>
      <p>Unlock awesome server ranks!</p>
      
      <div class="content-box">
        <h2>👑 Rank</h2>
        <p style="text-align: center; color: #cccccc;">Working on it, please comeback.</p>
      </div>
      
      <br>
      <a href="/shop" class="back-home">← Back to Store</a>
    </body>
    </html>
  `);
});

// Shop Sub-Route: Coming Soon (Empty black page)
app.get('/shop/coming-soon', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat SMP - Coming Soon</title>
      <style>
        body {
          background-color: #1a1a1a;
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
    </body>
    </html>
  `);
});

// Vote Route with Banner inside the content box
app.get('/vote', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat SMP - Vote</title>
      ${siteStyles}
    </head>
    <body>
      <h1>Vote for Cat SMP</h1>
      <p>Support the server by voting on our links!</p>
      
      <div class="content-box">
        <h2>⭐ Voting Links</h2>
        <p style="text-align: center; color: #cccccc;">Voting links will be added here soon so you can earn rewards in-game!</p>
        ${adBannerHTML}
      </div>
      
      <br>
      <a href="/" class="back-home">← Back to Home</a>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Cat SMP server is running on port ${PORT}`);
});
           
