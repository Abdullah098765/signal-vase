import React from 'react';

const UserSignals = () => {

    function handleGetSignals(params) {
        if (params == 'Total') {
            console.log(params);
        }
        else if (params == 'Good') {
            console.log(params);

        }
        else if (params == 'Bad') {
            console.log(params);

        }
        else if (params == 'Active') {
            console.log(params);

        }
    }

    return (
        <div>
            <div class="w-full flex flex-col 2xl:w-1/3">
                <div class="bg-white">
                    <ul class="flex lg:flex-row justify-around cursor-pointer ">
                        <li onClick={() => handleGetSignals('Total')} class="relative text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex">
                            Total Signals
                        </li>
                        <li onClick={() => handleGetSignals('Good')} class="relative text-gray-500 hover:bg-gray-100 p-3  w-full justify-center flex">
                            Good Signals
                        </li>
                        <li onClick={() => handleGetSignals('Bad')} class="relative text-gray-500 hover:bg-gray-100 p-3  w-full justify-center flex">
                            Bad Signals
                        </li>
                        <li onClick={() => handleGetSignals('Active')} class="relative text-gray-500 hover:bg-gray-100 p-3  w-full justify-center flex">
                            Active Signals
                        </li>
                        <li onClick={() => handleGetSignals('Active')} class="relative text-gray-500 hover:bg-gray-100 p-3  w-full justify-center flex">
                            Neutral Signals
                        </li>
                    </ul>

                </div>


            </div>
        </div>
    );
}

export default UserSignals;
