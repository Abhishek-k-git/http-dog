import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import config from '../config';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(`${config.apiBaseUrl}/users/register`, {
        name,
        email,
        password,
      });

      dispatch(setCredentials(data));
      navigate('/');
      toast.success('Registration successful!');
    } catch (err) {
      const statusCode = err.response?.status || 500;
      const message = err.response?.data?.message || 'An error occurred';
      setError(`Error ${statusCode}: ${message}`);
      toast.error(`Error ${statusCode}: ${message}`, {
        toastId: 'register-error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-layout min-h-[calc(100vh-4rem)] flex items-center justify-center py-6">
      <div className="w-full max-w-md p-6 bg-background-paper/80 border border-primary/10">
        <h1 className="text-xl font-medium text-text-primary mb-6">Register</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-3 py-2 text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm text-text-secondary">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-background-paper/50 border border-primary/20 
                       text-text-primary placeholder-text-secondary/50 
                       focus:outline-none focus:border-primary/40
                       transition-all duration-300"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm text-text-secondary">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-background-paper/50 border border-primary/20 
                       text-text-primary placeholder-text-secondary/50 
                       focus:outline-none focus:border-primary/40
                       transition-all duration-300"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm text-text-secondary">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-background-paper/50 border border-primary/20 
                       text-text-primary placeholder-text-secondary/50 
                       focus:outline-none focus:border-primary/40
                       transition-all duration-300"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="block text-sm text-text-secondary">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-background-paper/50 border border-primary/20 
                       text-text-primary placeholder-text-secondary/50 
                       focus:outline-none focus:border-primary/40
                       transition-all duration-300"
              required
            />
          </div>

          <button 
            type="submit" 
            className="px-4 py-1.5 text-sm bg-primary hover:bg-primary-hover text-white transition-all duration-300 mt-4"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>

          <p className="text-sm text-text-secondary text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-hover transition-all duration-300">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
