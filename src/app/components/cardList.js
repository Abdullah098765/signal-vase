import React, { useEffect, useState } from 'react';
import "./components.css"
import { useMyContext } from '../context/context'
import Card from './card.js'
import InfiniteScroll from 'react-infinite-scroll-component';

const SignalCardList = ({ }) => {



  const { signals, setSignals, user,hasMore,isSignalsLoading, getSignals, lineClicked, closeSidenav } = useMyContext()
  useEffect(() => {
    // getSignals()
    console.log(signals);
  }, [])

  const [windowWidth, setWindowWidth] = useState();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Access localStorage here
      setWindowWidth(window.innerWidth)
      // Do something with 'data'
    }
  }, [])

  useEffect(() => {
    // Function to handle window resize
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Add an event listener to the window
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []); // The empty dependency array ensures this effect runs once after the initial render

  useEffect(() => {
    console.log("Browser window width: " + windowWidth + " pixels");
    if (!lineClicked) {
      if (windowWidth <= 1100) {
        closeSidenav(false);
      }
    }
    if (windowWidth >= 1100) {
      closeSidenav(true);
    }
    console.log(windowWidth);
  }, [windowWidth]);



  return (
    <div className='webkit-fill-available'>
    {signals.length > 0 ? (
        <InfiniteScroll
          dataLength={signals.length}  // Corrected from 'posts.length'
          next={getSignals}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
      <div className="flex-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 webkit-fill-available gap-1 p-0 md:p-2">

          {/* Render your signals */}
          {signals.map((signal, index) => (
                     <Card signal={signal} key={signal._id} />
            
          ))}
      </div>

        </InfiniteScroll>
        
    ) : (
      isSignalsLoading &&   <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-white mt-4">Loading...</p>
      </div>
    )}
    {signals?.length < 1 && <div>There are no matches!</div>}
  </div>
  
  );
};

export default SignalCardList;
