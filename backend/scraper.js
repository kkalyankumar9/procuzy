const puppeteer = require('puppeteer');

const scrapeMedium = async (topic) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const url = `https://medium.com/search?q=${encodeURIComponent(topic)}`;

    try {
        console.log(`Navigating to ${url}`);
        await page.goto(url, { waitUntil: 'networkidle2' });

        console.log('Page loaded, waiting for articles...');
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds

        const articles = await page.evaluate(() => {
            const results = [];
            const items = document.querySelectorAll('div.postArticle');

            items.forEach(item => {
                const titleElement = item.querySelector('h3') || item.querySelector('h4');
                const title = titleElement ? titleElement.innerText : 'No title';
                const authorElement = item.querySelector('.postMetaInline-authorLockup a');
                const author = authorElement ? authorElement.innerText : 'Unknown author';
                const dateElement = item.querySelector('time');
                const date = dateElement ? dateElement.getAttribute('datetime') : 'No date';
                const linkElement = item.querySelector('a');
                const link = linkElement ? linkElement.href : '#';

                results.push({ title, author, date, url: link });
            });

            return results;
        });

        console.log(`Scraped ${articles.length} articles`);
        await browser.close();
        return articles.slice(0, 5);
    } catch (error) {
        console.error('Error during scraping:', error);
        await browser.close();
        throw error;
    }
};

module.exports = scrapeMedium;
