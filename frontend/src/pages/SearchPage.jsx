import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addList } from '../slices/listSlice';
import config from '../config';

const SearchPage = () => {
  const [filter, setFilter] = useState('');
  const [filteredCodes, setFilteredCodes] = useState([]);
  const [listName, setListName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const handleFilter = () => {
    let pattern;
    try {
      pattern = filter.replace(/x/g, '\\d').replace(/\d/g, (d) => d);
      pattern = new RegExp(`^${pattern}$`);
    } catch (err) {
      setError('Invalid filter pattern');
      return;
    }

    const codes = [];
    for (let i = 100; i <= 599; i++) {
      if (pattern.test(i.toString())) {
        codes.push({
          code: i,
          imageUrl: `${config.imageBaseUrl}/${i}.jpg`,
        });
      }
    }

    setFilteredCodes(codes);
    setError('');
  };

  const handleSaveList = async () => {
    if (!listName.trim()) {
      setError('Please enter a list name');
      return;
    }

    if (filteredCodes.length === 0) {
      setError('No status codes to save');
      return;
    }

    try {
      const { data } = await axios.post(
        `${config.apiBaseUrl}/lists`,
        {
          name: listName,
          statusCodes: filteredCodes,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('userInfo')).token
            }`,
          },
        }
      );

      dispatch(addList(data));
      setMessage('List saved successfully!');
      setListName('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save list');
    }
  };

  return (
    <div className="container-layout py-6">
      <div className="p-4 bg-background-paper/80 border border-primary/10 mb-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Enter pattern (e.g., 4xx, 5xx, 404)"
              className="flex-1 px-3 py-1.5 text-sm bg-background-paper/50 border border-primary/20 
                       text-text-primary placeholder-text-secondary/50 
                       focus:outline-none focus:border-primary/40
                       transition-all duration-300"
            />
            <button 
              onClick={handleFilter}
              className="px-4 py-1.5 text-sm bg-primary hover:bg-primary-hover text-white transition-all duration-300"
            >
              Search
            </button>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-3 py-2 text-sm">
              {error}
            </div>
          )}
          
          {filteredCodes.length > 0 && (
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  placeholder="Enter list name"
                  className="flex-1 px-3 py-1.5 text-sm bg-background-paper/50 border border-primary/20 
                           text-text-primary placeholder-text-secondary/50 
                           focus:outline-none focus:border-primary/40
                           transition-all duration-300"
                />
                <button 
                  onClick={handleSaveList}
                  className="px-4 py-1.5 text-sm bg-primary hover:bg-primary-hover text-white transition-all duration-300"
                >
                  Save List
                </button>
              </div>
              {message && (
                <div className="bg-green-500/10 border border-green-500/50 text-green-500 px-3 py-2 text-sm">
                  {message}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCodes.map((item) => (
          <div key={item.code} className="p-3 bg-background-paper/80 border border-primary/10">
            <img
              src={item.imageUrl}
              alt={`HTTP ${item.code}`}
              className="w-full h-40 object-cover mb-3"
              onError={(e) => {
                e.target.src = `${config.imageBaseUrl}/404.jpg`;
              }}
            />
            <h3 className="text-sm font-medium text-text-primary text-center">
              Status {item.code}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;