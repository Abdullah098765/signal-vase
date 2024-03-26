import React from 'react';
import { Fade, Slide, Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


const ImageSlide = ({ openedImage, setOpenedImage }) => {
      return (
            <div className="fixed top-0 left-0 flex  justify-center z-30 items-center w-full h-full bg-black bg-opacity-75">
                  <div className="max-w-lg w-full mx-4">
                        <button className="absolute top-4 right-4 z-40" onClick={() => setOpenedImage(null)}>
                              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                        </button>
                        <div className="relative">

                              <div className="slide-container flex flex-col justify-center items-center">
                                    <img src={openedImage.url} alt={openedImage.caption} className="w-full rounded-t-lg mb-4 object-cover" />
                                    <span className="block text-center text-white">{openedImage.caption}</span>
                              </div>
                        </div>
                  </div>
            </div>



      );
};



export default ImageSlide;
