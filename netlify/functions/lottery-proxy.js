import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cheerio = require('cheerio');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

const LOTTERY_URLS = {
  'loteriasdominicanas': 'https://loteriasdominicanas.com',
  'anguila': 'https://loteriasdominicanas.com/anguila',
  'nacional': 'https://loteriasdominicanas.com/nacional',
  'leidsa': 'https://loteriasdominicanas.com/leidsa',
  'real': 'https://loteriasdominicanas.com/real',
  'loteka': 'https://loteriasdominicanas.com/loteka'
};

async function fetchLotteryResults(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching lottery results: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const results = [];

    $('.game-block').each((_, element) => {
      const title = $(element).find('.game-title').text().trim();
      const numbers = $(element).find('.score')
        .map((_, el) => $(el).text().trim())
        .get()
        .join('-');
      const date = $(element).find('.session-date').text().trim();

      if (title && numbers && date) {
        results.push({
          name: title,
          numbers,
          date,
          created_at: new Date().toISOString()
        });
      }
    });

    return results;
  } catch (error) {
    console.error('Error fetching lottery:', error);
    return [];
  }
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const { lottery, date } = event.queryStringParameters || {};
    const url = LOTTERY_URLS[lottery] || LOTTERY_URLS.loteriasdominicanas;
    
    const results = await fetchLotteryResults(url);
    
    const filteredResults = date 
      ? results.filter(result => result.date.includes(date))
      : results;

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      },
      body: JSON.stringify(filteredResults),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }),
    };
  }
};