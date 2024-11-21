import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import config from '../config';
import { setLists, deleteList, updateList } from '../slices/listSlice';
import { Link } from 'react-router-dom';

const ListsPage = () => {
  const [selectedList, setSelectedList] = useState(null);
  const [editingList, setEditingList] = useState(null);
  const [newName, setNewName] = useState('');

  const dispatch = useDispatch();
  const { lists } = useSelector((state) => state.lists);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const { data } = await axios.get(`${config.apiBaseUrl}/lists`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch(setLists(data));
      toast.success('Lists loaded successfully', {
        toastId: 'lists-loaded',
      });
    } catch (err) {
      const statusCode = err.response?.status || 500;
      const message = err.response?.data?.message || 'Failed to fetch lists';
      toast.error(`Error ${statusCode}: ${message}`, {
        toastId: 'lists-error',
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.apiBaseUrl}/lists/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch(deleteList(id));
      toast.success('List deleted successfully', {
        toastId: 'list-deleted',
      });
      if (selectedList?._id === id) {
        setSelectedList(null);
      }
    } catch (err) {
      const statusCode = err.response?.status || 500;
      const message = err.response?.data?.message || 'Failed to delete list';
      toast.error(`Error ${statusCode}: ${message}`, {
        toastId: 'delete-error',
      });
    }
  };

  const handleEdit = async (id) => {
    if (!newName.trim()) {
      toast.error('Please enter a new name', {
        toastId: 'name-required',
      });
      return;
    }

    try {
      const { data } = await axios.put(
        `${config.apiBaseUrl}/lists/${id}`,
        {
          name: newName,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch(updateList(data));
      toast.success('List updated successfully', {
        toastId: 'list-updated',
      });
      setEditingList(null);
      setNewName('');
    } catch (err) {
      const statusCode = err.response?.status || 500;
      const message = err.response?.data?.message || 'Failed to update list';
      toast.error(`Error ${statusCode}: ${message}`, {
        toastId: 'update-error',
      });
    }
  };

  return (
    <div className="container-layout py-6">
      <div className="p-4 bg-background-paper/80 border border-primary/10 mb-4">
        <h1 className="text-lg font-medium text-text-primary mb-4">My Lists</h1>
        
        {lists.length === 0 ? (
          <p className="text-sm text-text-secondary text-center py-4">
            You haven't created any lists yet. Go to the{' '}
            <Link to="/" className="text-primary hover:text-primary-hover transition-all duration-300">
              search page
            </Link>{' '}
            to create one!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {lists.map((list) => (
              <div
                key={list._id}
                className="bg-background-paper/90 border border-primary/10 rounded-sm overflow-hidden"
              >
                <div className="px-3 py-2 border-b border-primary/10 flex justify-between items-center">
                  {editingList === list._id ? (
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="flex-1 px-2 py-1 text-sm bg-background-paper/50 border border-primary/20 
                               text-text-primary placeholder-text-secondary/50 
                               focus:outline-none focus:border-primary/40 rounded-sm"
                      placeholder="New name"
                    />
                  ) : (
                    <h2 className="text-sm font-medium text-text-primary truncate">
                      {list.name}
                    </h2>
                  )}
                  <div className="flex items-center gap-2 ml-2">
                    {editingList === list._id ? (
                      <>
                        <button
                          onClick={() => handleEdit(list._id)}
                          className="text-xs text-green-400 hover:text-green-300 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingList(null);
                            setNewName('');
                          }}
                          className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingList(list._id);
                            setNewName(list.name);
                          }}
                          className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                          title="Edit list"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(list._id)}
                          className="p-1 text-red-500 hover:text-red-400 transition-colors"
                          title="Delete list"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-1 p-1">
                  {list.statusCodes.map((item) => (
                    <div
                      key={item.code}
                      className="relative group aspect-square overflow-hidden"
                    >
                      <img
                        src={`${config.imageBaseUrl}/${item.code}.jpg`}
                        alt={`HTTP ${item.code}`}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          e.target.src = `${config.imageBaseUrl}/404.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="absolute bottom-0 left-0 right-0 p-1 text-center">
                          <p className="text-white text-xs font-medium">{item.code}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-3 py-1.5 border-t border-primary/10">
                  <p className="text-xs text-text-secondary/70">
                    {new Date(list.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListsPage;
