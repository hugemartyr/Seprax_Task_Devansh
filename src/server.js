import express from 'express';
import { get } from 'axios';
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/price', async (req, res) => {
  const { id } = req.query;
  try {
    const response = await get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.get('/api/chart', async (req, res) => {
  const { id } = req.query;
  try {
    const response = await get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
