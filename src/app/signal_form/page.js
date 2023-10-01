'use client'
import React, { useState } from 'react';

const CreateSignalForm = () => {
    const [signalData, setSignalData] = useState({
        pair: '',
        explanation: '',
        entry1: '',
        entry2: '',
        takeProfit1: '',
        takeProfit2: '',
        takeProfit3: '',
        stopLoss: '',
        cryptoOrStock: 'Crypto',
        duration: '',
        longOrShort: 'Long',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSignalData({ ...signalData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Signal Data:', signalData);
    };

    return (
        <section className="max-w-4xl p-6 mx-auto bg-white bg-opacity-80 rounded-md shadow-md dark:bg-black dark:bg-opacity-80 mt-20">
            <h1 className="text-xl font-bold text-black capitalize dark:text-white">Create a New Signal</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-black dark:text-white" htmlFor="pair">
                            Pair (e.g., BTC/USDT)
                        </label>
                        <input
                            type="text"
                            name="pair"
                            id="pair"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white bg-opacity-50 border border-black rounded-md dark:bg-opacity-70 dark:text-white dark:border-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="e.g., BTC/USDT"
                            value={signalData.pair}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-black dark:text-white" htmlFor="explanation">
                            Signal Explanation
                        </label>
                        <textarea
                            name="explanation"
                            id="explanation"
                            rows="4"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white bg-opacity-50 border border-black rounded-md dark:bg-opacity-70 dark:text-white dark:border-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Enter signal explanation"
                            value={signalData.explanation}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="text-black dark:text-white" htmlFor="entry1">
                            Entry 1
                        </label>
                        <input
                            type="number"
                            name="entry1"
                            id="entry1"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white bg-opacity-50 border border-black rounded-md dark:bg-opacity-70 dark:text-white dark:border-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Entry 1"
                            value={signalData.entry1}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-black dark:text-white" htmlFor="entry2">
                            Entry 2
                        </label>
                        <input
                            type="number"
                            name="entry2"
                            id="entry2"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white bg-opacity-50 border border-black rounded-md dark:bg-opacity-70 dark:text-white dark:border-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Entry 2"
                            value={signalData.entry2}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-black dark:text-white" htmlFor="takeProfit1">
                            Take Profit 1
                        </label>
                        <input
                            type="number"
                            name="takeProfit1"
                            id="takeProfit1"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white bg-opacity-50 border border-black rounded-md dark:bg-opacity-70 dark:text-white dark:border-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Take Profit 1"
                            value={signalData.takeProfit1}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-black dark:text-white" htmlFor="takeProfit2">
                            Take Profit 2
                        </label>
                        <input
                            type="number"
                            name="takeProfit2"
                            id="takeProfit2"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white bg-opacity-50 border border-black rounded-md dark:bg-opacity-70 dark-text-white dark:border-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Take Profit 2"
                            value={signalData.takeProfit2}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-black dark:text-white" htmlFor="takeProfit3">
                            Take Profit 3
                        </label>
                        <input
                            type="number"
                            name="takeProfit3"
                            id="takeProfit3"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white bg-opacity-50 border border-black rounded-md dark:bg-opacity-70 dark-text-white dark:border-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Take Profit 3"
                            value={signalData.takeProfit3}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-black dark:text-white" htmlFor="stopLoss">
                            Stop Loss
                        </label>
                        <input
                            type="number"
                            name="stopLoss"
                            id="stopLoss"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white bg-opacity-50 border border-black rounded-md dark:bg-opacity-70 dark-text-white dark:border-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Stop Loss"
                            value={signalData.stopLoss}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-black dark:text-white" htmlFor="cryptoOrStock">
                            Crypto or Stock
                        </label>
                        <select
                            name="cryptoOrStock"
                            id="cryptoOrStock"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white bg-opacity-50 border border-black rounded-md dark-bg-opacity-70 dark-text-white dark:border-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            value={signalData.cryptoOrStock}
                            onChange={handleInputChange}
                        >
                            <option value="Crypto">Crypto</option>
                            <option value="Stock">Stock</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-black dark:text-white" htmlFor="duration">
                            Duration
                        </label>
                        <input
                            type="text"
                            name="duration"
                            id="duration"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white bg-opacity-50 border border-black rounded-md dark:bg-opacity-70 dark-text-white dark:border-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Duration"
                            value={signalData.duration}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label className="text-black dark:text-white" htmlFor="longOrShort">
                            Long or Short
                        </label>
                        <select
                            name="longOrShort"
                            id="longOrShort"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white bg-opacity-50 border border-black rounded-md dark-bg-opacity-70 dark-text-white dark:border-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            value={signalData.longOrShort}
                            onChange={handleInputChange}
                        >
                            <option value="Long">Long</option>
                            <option value="Short">Short</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-black bg-opacity-80 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-600">
                        Create Signal
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CreateSignalForm;
