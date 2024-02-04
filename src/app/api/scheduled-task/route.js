

export async function POST(req, res) {

  console.log('Scheduled task is running!');

  return new Response(JSON.stringify({ Status: 'Scheduled task completed.' }));

}