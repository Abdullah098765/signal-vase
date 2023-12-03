import { NextResponse } from 'next/server';
import { setupChangeStream, cornInterval } from '../functions/functions'
import connectDB from '../db';

export async function POST(req, res) {
    try {
        connectDB();

        // Your initialization code here
        await setupChangeStream();
        // await cornInterval();
        console.log('Initialization code executed');

        return   await NextResponse.json({ message: "Initialization code executed" });
    } catch (error) {
        console.error('Initialization error:', error);
      return  await NextResponse.json({ error: "Initialization error" });
    }
}
