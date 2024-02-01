const cron = require('node-cron');
import Schemas from '../Modals/schemas.js'

export default async function signal_Expirations() {
    try {
        const activeSignals = await Schemas.Signal.find({ status: 'Active' });
        const currentTime = new Date().getTime();

        // Use map to create an array of promises
        const updatePromises = activeSignals.map(async (signal) => {
            if (currentTime >= signal.duration) {
                console.log("signal_Expirations LINE 12:",signal);
                return Schemas.Signal.findByIdAndUpdate(signal._id, { status: 'Expired' });
            }
        });

        // Use Promise.all to wait for all updates to complete
        await Promise.all(updatePromises);
    } catch (error) {
        console.error('Error checking and updating signals:', error);
    }
}


