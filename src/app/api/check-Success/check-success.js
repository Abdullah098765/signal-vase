const mongoose = require('mongoose');
const cron = require('node-cron');
const Signal = mongoose.model('Signal'); // Replace 'Signal' with your actual model name

// Define a function to update isSuccess based on good and bad arrays
const updateSuccess = async () => {
    try {
        const signals = await Signal.find().exec();

        for (const signal of signals) {
            const goodLength = signal.good.length;
            const badLength = signal.bad.length;
            let isSuccess = 'null';

            if (badLength < goodLength) {
                isSuccess = 'true';
            }
            if (badLength > goodLength) {
                isSuccess = 'false';

            }
            signal.isSuccess = isSuccess;
            await signal.save();
        }
    } catch (error) {
        console.error('Error updating isSuccess:', error);
    }
};

// Schedule the updateSuccess function to run every minute
export default function checkSuccess() {
    cron.schedule('* * * * *', () => {
        console.log('Running updateSuccess...');
        updateSuccess();
    });
}
