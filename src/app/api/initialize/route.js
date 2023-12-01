import { NextResponse } from 'next/server';
import { setupChangeStream, cornInterval } from '../functions/functions'
export async function GET(req, res) {
    // Your initialization code here
    setupChangeStream()
    cornInterval()
    console.log('Initialization code executed');

    return NextResponse.json({ message: "Initialization code executed" });
}
