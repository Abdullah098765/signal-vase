const mongoose = require('mongoose');
const cron = require('node-cron');
const Signal = mongoose.model('Signal'); // Replace 'Signal' with your actual model name
const User = mongoose.model('User'); // Replace 'Signal' with your actual model name


const updateSuccess = async () => {
    try {
        const signals = await Signal.find().exec();

        for (const signal of signals) {
            const goodLength = signal.good.length;
            const badLength = signal.bad.length;
            let isSuccess = 'null';

            if (badLength === 0 && goodLength === 0) {
                isSuccess = 'true';

                // Update the user's object to add the signal to goodSignals and remove from others
                await User.findByIdAndUpdate(signal.signalProvider._id, {
                    $addToSet: { goodSignals: signal._id },
                    $pull: { badSignals: signal._id, neutralSignals: signal._id },
                });
            } else if (badLength > goodLength) {
                isSuccess = 'false';

                // Update the user's object to add the signal to badSignals and remove from others
                await User.findByIdAndUpdate(signal.signalProvider._id, {
                    $addToSet: { badSignals: signal._id },
                    $pull: { goodSignals: signal._id, neutralSignals: signal._id },
                });
            } else if (badLength < goodLength) {
                // If it's neither good nor bad, it's neutral
                // Update the user's object to add the signal to neutralSignals and remove from others
                await User.findByIdAndUpdate(signal.signalProvider._id, {
                    $addToSet: { neutralSignals: signal._id },
                    $pull: { goodSignals: signal._id, badSignals: signal._id },
                });
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
        updateSuccess();
    });
}
