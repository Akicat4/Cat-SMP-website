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
        .instructions {
          max-width: 600px;
          margin: 0 auto;
          text-align: left;
          background-color: #242424;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.4);
        }
        .instructions h2 {
          color: #ffcc00;
          text-align: center;
          margin-top: 0;
        }
        .instructions h3 {
          color: #4CAF50;
          border-bottom: 1px solid #333;
          padding-bottom: 5px;
        }
        .instructions ul, .instructions ol {
          color: #cccccc;
          line-height: 1.6;
        }
        .highlight {
          color: #ffcc00;
          font-weight: bold;
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

      <div class="instructions">
        <h2>🐱 How to Join CAT SMP</h2>
        <p style="text-align: center; margin-bottom: 20px;">Cat SMP is a survival Minecraft server with many features!</p>
        
        <p><span class="highlight">IP:</span> CatSMPgg.aternos.me<br>
        <span class="highlight">Bedrock Port:</span> 34018</p>

        <h3>💻 Java</h3>
        <ol>
          <li>Open Minecraft Java.</li>
          <li>Go to Multiplayer → Add Server.</li>
          <li>Put <span class="highlight">CatSMPgg.aternos.me</span> in the Server Address.</li>
          <li>Click Done and join the server.</li>
        </ol>

        <h3>📱 Bedrock</h3>
        <ol>
          <li>Open Minecraft Bedrock.</li>
          <li>Go to Play → Servers → Add Server.</li>
          <li>Server Address: <span class="highlight">CatSMPgg.aternos.me</span></li>
          <li>Port: <span class="highlight">34018</span></li>
          <li>Save it and join.</li>
        </ol>

        <h3>🎮 PlayStation (Bedrock Online)</h3>
        <ol>
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

app.listen(PORT, () => {
  console.log(`Cat SMP server is running on port ${PORT}`);
});
           
