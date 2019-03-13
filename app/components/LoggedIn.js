import React, { Component } from 'react';
import Detect from '../components/Detect';
import {NavItem,Navbar,Nav} from 'react-bootstrap'
export default class LoggedIn extends Component {
  render() {
    return (
    	<div>      
    		<h2>Logged in as {this.props.myuser.username}</h2>
        	<Detect> </Detect>      	   
        </div>
    );
  }
}
