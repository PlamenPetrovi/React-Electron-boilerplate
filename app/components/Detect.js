import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button,ButtonToolbar} from 'react-bootstrap'
export default class Detect extends Component {
	IsCameraExists() {
		navigator.getMedia({video: true}, function() {
		  // webcam is available
		  alert('YES')
		}, function() {
		  // webcam is not available
		});
		navigator.mediaDevices.getUserMedia({video: true})
		  .then(function(stream) {
		    alert('connected to the camera')
		  }).catch(function() {
		    alert('could not connect camera');
		  });
	}
	IsPrinterExists(){
		var printer = require("node-thermal-printer");
		printer.init({
			  type: 'epson',
			  interface: '/dev/usb/lp0'
			});
		printer.isPrinterConnected( function(isConnected){ if(isConnected){alert("Printer Connected");}else{alert("Printer Not Connected")} } )
	}

	render() {
	    return (
	      <div>
      		<ButtonToolbar>
				<Link to="/start"><Button >Main Page</Button></Link>
      		</ButtonToolbar>
	      </div>
	    );
	  }
}