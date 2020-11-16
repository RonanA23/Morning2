import React,{Fragment} from 'react'
import './App.css';
import Navbar from './components/layout/Navbar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import ContactState from './context/contact/ContactState'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import setAuthToken from './utils/setAuthToken'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
        <Router>
    <Fragment className="App">
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
      </Switch>
    </Fragment>
    </Router>
        </AlertState>
    </ContactState>
    </AuthState>
    
  );
}


export default App;
