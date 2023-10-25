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
            const neutralLength = signal.neutral.length;
            let isSuccess = 'null';

            // console.log(goodLength, badLength, neutralLength,);

            if ((badLength === 0 && goodLength === 0 && neutralLength === 0) || (badLength < goodLength && neutralLength < goodLength) || (goodLength === neutralLength && badLength < neutralLength) || (goodLength === badLength && badLength === neutralLength)) {
                isSuccess = 'true';

                // Update the user's object to add the signal to goodSignals and remove from others
                await User.findByIdAndUpdate(signal.signalProvider._id, {
                    $addToSet: { goodSignals: signal._id },
                    $pull: { badSignals: signal._id, neutralSignals: signal._id },
                });
            } else if ((badLength > goodLength && badLength > neutralLength) || (badLength === neutralLength && goodLength < badLength)) {
                isSuccess = 'false';

                // Update the user's object to add the signal to badSignals and remove from others
                await User.findByIdAndUpdate(signal.signalProvider._id, {
                    $addToSet: { badSignals: signal._id },
                    $pull: { goodSignals: signal._id, neutralSignals: signal._id },
                });
            } else if ((neutralLength > goodLength && neutralLength > badLength) || (goodLength === badLength && neutralLength < goodLength)) {
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

const updateUsersSignalStatus = async () => {
    try {
        // Fetch all signals
        const signals = await Signal.find().exec();

        for (const signal of signals) {
            // Determine whether the signal is expired or active
            // console.log(signal.status);

            const updateData = {};

            if (signal.status === 'Expired') {
                // Remove the signal from the user's "activeSignals" array
                updateData.$pull = { activeSignals: signal._id };

                // Add the signal to the user's "expiredSignals" array
                updateData.$addToSet = { expiredSignals: signal._id };
            } else if (signal.status === 'Active') {
                // Remove the signal from the user's "expiredSignals" array
                updateData.$pull = { expiredSignals: signal._id };

                // Add the signal to the user's "activeSignals" array
                updateData.$addToSet = { activeSignals: signal._id };
            }

            // Update the user's arrays based on the signal status
            await User.findByIdAndUpdate(signal.signalProvider._id, updateData);
        }
    } catch (error) {
        console.error('Error updating users with signal status:', error);
    }
};


// Schedule the updateSuccess function to run every minute
export default function checkSuccess() {
    cron.schedule('* * * * *', () => {
        updateSuccess();
        updateUsersSignalStatus()
    });
}
