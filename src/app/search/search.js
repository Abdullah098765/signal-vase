import React, { useEffect, useState } from "react";
import { useMyContext } from "../context/context";
import Card from '../components/card.js'
import InfiniteScroll from "react-infinite-scroll-component";

function Search({ }) {
  const {
    isOpen,
    setIsOpen,
    routerLoading,
    setRouterLoading,
    setIsSliderOpen,
    isSliderOpen,
    closeSidenav,
    isModalOpen,
    setIsModalOpen,
    user,
    setSearchString,
    hasMore,
    searchString,
    searchResultSignals, setsSearchResultSignals,
    searchResultUsers, setsSearchResultUsers, getSearchResult,
    setIsSkip
  } = useMyContext();


  // const [_searchString, set_SearchString] = useState();
  useEffect(
    () => {
      console.log(searchResultSignals, searchResultUsers);
    },
    [searchString]
  );
  return (
    <div className="w-full">
      <InfiniteScroll
        dataLength={searchResultSignals.length}  // Corrected from 'posts.length'
        next={() => {
          setIsSkip(true)
          console.log('hasMore');
          getSearchResult(searchString)
        }}
        hasMore={true}

      >
        <div className="flex-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 webkit-fill-available gap-1 p-0 md:p-2">

          {/* Render your signals */}
          {searchResultSignals && searchResultSignals.map((signal, index) => (
            <Card signal={signal} key={signal._id} />

          ))}
        </div>
      </InfiniteScroll>


    </div>
  );
}

export default Search;
