import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button,ButtonToolbar} from 'react-bootstrap'
export default class BoomerangPlayer extends Component {	
	constructor(props){
		super(props)
	    this.state={
	    	index:0,
	    	intervalId:0,
	    	fps:2,
	    	email:""
	    }		
	}
  	static propTypes = {
	    images:PropTypes.array.isRequired,
	    onDone:PropTypes.func.isRequired,
	    onRedo:PropTypes.func.isRequired
 	}
  	componentDidMount() {  		
  		this.state.intervalId = setInterval(::this.timer, 1000/this.state.fps);	    
  	}
  	componentWillUnmount(){
  		clearInterval(this.state.intervalId)
  	}
  	timer(){
  		this.setState({index:this.state.index + 1})
  	}
	  handleChange = (e) => {
	  	this.state.email = e.target.value
	  }
	  handleEmail = ()=> {
	    let text = this.state.email
	    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
	    if(reg.test(text) === false)
	    {
	        alert("Email is Not Correct");
	        this.state.email = text
	        return false;
	    }
	    else {
	      this.state.email = text
	      alert("Email is Correct");
	      this.props.onDone();
	    }
	    alert(this.state.email)
	  }
	render() {
		var len = this.props.images.length
		const name_list = ['anim1.jpg','anim2.jpg','anim3.jpg','anim4.jpg','anim5.jpg','anim6.jpg','anim7.jpg','anim8.jpg']
		len = name_list.length
		var photo = "";
		// if(len >0)
		// {
		// 	photo = this.props.images[this.state.index%len]
		// 	this.state.index = this.state.index%len
		// }
		if(len >0)
		{
			photo = name_list[this.state.index%len]
			this.state.index = this.state.index%len
		}
		photo = "./image/" + photo
	    return (
	      <div className = "container">
	      	<div className = "row">
		     	<img src={ photo }  />
	      	</div>
	      	<div className = "row">
	      		<Button type = "submit" onClick={this.handleEmail}>Email</Button>            
              		<input type="email" onChange={this.handleChange}/>
            	<Button onClick={this.props.onRedo} style={{float:"right"}}>Redo</Button>
            	<Button onClick={this.props.onDone} style={{float:"right"}}>Done</Button>
	      	</div>
	      </div>
	    );
	  }
}