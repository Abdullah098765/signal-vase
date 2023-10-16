const mongoose = require('mongoose');
const cron = require('node-cron');
const Signal = mongoose.model('Signal'); // Replace 'Signal' with your actual model name
const User = mongoose.model('User'); // Replace 'Signal' with your actual model name

// Define a function to update isSuccess based on good and bad arrays
// const updateSuccess = async () => {
//     try {
//         const signals = await Signal.find().exec();

//         for (const signal of signals) {
//             const goodLength = signal.good.length;
//             const badLength = signal.bad.length;
//             let isSuccess = 'null';
            
//             if (badLength < goodLength) {
//                 isSuccess = 'true';
//                 const user = await User.find({ _id: signal.signalProvider._id }).exec();
//                 console.log(user);
                
//             }
//             if (badLength > goodLength) {
//                 isSuccess = 'false';

//             }

//             signal.isSuccess = isSuccess;
//             await signal.save();
//         }
//     } catch (error) {
//         console.error('Error updating isSuccess:', error);
//     }
// };

const updateSuccess = async () => {
    try {
        const signals = await Signal.find().exec();

        for (const signal of signals) {
            const goodLength = signal.good.length;
            const badLength = signal.bad.length;
            let isSuccess = 'null';

            if (badLength < goodLength) {
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
            } else {
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
