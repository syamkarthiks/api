import fs from 'fs';
import path from 'path';
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'media', 'hindi-bgm.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const url = data[Math.floor(Math.random() * data.length)];

    const response = await axios.get(url, {
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    // dynamic content type
    if (url.endsWith('.mp3')) {
      res.setHeader('Content-Type', 'audio/mpeg');
    } else if (url.endsWith('.m4a')) {
      res.setHeader('Content-Type', 'audio/mp4');
    } else {
      res.setHeader('Content-Type', 'video/mp4');
    }

    response.data.pipe(res);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
}
