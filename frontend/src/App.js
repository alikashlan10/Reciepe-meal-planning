import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
//import pages & comoponents
import RegisterPage from './pages/Register';
import LoginPage from './pages/login';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import AddRecipePage from './pages/AddRecipePage';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/register"
              element={ <RegisterPage />}
            />
            <Route
            path='login'
            element={<LoginPage/>}
            />
            <Route
            path='/home'
            element={<Home/>}
            />
            <Route
            path='/form'
            element={<AddRecipePage/>}
            />
            <Route
            path='/profile/:username'
            element={<UserProfile/>}
            />

          </Routes>

          
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
