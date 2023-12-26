import React from 'react';

const AboutSignals = ({about}) => {
    return (
            <div class="mb-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
               

                <div class="flex flex-col w-full 2xl:w-2/3">
                  <div class="flex-1 bg-white  shadow-xl p-8">
                    <h4 class="text-xl text-gray-900 font-bold">About</h4>
                    <p class="mt-2 text-gray-700">
                     {about}
                    </p>
                  </div>
                </div>
              </div>
    );
}

export default AboutSignals;
