import React, { useState } from 'react';
import useAPI from '../tools/useAPI';
import Cards from './Cards';
import { NavLink } from 'react-router-dom';

const Body = () => {
  const data = useAPI();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProduct, setFilteredProduct] = useState(null);
  const [sortBy, setSortBy] = useState('priceLowToHigh');
  const [searchInput, setSearchInput] = useState('');
  const product = data.map(item => item.category);
  const categories = [...new Set(product), 'All'];

  const handleCategorySelect = category => {
    setSelectedCategory(category);
  };

  const filterCat = cat => {
    return selectedCategory === 'All' || cat.category === selectedCategory;
  };

  let filteredProducts = selectedCategory ? (filteredProduct || data).filter(filterCat) : filteredProduct;

  const filterData = (searchInput, input) => {
    const filterDatas = input?.filter(datas => datas.title.toLowerCase().includes(searchInput.toLowerCase()));
    return filterDatas;
  };

  const handleSortChange = e => {
    setSortBy(e.target.value);
  };

  if (filteredProducts) {
    if (sortBy === 'priceLowToHigh') {
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHighToLow') {
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }
  }

  return (
    <div className="container mx-auto px-4">
      <div className='search-container flex justify-center mt-8'>
        <div className='search-input flex items-center w-full max-w-md'>
          <input
            className="input border border-gray-300 rounded-l-md py-2 px-4 mr-0 focus:outline-none w-full"
            type='text'
            placeholder="Search for restaurants..."
            value={searchInput}
            onChange={e => {
              setSearchInput(e.target.value);
            }}
          />
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none"
            onClick={() => {
              const newdata = filterData(searchInput, data);
              setFilteredProduct(newdata);
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 my-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-blue-600 ${selectedCategory === category ? 'bg-blue-600' : ''}`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
        <select
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md focus:outline-none"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-center">
        {(filteredProducts || data).map(item => (
          <NavLink key={item.id} to={"/details/" + item.category + "/" + item.id}>
            <Cards item={item} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Body;


