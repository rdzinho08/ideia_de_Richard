const db = require('../config/database');

async function getAllProducts(req, res) {
    try {
        const { category_id } = req.query;
        let queryText = 'SELECT p.*, c.name AS category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id';
        let queryParams = [];

        if (category_id) {
            queryText += ' WHERE p.category_id = $1';
            queryParams.push(category_id);
        }

        queryText += ' ORDER BY p.created_at DESC';

        const { rows } = await db.query(queryText, queryParams);
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
}


async function getCarouselProducts(req, res) {
    try {
        const { rows } = await db.query('SELECT * FROM products WHERE is_carousel = true ORDER BY created_at DESC');
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar destaques do carrossel.' });
    }
}

module.exports = {
    getAllProducts,
    getCarouselProducts
};