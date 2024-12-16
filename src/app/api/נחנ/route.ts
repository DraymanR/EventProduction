import axios from 'axios';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const input = url.searchParams.get('input');

  console.log('Input received:', input);  // הוספת הדפסת דיבוג

  if (!input) {
    return new Response(
      JSON.stringify({ error: 'Missing input query' }),
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=AIzaSyCyl_TivQSm7Nzjthc5V23C60a2dBRvZ2k`
    );
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error('Error fetching data from Google Places API:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch data from Google Places API' }),
      { status: 500 }
    );
  }
}
