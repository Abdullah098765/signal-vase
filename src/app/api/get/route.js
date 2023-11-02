import { NextResponse, NextRequest } from 'next/server'




export async function GET(req, res) {
  console.log(res);
  return new Response('Server is running')
}




