const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const scrapeMedium = require('./scraper');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let articles = [];

app.post('/scrape', async (req, res) => {
    const { topic } = req.body;
    if (!topic) {
        return res.status(400).send({ error: 'Topic is required' });
    }

    try {
        articles = await scrapeMedium(topic);
        res.send(articles);
    } catch (error) {
        console.error('Scraping failed:', error.message);
        res.status(500).send({ error: 'Failed to scrape Medium', details: error.message });
    }
});

app.get('/articles', (req, res) => {
    res.send(articles);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
