import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAppContext from '../AppContext';

const Navbar = ({cartItems}) => {

  const { loggedIn, setLoggedIn } = useAppContext();

  const sessionData = sessionStorage.getItem('user');
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionData));
  
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/login');
    setLoggedIn(false);
  }

  const displayLoginOptions = () => {
    if (loggedIn) {
      return <>
        <li className="nav-item">
          <NavLink className="nav-link" to="/AddFurniture">
            AddFurniture
          </NavLink>
        </li>
        <li className="nav-item">
          <button className='btn btn-danger' onClick={logout}>Logout</button>
        </li>
      </>
    } else {
      return <>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/manageuser">
            ManageUser
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/browsefurniture">
            BrowseFurniture
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/updatefurniture">
            UpdateFurniture
          </NavLink>
        </li>
        
      </>
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#005d8d' }}>
      <div className="container">
        <a className="navbar-brand" href="#">
          Vintage
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/managefurniture">
                Manage Furniture
              </NavLink>
            </li>
            
            
            {displayLoginOptions()}
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar;