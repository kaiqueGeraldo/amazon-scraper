const express = require('express');
const router = express.Router();
const scrapeService = require('../services/scrapeService');

router.get('/scrape', async (req, res) => {
    const keyword = req.query.keyword;

    if (!keyword) {
        console.warn('[SCRAPER] Requisição sem keyword recebida.');
        return res.status(400).json({ error: 'Keyword é obrigatória' });
    }

    console.log(`[SCRAPER] Iniciando scraping para: "${keyword}"`);

    try {
        const products = await scrapeService(keyword);
        console.log(`[SCRAPER] ${products.length} produtos encontrados para: "${keyword}"`);
        res.json(products);
    } catch (error) {
        console.error(`[SCRAPER] Erro ao fazer scraping para "${keyword}":`, error.message);
        res.status(500).json({ error: 'Erro ao buscar dados da Amazon' });
    }
});

module.exports = router;