import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import ListsPage from './pages/ListsPage';
import PrivateRoute from './components/PrivateRoute';

const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  },
  basename: '/'
};

function App() {
  return (
    <Provider store={store}>
      <Router {...router}>
        <div className="min-h-screen bg-gradient-to-br from-background to-background-paper text-text-primary">
          <div className="fixed inset-0 bg-gradient-radial from-primary/5 to-transparent pointer-events-none" />
          <Header />
          <main className="container-layout relative z-10">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<SearchPage />} />
                <Route path="/lists" element={<ListsPage />} />
              </Route>
            </Routes>
          </main>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            toastClassName="glass-card"
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;