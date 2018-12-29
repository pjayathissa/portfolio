import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Transition, TransitionGroup} from 'react-transition-group';
 
//Styling - not really using them to their full extent
import 'tachyons';
import anime from 'animejs';

import ProjectCard from './projectcard.js'
import PJname from './pj.js'
import data from './myData.json'


class HomeScreen extends Component {
  constructor() {
    super();
    console.log(data[0].architecture[1])


	    this.state = {
	    	data: [1],
	    	in: true,
	    };

	    

	    

	 }

	 componentDidMount(){

	 	setTimeout(() => {
			var lineDrawing = anime({
			  targets: '#lineDrawing .P-letter path',
			  translateX: 0,
			  translateY: 0,
			  strokeDashoffset: [anime.setDashoffset, 0],
			  easing: 'easeInOutSine',
			  duration: 2000,
			  delay: 0,
			  direction: 'alternate',
			  loop: false
			});

	 	}, 0)

	 	setTimeout(() => {
			var lineDrawing = anime({
			  targets: '#lineDrawing .J-letter path',
			  translateX: 0,
			  translateY: 0,
			  strokeDashoffset: [anime.setDashoffset, 0],
			  easing: 'easeInOutSine',
			  duration: 2000,
			  delay: 0,
			  direction: 'alternate',
			  loop: false
			});

	 	}, 0)

	 	var startPl = anime({
			  targets: '#lineDrawing .P-letter path',
			  translateX: [
			    {
			      value: -234,
			      duration: 1000,
			      delay: 2500
			    }
			  ],
			});

	 	setTimeout(()=> {
	 	var upperletters = anime({
			  targets: '#lineDrawing .fade-letters',
			  opacity: 1,
			  easing: 'easeInOutQuad'
			});
	    }, 2700);

	    
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
			      delay: 2800,
			    }
			  ],
			  rotate: -45,
	 	});

	    setTimeout(()=> {

	 	var scrollB = anime({
			  targets: '#scrolldiv',
			  opacity: 1,
			  easing: 'easeInOutQuad'
			});
	    	
	    }, 2700);


	 }

	 renderArchitecture() {

	 	return data[0].architecture.map((item, idx) => (
	    			<ProjectCard
	    				key = {idx}
	    				title = {item.title}
	    				year = {item.year}
	    				imageurl = {item.imageurl}
	    				position = {item.position}
	    				brief = {item.brief}
	    				descriptive = {item.descriptive}
	    				/>
	    			))

	 }

	 renderEngineering() {

	 	return data[0].engineering.map((item, idx) => (
	    			<ProjectCard
	    				key = {idx}
	    				title = {item.title}
	    				year = {item.year}
	    				imageurl = {item.imageurl}
	    				position = {item.position}
	    				brief = {item.brief}
	    				descriptive = {item.descriptive}
	    				/>
	    			))

	 }



    render() {
    	//tranistion component takes two values, in (which if true will display entering and entered)
    	// in == false will render exiting and exited
    	// duration is the time between entering - entered, and exiting-exited

    	// use div, relative, absolute, relative to overlay divs on top of each other

    	// Do something like this to map the profiles to the type
    	//{architecture.map((item, idx) => (
                    //   <ProjectCard
                    //     key={idx}
                    //     title={item.title}
                    //     year={item.year}
                    //     imageurl={item.imageurl}
                    	// position = {item.position}
                    	// brief = {item.brief}
                    	// descriptive = {item.descriptive}
                    //   />
                    // ))}


    	
	    return (
		
	    	<div>
	    	<div className = "vh-100  dt w-100 bg-black">


	    		<div className = "dtc v-mid tc white ph3 ph4-l">

	    			<div className = "w-100 h-50"> 
	    			<PJname/>
	    			</div>

					<div id = "scrolldiv" className= "white bottom-0 pa5 o-0">
						<h3> Scroll </h3>
						<div id = "scroll" className= "scrollbutton pa1 white">
		    				<span></span>
						</div>
					</div>
					

				</div>
				
		    		    	
	    	</div>

	    	// TODO Add horizontal scrolling https://material-ui.com/demos/grid-list/
	    	<div className = "center bg-white pa3 ph5-ns">
	    		<h2 className = "pl3"> Architecture </h2>
	    		{this.renderArchitecture()}
	    	</div>

	    	<div className = "center bg-white pa3 ph5-ns">
	    		<h2 className = "pl3"> Engineering Design </h2>
	    		{this.renderEngineering()}
	    	</div>


	    	</div>
    );
  }
}

// Exporting HomeScreen Component, while simultaneously pulling data from the database
export default HomeScreen