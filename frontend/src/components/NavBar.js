import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleClick = () => {
    logout()
    navigate(`/Welcome`)
  }

  const handleSearch = () => {
    // Logic for handling search action
    //console.log('Searching...');
    navigate(`/search/${searchQuery}`);
  };

  return (
    <header>
      <div className="container">
        <Link to="/home">
          <h1>Recipes</h1>
        </Link>
        { user && (<div className="search">
            <input type="text" placeholder="Search..." style={{ width: "700px", margin:"20px" }} value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
            <button onClick={handleSearch} style={{ backgroundColor:'#ff3333'}}>Search</button>
        </div>)}
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
              <Link to='/home'>Home</Link>
              <Link to='/form'>Add recipe</Link>
              
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar