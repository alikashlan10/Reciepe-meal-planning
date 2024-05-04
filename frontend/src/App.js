import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
//import pages & comoponents
import RegisterPage from './pages/Register';
import LoginPage from './pages/login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={ <RegisterPage />}

            />
          </Routes>


        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
