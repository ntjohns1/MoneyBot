import express from 'express';
import { alpaca } from '../../client/index.js';

const router = express.Router();

// Get all assets based on query parameters (status, asset_class)
router.get('/', async (req, res) => {
  try {
    const { status, asset_class } = req.query;

    const assets = await alpaca.getAssets({
      status: status || 'active',
      asset_class: asset_class || 'us_equity'
    });

    res.json(assets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
});

// Get information about a specific asset by symbol
router.get('/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;

    const asset = await alpaca.getAsset(symbol);

    res.json(asset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to fetch asset with symbol: ${symbol}` });
  }
});

export default router;