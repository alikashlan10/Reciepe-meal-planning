import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
//import pages & comoponents
import RegisterPage from './pages/Register';
import LoginPage from './pages/login';
import Navbar from './components/NavBar';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={ <RegisterPage />}

            />
            <Route
            path='login'
            element={<LoginPage/>}
            />
          </Routes>

          
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
