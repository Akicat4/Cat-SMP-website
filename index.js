const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files if you have a "public" folder for CSS/images
app.use(express.static(path.join(__dirname, 'public')));

// Homepage route
app.get('/', (req, res) => {
  try {
    // Example: If you want to load mainmenu.yaml and display it
    // const fileContents = fs.readFileSync('./mainmenu.yaml', 'utf8');
    // const data = yaml.load(fileContents);
    
    res.send('<h1>Welcome to Cat SMP!</h1><p>Your server is up and running!</p>');
  } catch (e) {
    res.status(500).send('Error loading configuration files.');
  }
});

app.listen(PORT, () => {
  console.log(`Cat SMP server is running on port ${PORT}`);
});
    
