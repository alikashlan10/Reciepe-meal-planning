import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
//import pages & comoponents

import LoginPage from './pages/login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
            path="/"
            element={ <LoginPage />}

            />
          </Routes>


        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
