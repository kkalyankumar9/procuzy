const puppeteer = require('puppeteer');

const scrapeMedium = async (topic) => {
    const browser = await puppeteer.launch({
        headless: true, // Set to false to see the browser interaction
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // executablePath: '/path/to/your/chrome', // Comment out or remove this line
    });

    const page = await browser.newPage();

    try {
        const url = `https://medium.com/search?q=${encodeURIComponent(topic)}`;
        await page.goto(url, { waitUntil: 'networkidle2' });

        const articles = await page.evaluate(() => {
            const results = [];
            const items = document.querySelectorAll('div.js-postListHandle > div');

            items.forEach(item => {
                const titleElement = item.querySelector('h3, h4');
                const title = titleElement ? titleElement.innerText.trim() : 'No title';
                const authorElement = item.querySelector('.postMetaInline-authorLockup a');
                const author = authorElement ? authorElement.innerText.trim() : 'Unknown author';
                const dateElement = item.querySelector('time');
                const date = dateElement ? dateElement.getAttribute('datetime') : 'No date';
                const linkElement = item.querySelector('a');
                const link = linkElement ? linkElement.href : '#';

                results.push({ title, author, date, url: link });
            });

            return results.slice(0, 5); // Return only the top 5 articles
        });

        await browser.close();
        return articles;
    } catch (error) {
        console.error('Error during scraping:', error);
        await browser.close();
        throw error;
    }
};

module.exports = scrapeMedium;
