'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMyContext } from '../context/context';
import { faChartArea, faChartLine, faCheck, faClose, faCross, faLineChart } from '@fortawesome/free-solid-svg-icons';
import { faBarChart, faChartBar } from '@fortawesome/free-regular-svg-icons';
import Career from './creer.js'
function User() {
    const { user } = useMyContext();
    return (
        <div>

            <div class="h-full bg-gray-200 p-8">
                <div class="bg-white rounded-lg shadow-xl p-6 flex flex-col lg:flex-row  xl:flex-row items-center">
                    <div x-data="{ openSettings: false }" class="absolute right-12 mt-4 rounded">
                    </div>
                    <img
                        src={'https://scontent.fkhi16-1.fna.fbcdn.net/v/t39.30808-6/387880006_872589680940413_2952632708859265931_n.jpg?stp=dst-jpg_p228x119&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Z7XHRdtXEuQAX-DohDV&_nc_ht=scontent.fkhi16-1.fna&oh=00_AfBUyzBNk3-HVGwHte2hw5SyOR8I8ANv7CFwXa55mCk4iQ&oe=6531D989'}
                        className="w-40 h-40 rounded-full mx-4 border-2 border-gray-500  transition duration-300 object-cover"
                        alt={user.displayName}
                    />

                    <div>
                        <div class="flex items-center space-x-2 mt-2">
                            <p class="text-2xl">Hamza Crypto</p>
                            <span class="bg-blue-500 rounded-full p-1" title="Verified">
                                <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </span>
                        </div>
                        <p class="text-gray-700">Experienced Full Time Crypto Trader | Charting Success Globally 📈</p>
                        <p class="text-sm text-gray-500">Joined at 3/2/2024</p>
                    </div>
                    <div class="flex-1 flex flex-col items-center lg:items-end justify-end px-8">
                        <div class="flex items-center space-x-4 lg:mt-24 xl:mt-24 mt-3">
                            <button class="flex items-center bg-gray-600 hover:bg-gray-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                                </svg>
                                <span>Subscribe</span>
                            </button>
                            <button class="flex items-center bg-gray-600 hover:bg-gray-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                                </svg>
                                <button class="whitespace-nowrap">Write a Review</button>
                            </button>
                        </div>
                    </div>
                </div>


                <Career />

                <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div class="w-full flex flex-col 2xl:w-1/3">
                        <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 class="text-xl text-gray-900 font-bold">Personal Info</h4>
                            <ul class="mt-2 text-gray-700">
                                <li class="flex border-y py-2">
                                    <span class="font-bold w-24">Full name:</span>
                                    <span class="text-gray-700">Amanda S. Ross</span>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Birthday:</span>
                                    <span class="text-gray-700">24 Jul, 1991</span>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Joined:</span>
                                    <span class="text-gray-700">10 Jan 2022 (25 days ago)</span>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Mobile:</span>
                                    <span class="text-gray-700">(123) 123-1234</span>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Email:</span>
                                    <span class="text-gray-700">amandaross@example.com</span>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Location:</span>
                                    <span class="text-gray-700">New York, US</span>
                                </li>
                                <li class="flex border-b py-2">
                                    <span class="font-bold w-24">Languages:</span>
                                    <span class="text-gray-700">English, Spanish</span>
                                </li>
                                <li class="flex items-center border-b py-2 space-x-2">
                                    <span class="font-bold w-24">Elsewhere:</span>
                                    <a href="#" title="Facebook">
                                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333333 333333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm90493 110539c-6654 2976-13822 4953-21307 5835 7669-4593 13533-11870 16333-20535-7168 4239-15133 7348-23574 9011-6787-7211-16426-11694-27105-11694-20504 0-37104 16610-37104 37101 0 2893 320 5722 949 8450-30852-1564-58204-16333-76513-38806-3285 5666-5022 12109-5022 18661v4c0 12866 6532 24246 16500 30882-6083-180-11804-1876-16828-4626v464c0 17993 12789 33007 29783 36400-3113 845-6400 1313-9786 1313-2398 0-4709-247-7007-665 4746 14736 18448 25478 34673 25791-12722 9967-28700 15902-46120 15902-3006 0-5935-184-8860-534 16466 10565 35972 16684 56928 16684 68271 0 105636-56577 105636-105632 0-1630-36-3209-104-4806 7251-5187 13538-11733 18514-19185l17-17-3 2z" fill="#1da1f2"></path></svg>
                                    </a>
                                    <a href="#" title="Twitter">
                                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333333 333333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm90493 110539c-6654 2976-13822 4953-21307 5835 7669-4593 13533-11870 16333-20535-7168 4239-15133 7348-23574 9011-6787-7211-16426-11694-27105-11694-20504 0-37104 16610-37104 37101 0 2893 320 5722 949 8450-30852-1564-58204-16333-76513-38806-3285 5666-5022 12109-5022 18661v4c0 12866 6532 24246 16500 30882-6083-180-11804-1876-16828-4626v464c0 17993 12789 33007 29783 36400-3113 845-6400 1313-9786 1313-2398 0-4709-247-7007-665 4746 14736 18448 25478 34673 25791-12722 9967-28700 15902-46120 15902-3006 0-5935-184-8860-534 16466 10565 35972 16684 56928 16684 68271 0 105636-56577 105636-105632 0-1630-36-3209-104-4806 7251-5187 13538-11733 18514-19185l17-17-3 2z" fill="#1da1f2"></path></svg>
                                    </a>
                                    <a href="#" title="LinkedIn">
                                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333333 333333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm-18220 138885h28897v14814l418 1c4024-7220 13865-14814 28538-14814 30514-1 36157 18989 36157 43691v50320l-30136 1v-44607c0-10634-221-24322-15670-24322-15691 0-18096 11575-18096 23548v45382h-30109v-94013zm-20892-26114c0 8650-7020 15670-15670 15670s-15672-7020-15672-15670 7022-15670 15672-15670 15670 7020 15670 15670zm-31342 26114h31342v94013H96213v-94013z" fill="#0077b5"></path></svg>
                                    </a>
                                    <a href="#" title="Github">
                                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="0" height="0" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640"><path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z"></path></svg>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        
                        
                    </div>
                    <div class="flex flex-col w-full 2xl:w-2/3">
                        <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 class="text-xl text-gray-900 font-bold">About</h4>
                            <p class="mt-2 text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates obcaecati numquam error et ut fugiat asperiores. Sunt nulla ad incidunt laboriosam, laudantium est unde natus cum numquam, neque facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, magni odio magnam commodi sunt ipsum eum! Voluptas eveniet aperiam at maxime, iste id dicta autem odio laudantium eligendi commodi distinctio!</p>
                        </div>

                    </div>
                </div>
            </div>



        </div>
    );
}

export default User;