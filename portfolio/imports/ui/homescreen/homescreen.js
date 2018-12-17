import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Transition, TransitionGroup} from 'react-transition-group';
 
//Styling - not really using them to their full extent
import 'tachyons';
import anime from 'animejs';

import ProjectCard from './projectcard.js'


class HomeScreen extends Component {
  constructor() {
    super();


	    this.state = {
	    	data: [1],
	    	in: true,
	    	firstName : "P",
	    	secondName : "J",
	    	lowercaseOpacity: 'o-0'
	    };

	    

	    

	 }

	 componentDidMount(){

	 	var startP = anime({
			  targets: '#Pnode .Pel',
			  translateX: [
			    {
			      value: 250,
			      duration: 550,
			    },
			    {
			      value: 0,
			      duration: 1000,
			    }
			  ],
			});

	 	var scrollB = anime({
	 		targets: '#scroll',
	 		translateY: [
			    {
			      value: 25,
			      duration: 1050,
			    },
			    {
			      value: 100,
			      duration: 1000,
			      delay: 2500,
			    }
			  ],
			  rotate: -45,
	 	});


	 	setTimeout(()=> {

	 	var lowerletters = anime({
			  targets: '#Pnode .rel',
			  opacity: 1,
			  easing: 'easeInOutQuad'
			});
	    	
	    }, 1000);

	    setTimeout(()=> {

	 	var scrollB = anime({
			  targets: '#scrolldiv',
			  opacity: 1,
			  easing: 'easeInOutQuad'
			});
	    	
	    }, 2500);


	 }



    render() {
    	//tranistion component takes two values, in (which if true will display entering and entered)
    	// in == false will render exiting and exited
    	// duration is the time between entering - entered, and exiting-exited
    	console.log(this.state);
	    return (
		
	    	<div>
	    	<div className = "vh-100  dt w-100 bg-black">


	    		<div className = "dtc v-mid tc white ph3 ph4-l">


	    			<div id="Pnode" className="dib">

						<h1 className="dib f-subheadline-l Pel"> P </h1>
						<h1 className={ 'dib f-subheadline-l rel pr3 ' + this.state.lowercaseOpacity }> rageeth </h1>
						<h1 className="dib f-subheadline-l Jel"> J</h1>
						<h1 className={ 'dib f-subheadline-l rel ' + this.state.lowercaseOpacity }> ayathissa</h1>

					</div>

					<div id = "scrolldiv" className= "white bottom-0 pa5 o-0">
						<h3> Scroll </h3>
						<div id = "scroll" className= "scrollbutton pa1 white">
		    				<span></span>
						</div>
					</div>
					

				</div>
				
		    	

	    	
	    	</div>

	    	<div className = "center bg-white pa3 ph5-ns">
	    		<ProjectCard />
	    		<ProjectCard />
	    	</div>

	    	</div>
    );
  }
}

// Exporting HomeScreen Component, while simultaneously pulling data from the database
export default HomeScreen