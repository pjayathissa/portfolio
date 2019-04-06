import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Transition, TransitionGroup} from 'react-transition-group';
 
import 'tachyons';
import anime from 'animejs';

import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';

import ProjectCard from './projectcard.js'
import PJname from './pj.js'
import ScrollerChart from './annimateSections.js'
import data from './portfolioData.json'

const styles = theme => ({
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS..
    transform: 'translateZ(0)',
  },
});


class HomeScreen extends Component {
  constructor() {
    super();


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
			  delay: 1000,
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
			  delay: 1500,
			  direction: 'alternate',
			  loop: false
			});

	 	}, 0)

	 	//Somehow using the setTimeout prevents anime objects from freezing on screen when the viewer is not hovering over them 
	 	setTimeout(()=>{
	 	var startPl = anime({
			  targets: '#lineDrawing .P-letter path',
			  translateX: [
			    {
			      value: -234,
			      duration: 1000,
			      delay: 3500
			    }
			  ],
			});
	 },0)

	 	setTimeout(()=> {
	 	var upperletters = anime({
			  targets: '#lineDrawing .fade-letters',
			  opacity: 1,
			  easing: 'easeInOutQuad'
			});
	    }, 5000);

	    
	 	var scrollB = anime({
	 		targets: '#scroll',
	 		translateY: [
			    {
			      value: 25,
			      duration: 1550,
			    },
			    {
			      value: 80,
			      duration: 1000,
			      delay: 6500,
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
	    	
	    }, 5000);


	 }

	 renderArchitecture() {

	 	return data[0].architecture.map((item, idx) => (
	    			<ProjectCard
	    				key = {idx}
	    				title = {item.title}
	    				year = {item.year}
	    				imageurl = {item.imageurl}
	    				linksurl = {item.linksurl}
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
	    				linksurl = {item.linksurl}
	    				position = {item.position}
	    				brief = {item.brief}
	    				descriptive = {item.descriptive}
	    				/>
	    			))

	 }

	 renderSoftware() {

	 	return data[0].software.map((item, idx) => (
	    			<ProjectCard
	    				key = {idx}
	    				title = {item.title}
	    				year = {item.year}
	    				imageurl = {item.imageurl}
	    				linksurl = {item.linksurl}
	    				position = {item.position}
	    				brief = {item.brief}
	    				descriptive = {item.descriptive}
	    				/>
	    			))

	 }

	 renderSocial() {

	 	return data[0].social.map((item, idx) => (
	    			<ProjectCard
	    				key = {idx}
	    				title = {item.title}
	    				year = {item.year}
	    				imageurl = {item.imageurl}
	    				linksurl = {item.linksurl}
	    				position = {item.position}
	    				brief = {item.brief}
	    				descriptive = {item.descriptive}
	    				/>
	    			))

	 }



    render() {
    	const { classes } = this.props
    	
	    return (
		
	    	<div>
		    	<div className = "vh-100  dt w-100 bg-black z-10">
		    		<div className = "dtc v-mid tc white ph3 ph4-l">
		    			<div className = "w-100 h-50 top-0"> 
		    				<PJname/>
		    			</div>

						<div id = "scrolldiv" className= "white bottom-1 pa5 o-0">
							<h3> Scroll </h3>
							<div id = "scroll" className= "scrollbutton pa1 white">
			    				<span></span>
							</div>
						</div>
					</div>		    	    	
		    	</div>
		    	{/* I changed the class to relative to allow the z-index staking to work here */}
		    	<div className = "bg-black z-0 relative">
		    		<ScrollerChart/>
		    	</div>

		    	<div className = "bg-white pa3 ph5-ns z-10 ">
		    		<h2 className = "pl3"> Architecture </h2>
		    		<GridList className={classes.gridList} cols={3.5}> 
		    			{this.renderArchitecture()}
		    		</GridList>
		    	</div>
		    	

		    	<div className = "bg-white pa3 ph5-ns z-10">
		    		<h2 className = "pl3"> Engineering </h2>
			    	<GridList className={classes.gridList} cols={3.5}> 
			    		{this.renderEngineering()}
			    	</GridList>

		    	</div>

		    	<div className = "bg-white pa3 ph5-ns z-10">
		    		<h2 className = "pl3"> Software </h2>
			    	<GridList className={classes.gridList} cols={3.5}> 
			    		{this.renderSoftware()}
			    	</GridList>

		    	</div>

		    	<div className = "bg-white pa3 ph5-ns z-10">
		    		<h2 className = "pl3"> Social Organisations </h2>
			    	<GridList className={classes.gridList} cols={3.5}> 
			    		{this.renderSocial()}
			    	</GridList>

		    	</div>

		    	<footer className="pv4 ph3 ph5-m ph3-l bg-black white">
				  <small className="f6 db fr"> 2019 <b className="ttu">Prageeth Jayathissa</b></small>
				</footer>
					
			</div>

    );
  }
}

// Exporting HomeScreen Component
export default withStyles(styles)(HomeScreen)