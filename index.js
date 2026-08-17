const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Reusable styling with a custom CSS Cat Fur pattern background
const siteStyles = `
  <style>
    body {
      background-color: #c88a51;
      background-image: 
        linear-gradient(45deg, rgba(160, 90, 40, 0.4) 25%, transparent 25%), 
        linear-gradient(-45deg, rgba(160, 90, 40, 0.4) 25%, transparent 25%), 
        linear-gradient(45deg, transparent 75%, rgba(80, 80, 90, 0.4) 75%), 
        linear-gradient(-45deg, transparent 75%, rgba(80, 80, 90, 0.4) 75%),
        radial-gradient(circle, rgba(210, 140, 80, 0.6) 0%, rgba(100, 100, 110, 0.5) 100%);
      background-size: 60px 60px;
      background-position: 0 0, 0 30px, 30px -30px, -30px 0px, 0 0;
      background-attachment: fixed;
      color: #ffffff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      text-align: center;
      padding: 50px 20px;
    }
    h1 {
      color: #ffcc00;
      font-size: 3rem;
      margin-bottom: 10px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
    }
    p {
      color: #e0e0e0;
      font-size: 1.2rem;
      margin-bottom: 40px;
      text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
    }
    .button-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      max-width: 300px;
      margin: 0 auto 50px auto;
    }
    .btn, button.btn {
      background-color: #ffcc00;
      color: #1a1a1a;
      width: 100%;
      padding: 15px 0;
      text-decoration: none;
      font-size: 1.1rem;
      font-weight: bold;
      border-radius: 8px;
      transition: background 0.2s, transform 0.2s;
      box-shadow: 0 4px 6px rgba(0,0,0,0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      border: none;
      cursor: pointer;
      box-sizing: border-box;
    }
    .btn:hover, button.btn:hover {
      background-color: #e6b800;
      transform: translateY(-2px);
    }
    .content-box {
      max-width: 600px;
      margin: 0 auto;
      text-align: left;
      background-color: rgba(26, 26, 26, 0.9);
      backdrop-filter: blur(5px);
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.7);
      border: 1px solid rgba(255, 204, 0, 0.2);
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
      text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
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

// Reusable head script bundle (Includes Social Bar + Styles)
const headContent = `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Adsterra Social Bar Script -->
  <script src="https://biographygridetelegram.com/e1/11/ad/e111ad2e4698f632e78f38a4258c4a16.js"></script>
  ${siteStyles}
`;

// Reusable Adsterra banner snippet function
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
      <title>Cat SMP</title>
      ${headContent}
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

// Shop Main Route
app.get('/shop', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Cat SMP - Store</title>
      ${headContent}
    </head>
    <body>
      <h1>Cat SMP Store</h1>
      <p>Support the server and get cool perks!</p>
      
      <div class="content-box">
        <h2>🛍️ Server Store</h2>
        <div class="button-container" style="margin-top: 20px;">
          <a href="/shop/currency" class="btn">Currency</a>
          <a href="/shop/rank" class="btn">Rank</a>
          <button onclick="window.open('https://biographygridetelegram.com/sqa31fs89u?key=b5c1e0e06871ea3a9c2815ffb75a2361', '_blank'); window.location.href='/shop';" class="btn">Coming soon</button>
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
      <title>Cat SMP - Currency</title>
      ${headContent}
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
      <title>Cat SMP - Rank</title>
      ${headContent}
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

// Main Vote Route with Dual-Action JavaScript Button + Banner
app.get('/vote', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Cat SMP - Vote</title>
      ${headContent}
    </head>
    <body>
      <h1>Vote for Cat SMP</h1>
      <p>Support the server and earn in-game vote keys!</p>
      
      <div class="content-box">
        <h2>⭐ Vote Gateway</h2>
        <p style="text-align: center; color: #cccccc; font-size: 1rem; margin-bottom: 20px;">
          Click the button below to support the server and view vote links!
        </p>

        <div class="button-container" style="margin: 20px auto;">
          <button onclick="window.open('https://biographygridetelegram.com/sqa31fs89u?key=b5c1e0e06871ea3a9c2815ffb75a2361', '_blank'); window.location.href='/vote/links';" class="btn">Vote Links</button>
        </div>

        ${adBannerHTML}
      </div>
      
      <br>
      <a href="/" class="back-home">← Back to Home</a>
    </body>
    </html>
  `);
});

// Secondary Vote Page: Actual Voting Links List
app.get('/vote/links', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Cat SMP - Voting Links</title>
      ${headContent}
    </head>
    <body>
      <h1>Cat SMP Voting Links</h1>
      <p>Vote on the links below to claim your rewards in-game!</p>
      
      <div class="content-box">
        <h2>🗳️ Active Vote Links</h2>
        <p style="text-align: center; color: #cccccc; margin-bottom: 20px;">
          Click each link to place your vote for Cat SMP:
        </p>
        
        <div class="button-container" style="margin: 20px auto;">
          <a href="#" target="_blank" class="btn">Minecraft Server List</a>
          <a href="#" target="_blank" class="btn">Planet Minecraft</a>
          <a href="#" target="_blank" class="btn">TopG Vote</a>
        </div>
      </div>
      
      <br>
      <a href="/vote" class="back-home">← Back to Vote Page</a>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Cat SMP server is running on port ${PORT}`);
});
           
