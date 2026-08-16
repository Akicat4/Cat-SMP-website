const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static HTML/CSS if you have them, or render dynamically from YAML
app.use(express.static(path.join(__dirname)));

app.get('/api/config', (req, res) => {
    try {
        const fileContents = fs.readFileSync('./mainmenu.yaml', 'utf8');
        const data = yaml.load(fileContents);
        res.json(data);
    } catch (e) {
        res.status(500).send({ error: 'Failed to load configuration' });
    }
});

app.listen(PORT, () => {
    console.log(`Cat SMP web service running on port ${PORT}`);
});
  
