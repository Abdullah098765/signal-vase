import { NextResponse } from 'next/server';
import { setupChangeStream, cornInterval } from '../functions/functions'
import connectDB from '../db';

export async function POST(req, res) {
connectDB()

    // Your initialization code here
    setupChangeStream()
    cornInterval()
    console.log('Initialization code executed');

    return NextResponse.json({ message: "Initialization code executed" });
}
