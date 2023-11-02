import { NextResponse, NextRequest } from 'next/server'




export async function GET(req, res) {
  // const response = NextResponse.next(res
console.log(NextResponse);
 
  return NextResponse.json('server');
}




