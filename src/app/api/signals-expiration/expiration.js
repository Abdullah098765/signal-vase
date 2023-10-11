const cron = require('node-cron');
import Schemas from '../Modals/schemas.js'



export default function signal_Expirations() {

    // Define a cron job to run every minute
    cron.schedule('* * * * *', async () => {
        try {
            // Find all active signals
            const activeSignals = await Schemas.Signal.find({ status: 'Active' });

            // Get the current timestamp
            const currentTime = new Date().getTime();

            // Check each active signal for expiration
            activeSignals.forEach(async (signal) => {
                if (currentTime >= signal.duration) {
                    console.log(signal);

                    // Update the signal status to "Expired"
                    var done = await Schemas.Signal.findByIdAndUpdate(signal._id, { status: 'Expired' });
                  
                }
            });
        } catch (error) {
            console.error('Error checking and updating signals:', error);
        }
    });
}