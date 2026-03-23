import fs from 'fs';
import path from 'path';
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const filePath = path.resolve('media/bgm.json');
    const data = JSON.parse(fs.readFileSync(filePath));
    const url = data[Math.floor(Math.random() * data.length)];
    console.log('Fetching video from URL:', url);

    const response = await axios.get(url, {
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    res.setHeader('Content-Type', 'video/mp4');
    response.data.pipe(res);
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ error: 'Failed to fetch video.', details: error.message });
  }
}
