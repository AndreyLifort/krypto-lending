import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'clicks.json');

app.use(cors());
app.use(express.json());

// Initialize data file if not exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
}

// POST /api/track — log CTA click
app.post('/api/track', (req, res) => {
  try {
    const { blockNumber, timestamp, userAgent, referrer } = req.body;

    const entry = {
      blockNumber,
      timestamp: timestamp || new Date().toISOString(),
      userAgent: userAgent || req.headers['user-agent'],
      referrer: referrer || req.headers.referer || null,
      ip: req.ip,
    };

    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    data.push(entry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');

    console.log(`[TRACK] Block ${blockNumber} clicked at ${entry.timestamp}`);
    res.json({ ok: true });
  } catch (err) {
    console.error('[TRACK ERROR]', err);
    res.status(500).json({ error: 'Failed to track click' });
  }
});

app.listen(PORT, () => {
  console.log(`Tracking server running on http://localhost:${PORT}`);
});
