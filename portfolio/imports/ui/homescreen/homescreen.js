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
	    	lowercaseOpacity: 'o-0',
	    	uppercaseOpacity: 'o-0'
	    };

	    

	    

	 }

	 componentDidMount(){

	 	setTimeout(() => {
			var lineDrawing = anime({
			  targets: '#lineDrawing .lines path',
			  translateX: 0,
			  translateY: 0,
			  strokeDashoffset: [anime.setDashoffset, 0],
			  easing: 'easeInOutSine',
			  duration: 1500,
			  delay: 100,
			  direction: 'alternate',
			  loop: false
			});

	 	}, 0)
	 	

	 	var startP = anime({
			  targets: '#Pnode .Pel',
			  translateX: [
			    {
			      value: 250,
			      duration: 550,
			      delay: 0
			    },
			    {
			      value: 0,
			      duration: 1000,
			      delay: 2000
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
	 	var upperletters = anime({
			  targets: '#Pnode .Pel',
			  opacity: 1,
			  easing: 'easeInOutQuad'
			});
	    }, 1000);

	    setTimeout(()=> {
	 	var upperletters = anime({
			  targets: '#Pnode .Jel',
			  opacity: 1,
			  easing: 'easeInOutQuad'
			});
	    }, 1000);

	 	setTimeout(()=> {

	 	var lowerletters = anime({
			  targets: '#Pnode .rel',
			  opacity: 1,
			  easing: 'easeInOutQuad'
			});
	    	
	    }, 2000);

	    setTimeout(()=> {

	 	var scrollB = anime({
			  targets: '#scrolldiv',
			  opacity: 1,
			  easing: 'easeInOutQuad'
			});
	    	
	    }, 2500);


	 }

	renderSVG() {
		return (
	<div id="lineDrawing" className="absolute w-100 h-50 tc"> 
	<svg>
      <g fill="none" fillRule="evenodd" stroke="currentColor" strokeWidth="1" className="lines" transform = "translate(0 0)">
        <path d="M4.865,51.975V9.025h13.916c5.273,0,8.711,0.215,10.312,0.645
		c2.461,0.645,4.521,2.046,6.182,4.204c1.66,2.158,2.49,4.947,2.49,8.364c0,2.637-0.479,4.854-1.436,6.65
		c-0.957,1.797-2.173,3.208-3.647,4.233c-1.475,1.025-2.974,1.704-4.497,2.036c-2.07,0.41-5.068,0.615-8.994,0.615h-5.654v16.201
		H4.865z M13.537,16.291v12.188h4.746c3.417,0,5.703-0.224,6.855-0.674c1.152-0.449,2.055-1.152,2.71-2.109
		c0.654-0.957,0.981-2.07,0.981-3.34c0-1.562-0.459-2.852-1.377-3.867c-0.918-1.015-2.08-1.65-3.486-1.904
		c-1.036-0.195-3.116-0.293-6.24-0.293H13.537z" ></path>
        <path d="M60.383,9.025h8.643v27.188c0,3.555-0.312,6.289-0.938,8.203
		c-0.84,2.5-2.363,4.507-4.57,6.021c-2.208,1.514-5.117,2.271-8.73,2.271c-4.238,0-7.5-1.187-9.785-3.56s-3.438-5.854-3.457-10.444
		l8.174-0.938c0.098,2.461,0.458,4.2,1.084,5.215c0.938,1.543,2.363,2.314,4.277,2.314c1.934,0,3.3-0.552,4.102-1.655
		c0.801-1.103,1.201-3.394,1.201-6.87V9.025z" ></path>
      </g>
    </svg> 
    </div>
				);
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

	    			<div className = "relative">
	    			<div className = "absolute w-100 h-50">
	    			{this.renderSVG()}
	    			</div>
	    			<div id="Pnode" className="dib relative">
	    				

						<h1 className={"dib f-subheadline-l Pel " + this.state.uppercaseOpacity}> P </h1>
						<h1 className={ 'dib f-subheadline-l rel pr3 ' + this.state.lowercaseOpacity }> rageeth </h1>
						<h1 className={"dib f-subheadline-l Jel "+ this.state.uppercaseOpacity}> J</h1>
						<h1 className={ 'dib f-subheadline-l rel ' + this.state.lowercaseOpacity }> ayathissa</h1>

					</div>
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