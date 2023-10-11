import React, { useEffect, useState } from 'react';
import "./components.css"
import { useMyContext } from '../context/context'
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './card.js'
const SignalCardList = ({ }) => {
    const pageSize = 1;
    const [signals, setSignals] = useState([])
    const [hasMore, setHasMore] = useState(true);


    function loadMoreSignals() {
        // Calculate the page or offset to request based on the number of signals loaded
        const page = Math.ceil(signals.length / pageSize) + 1;
      
        fetch(`http://localhost:3000/api/get-signals?page=${page}`)
          .then((response) => response.json())
          .then((newSignals) => {
            if (newSignals.length === 0) {
              // If no more signals are returned, set hasMore to false
              setHasMore(false);
            } else {
              // Append the new signals to the existing signals
              setSignals((prevSignals) => [...prevSignals, ...newSignals]);
            }
          })
          .catch((error) => console.log('error', error));
      }
      



    useEffect(() => {
        loadMoreSignals();

    }, [])






    return (
        <div className='webkit-fill-available' id='signals-container'>

            <InfiniteScroll
                dataLength={signals.length}
                next={loadMoreSignals}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>} // Loading indicator
            >
                <div className="flex-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-0 md:p-5">
                    {signals ? signals.map((signal) => (
                        <Card signal={signal} />
                    )) : 'No Signal Yet'}
                </div>

            </InfiniteScroll>

        </div>
    );
};

export default SignalCardList;
