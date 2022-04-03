import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./nav.css";
import { MdFingerprint } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, NavDropdown, Row } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { Logo } from "./logo";

const RegisterButton = styled.button`
  border: 0;
  outline: 0;
  padding: 10px ;
  color: white;
  font-size: 20x;
  font-weight: 200;
  border-radius: 10px;
  background-color: black;
  transition: all 240ms ease-in-out;
  cursor: pointer;
  font-color: white;

  &:hover {
    background-color: #00c9ff;
  }

  &:not(:last-of-type) {
    margin-right: 0px;
  }
`;

export function Nav1(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
  }, []);

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight
  });
  const updateSize = () =>
    setSize({
      x: window.innerWidth,
      y: window.innerHeight
    });
  useEffect(() => (window.onresize = updateSize), []);

  return (
    <>{userInfo ? (
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar" >
          <div className="navbar-container container">
          
          <Logo />
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item" style={{color:'#ffd700' ,marginLeft:size.x * -0.03}}>
                <Link to="/" className="nav-links" onClick={closeMobileMenu}><h5 style={{color:'#ffd700'}}>HOME</h5>
                </Link>
              </li>

              <li className="nav-item" style={{color:'#ffd700' ,marginLeft:size.x * 0.03}}>
                <Link to='/admin/orderlist' className="nav-links" onClick={closeMobileMenu}><h5 style={{color:'#ffd700'}}>INVESTMENT MANAGER</h5></Link>
              </li>

              <li className="nav-item" style={{color:'#ffd700' ,marginLeft:size.x * 0.03}}>
                <Link to='/profile' className="nav-links" onClick={logoutHandler}><h5 style={{color:'#ffd700'}}>LOGOUT</h5></Link>
              </li>

            </ul>
          </div>
        </nav>
      </IconContext.Provider>
      ) : (

        <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar" >
          <div className="navbar-container container">
          
          <Logo />
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item" style={{color:'#ffd700' ,marginLeft:size.x * 0.03}}>
                <Link to="/" className="nav-links" onClick={closeMobileMenu}><h5 style={{color:'#ffd700'}}>HOME</h5>
                </Link>
              </li>
              <li className="nav-item" style={{color:'#ffd700' ,marginLeft:size.x * 0.03}}>
                
                <Link to="/properties" className="nav-links" onClick={closeMobileMenu}><h5 style={{color:'#ffd700'}}>PROPERTIES</h5></Link>
                
              </li>
              
              <li className="nav-item" style={{color:'#ffd700' ,marginLeft:size.x * 0.03}}>
                <Link to="/secure" className="nav-links" onClick={closeMobileMenu}><h5 style={{color:'#ffd700' }}>PROPERTY SECURE</h5></Link>
              </li>

              
                <li className="nav-item"  style={{color:'#ffd700' ,marginLeft:size.x * 0.03}}>
                
                <Link to="/login" className="nav-links" onClick={closeMobileMenu} ><h5 style={{color:'#ffd700'}}>LOG IN</h5></Link>
                
              </li>

              <li className="nav-btn">
              {userInfo && userInfo.isAdmin && (
                <li className="nav-btn"><NavDropdown title={<h5 style={{color:'#ffd700'}}>ADMIN</h5>} id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item onClick={closeMobileMenu}>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item onClick={closeMobileMenu}>Products</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
               </li>
              )}
              </li>
              <li className="nav-btn">
              {userInfo && userInfo.isManager && (
                <li className="nav-btn">
                <Link to='/profile' className="nav-links" onClick={closeMobileMenu}><h5 style={{color:'#ffd700'}}>INVESTMENT MANAGER</h5></Link>
               </li>
              )}
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
        )}
    </>
  );
}

