import React, { useEffect, useState } from "react";
import { useMyContext } from "../context/context";

function Search({}) {
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
    searchString
  } = useMyContext();


  // const [_searchString, set_SearchString] = useState();
  // useEffect(
  //   () => {
  //     const urlParts = window.location.href.split("search=");
  //     console.log(urlParts);

  //     urlParts.length > 1 && set_SearchString(urlParts[urlParts.length - 1]);
  //   },
  //   [searchString]
  // );
  return (
    <div className="w-full">
      Search result for {searchString}
      <hr />
    </div>
  );
}

export default Search;
