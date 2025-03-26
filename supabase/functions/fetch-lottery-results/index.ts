import { createClient } from "npm:@supabase/supabase-js@2.39.7";
import { DOMParser } from "npm:linkedom@0.16.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

async function fetchResults(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const gameBlocks = doc.querySelectorAll('.game-block');
    const results = [];
    
    for (const block of gameBlocks) {
      const title = block.querySelector('.game-title')?.textContent?.trim();
      const scores = Array.from(block.querySelectorAll('.score')).map(s => s.textContent?.trim());
      const date = block.querySelector('.session-date')?.textContent?.trim();
      
      if (title && scores.length && date) {
        results.push({
          name: title,
          numbers: scores.join('-'),
          date,
          created_at: new Date().toISOString()
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error fetching results:', error);
    return [];
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const urls = [
      "https://loteriasdominicanas.com",
      "https://loteriasdominicanas.com/anguila"
    ];

    const allResults = [];
    for (const url of urls) {
      const results = await fetchResults(url);
      allResults.push(...results);
    }

    if (allResults.length > 0) {
      const { error } = await supabase
        .from('lottery_results')
        .upsert(
          allResults,
          { 
            onConflict: 'name,date',
            ignoreDuplicates: true 
          }
        );

      if (error) throw error;
    }

    return new Response(
      JSON.stringify({ success: true, count: allResults.length }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});