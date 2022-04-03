import React , { useState, useEffect }  from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import OrderListScreen from './screens/OrderListScreen'
import "./App.css";
import { Nav1 } from "./components/nav";
import PacmanLoader from "react-spinners/RingLoader";
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'



export const homeObjThree = {
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: "",
  headline: "INVEST IN LEASED RESIDENTIAL PROPERTIES",
  description:
    "EARN MONTHLY RENTS AND BENEFIT FROM CAPITAL APPRECIATION",
  buttonLabel: "View Opportunity",
  imgStart: "start",
  img: "https://firebasestorage.googleapis.com/v0/b/wasd4gogul.appspot.com/o/pexels-alex-1732414.jpg?alt=media&token=84f14cf4-7031-4830-aa38-682da6a4f276",
  alt: "Vault"
};

const App = () => {


  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
  
    // Wait for 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  
  // Custom css for loader
  const override = `
  display: block;
  margin-top: 200px;
  border-color: red;
`;


  return (
    isLoading ?
  
    // If page is still loading then splash screen
    <center>
      <PacmanLoader color={'#ffd700'} isLoading={isLoading}
      css={override} size={150} />
      <h1 style={{color:'#ffd700'}}>MALLICK EMPIRE</h1>
    </center> :
    <Router>
      <Nav1 />
      <div style={{padding: 30}}></div>
      <main className='py-3'>
        <Container>
        <Route path='/login' component={LoginScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/register' component={RegisterScreen} />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
        
      </main>
      <div>
        
      </div>
    </Router>
  )
}

export default App
