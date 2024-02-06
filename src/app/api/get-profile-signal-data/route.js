import { NextResponse, NextRequest } from 'next/server'
import Schemas from '../Modals/schemas.js'
import connectDB from '../db.js';
import mongoose from 'mongoose';



connectDB()




export async function POST(req, res) {
    try {

        const { currentprofileRoute, _id, page, isOnlyCount } = await req.json();
        const currentTimestamp = new Date().getTime();
console.log( currentprofileRoute, _id, page, isOnlyCount );
        // Convert page to skip value for pagination
        const skip = (page - 1) * 8;
        var match = {
            signalProvider: new mongoose.Types.ObjectId(_id),
        }


        if (currentprofileRoute === 'Active') {
            match.duration = { $gt: currentTimestamp };
        }
        else if (currentprofileRoute === 'Neutral') {
            match = {
                signalProvider: new mongoose.Types.ObjectId(_id),
                $expr: {
                    $or: [
                        {

                            $and: [
                                { $gt: [{ $size: '$neutral' }, { $size: '$good' }] },
                                { $gt: [{ $size: '$neutral' }, { $size: '$bad' }] }
                            ]
                        },
                        {
                            $and: [
                                { $eq: [{ $size: '$good' }, { $size: '$bad' }] },
                                { $lt: [{ $size: '$neutral' }, { $size: '$good' }] },
                            ],
                        },
                    ],
                },
            };
        }
        else if (currentprofileRoute === 'Bad') {

            match = {
                signalProvider: new mongoose.Types.ObjectId(_id),

                $expr: {
                    $or: [
                        {
                            $and: [
                                { $gt: [{ $size: '$bad' }, { $size: '$good' }] },
                                { $gt: [{ $size: '$bad' }, { $size: '$neutral' }], }
                            ]
                        },
                        {
                            $and: [
                                { $eq: [{ $size: '$bad' }, { $size: '$neutral' }] },
                                { $lt: [{ $size: '$good' }, { $size: '$bad' }] },
                            ],
                        },
                    ],
                },
            };
        }
        else if (currentprofileRoute === 'Good') {
            match = {
                signalProvider: new mongoose.Types.ObjectId(_id),
                $expr: {
                    $or: [

                        {
                            $and: [
                                { $gt: [{ $size: '$good' }, { $size: '$bad' }] },
                                { $gt: [{ $size: '$good' }, { $size: '$neutral' }] },
                            ],
                        },
                        {
                            $and: [
                                { $eq: [{ $size: '$good' }, { $size: '$neutral' }] },
                                { $lt: [{ $size: '$bad' }, { $size: '$neutral' }] },
                            ],
                        },
                        {
                            $and: [
                                { $eq: [{ $size: '$good' }, { $size: '$bad' }] },
                                { $eq: [{ $size: '$bad' }, { $size: '$neutral' }] },
                            ],
                        },
                    ],
                },
            };
        }
        else if (currentprofileRoute === "Crypto") {
            match.cryptoOrStock = "Crypto";
        }
        else if (currentprofileRoute === "Stock") {
            match.cryptoOrStock = "Stock";
        }
        else if (currentprofileRoute === "All") {
            match = {
                signalProvider: new mongoose.Types.ObjectId(_id),
            }
        }
        else return NextResponse.json("Not Vailid Data " + currentprofileRoute);

        var aggregationPipeline = [
            {
                $match: match,
            },
            { $skip: skip },
            { $limit: 8 },
        ];


        if (isOnlyCount) {
            aggregationPipeline = [
                {
                    $match: match,
                },
                { $count: "count", }
            ];
        }




        const signals = await Schemas.Signal.aggregate(aggregationPipeline);
        console.log(currentprofileRoute, signals);
        if (signals) {
            return NextResponse.json(signals);
        } else {
            return NextResponse.json({ error: 'signals not found' });
        }
    } catch (error) {
        console.error('Error finding signalsr:', error);

        // Send a JSON response with a 500 status code (Internal Server Error)
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
