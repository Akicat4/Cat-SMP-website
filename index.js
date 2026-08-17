const siteStyles = `
  <style>
    body {
      background: linear-gradient(135deg, #121212 0%, #1e1e24 50%, #0d0d0f 100%);
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
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
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
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
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
      background-color: rgba(36, 36, 36, 0.85);
      backdrop-filter: blur(5px);
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.6);
      border: 1px solid rgba(255, 255, 255, 0.05);
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
