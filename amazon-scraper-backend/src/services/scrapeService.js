const axios = require('axios');
const { JSDOM } = require('jsdom');
const fs = require('fs');

async function scrapeService(keyword) {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
            },
            timeout: 10000,
        });

        const html = response.data;

        // Salva para debug local
        fs.writeFileSync('debug.html', html);

        const dom = new JSDOM(html);
        const document = dom.window.document;

        const products = [];
        const items = document.querySelectorAll('div[data-component-type="s-search-result"]');

        console.log(`[DEBUG] Encontrados ${items.length} itens no HTML`);

        items.forEach((item) => {
            const title = item.querySelector('div[data-cy="title-recipe"] a span')?.textContent?.trim() ?? 'Sem título';
            const image = item.querySelector('img.s-image')?.getAttribute('src') ?? '';
            const rating = item.querySelector('.a-icon-alt')?.textContent?.trim() ?? 'N/A';
            const reviews = item.querySelector('.a-size-base.s-underline-text')?.textContent?.trim() ?? 'N/A';
            const productUrl = item.querySelector('div[data-cy="title-recipe"] a')?.getAttribute('href') ?? '';

            // FILTROS
            const isValidTitle = title && title !== 'Featured from Amazon brands' && title !== 'Sponsored' && title !== 'Sem título';

            if (isValidTitle && image) {
                products.push({
                    title,
                    rating,
                    reviews,
                    image,
                    url: productUrl ? `https://www.amazon.com${productUrl}` : '',
                });
            }
        });

        return products;
    } catch (err) {
        console.error('[SCRAPER ERROR]', err.message);
        return [];
    }
}

module.exports = scrapeService;
