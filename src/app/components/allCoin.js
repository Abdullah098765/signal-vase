import React, { useState } from 'react';

const CryptoPairSelector = () => {
  const [selectedPair, setSelectedPair] = useState('');
  const [searchText, setSearchText] = useState('');
  const cryptoPairs = ['BTC/USDT', 'ETH/USDT', 'LTC/USDT', /* Add more pairs */];

  // Filter the pairs based on the search input
  const filteredPairs = cryptoPairs.filter(pair =>
    pair.toLowerCase().includes(searchText.toLowerCase())
  );


  
  return (
    <div>
      <input
        type="text"
        className='w-full border rounded p-2'
        placeholder="Search for a cryptocurrency pair"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ul>
        {filteredPairs.map((pair) => (
          <li
            key={pair}
            onClick={() => setSelectedPair(pair)}
          >
            {pair}
          </li>
        ))}
      </ul>
      {selectedPair && (
        <p>You selected: {selectedPair + ''}</p>
      )}
    </div>
  );
};

export default CryptoPairSelector;
