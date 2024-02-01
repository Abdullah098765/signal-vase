import React, { useEffect, useState } from 'react';
import "./components.css"
import { useMyContext } from '../context/context'
import Card from './card.js'
import SkeletonCard from './SkeletonCard.js'
import InfiniteScroll from 'react-infinite-scroll-component';

const SignalCardList = ({ }) => {



  const { signals, setSignals, user, hasMore, isSignalsLoading, getSignals, lineClicked, closeSidenav } = useMyContext()
  const [page, setPage] = useState(1);
  const [isMoreSignalsLoading, setIsMoreSignalsLoading] = useState(false);
  useEffect(() => {
    getSignals(page, setIsMoreSignalsLoading)
    console.log(signals);
  }, [page])

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


  if (!signals[0]?._id) return <div className="flex-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 webkit-fill-available gap-1 p-0 md:p-2">
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </div>
  return (
    <div className='webkit-fill-available'>
      {signals.length > 0 ? (
        <InfiniteScroll
          dataLength={signals.length}  // Corrected from 'posts.length'
          next={() => {
            setPage((prevPage) => prevPage + 1)
            setIsMoreSignalsLoading(true)
          }}
          hasMore={hasMore}

        >
          <div className="flex-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 webkit-fill-available gap-1 p-0 md:p-2">

            {/* Render your signals */}
            {signals.map((signal, index) => (
              <Card signal={signal} key={signal._id} />

            ))}
            {true && <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />

            </>}
          </div>

        </InfiniteScroll>

      ) : (
        isSignalsLoading && <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      )}
    </div>

  );
};

export default SignalCardList;
