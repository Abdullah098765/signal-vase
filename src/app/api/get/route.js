import { NextResponse, NextRequest } from 'next/server'




export async function GET(req, res) {
  console.log('Server is running');
  return NextResponse.json('Server is running')
}




