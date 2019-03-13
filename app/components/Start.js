import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
export default class Start extends Component {
  	constructor(props) {
	    super(props);    	
	  }
    static propTypes = {
     onUpdate: PropTypes.func.isRequired
    };
	ConfigureOwnState(results){
		if(results.updated_at === undefined)
			return;
		if(this.state.api_host.updated_at!=results.updated_at){
			this.setState({api_host:results});
			console.log("SDJFLSDJF:LSDKJF:LSDKJF: => ", this.state.api_host);
			this.saveToLocal();
		}
	}
    componentDidMount() {
    	let mycomponent = this;
    // 	this.getInitialState();
    	var obj = {  
		  method: 'Get',
		  headers: {
			  'Content-Type': 'application/json',
			  'Authorization': 'Token token=8d702b11f4b1fc52d06b90b49750b2217d57831c1b23b25561' 
		  }};
    	fetch('https://photo-booth-201515.appspot.com/api/v1/photo_booth', obj)  
		  .then(function(res) {
		    return res.json();
		   }).then(function(resjson){
   			if(resjson.updated_at === undefined)
				return;
			if(mycomponent.props.api_host.updated_at!=resjson.updated_at){
				mycomponent.props.onUpdate(resjson);
			}
		  	
		   	return resjson;
		   })


  	}
  	handleStartPhotoBooth (e) {
    	this.props.history.push('/photobooth');
    }
	render() {
	    return (
	      <div>
	      		<div>
	      			<Button onClick={ ::this.handleStartPhotoBooth }> Photo Booth </Button>
		      		<Link to="/boomerang"><Button> Boomerang </Button> </Link>
	      		</div>
	      </div>
	    );
	  }
}