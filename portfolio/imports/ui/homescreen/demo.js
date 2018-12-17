import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Transition, TransitionGroup} from 'react-transition-group';
 
//Styling - not really using them to their full extent
import 'tachyons';
import anime from 'animejs';


class ListItem extends Component {
	constructor() {
	    super();

	    this.liRef = React.createRef();
	}

	componentDidUpdate(){
		this.animeRef = anime ({
			targets: this.liRef.current,
			translateX: () => {
				if (this.props.status == "entering") {
					return ['-100%', '0%'];
				}
				else if (this.props.status == "exiting") {
					return ['0%', '100%'];
				}
			},
			elasticity: () => {
				if( this.props.status == 'entering'){
					return 300;
				}
				else if (this.props.status == 'exiting'){
					return 0;
				}
			},
			duration: 500
		});
	}

	render(){
		return(
			<li className = "list-item" ref ={this.liRef}>
				Hey I am item number {this.props.num}
			</li>
			);
	}

}


class Demo extends Component {
  constructor() {
    super();


	    this.state = {
	    	data: [1,2,3]
	    };
	 }

	 add() {
	 	this.setState({
	 		...this.state,
	 		data: this.state.data.concat([this.state.data.length +1])
	 	});
	 }

	 remove() {
	 	this.setState({
	 		...this.state,
	 		data: this.state.data.slice(0,-1)
	 	});
	 }


    render() {
    	//tranistion component takes two values, in (which if true will display entering and entered)
    	// in == false will render exiting and exited
    	// duration is the time between entering - entered, and exiting-exited
	    return (

	    	<div className = "app-container">
	    		<div className="buttons">
	    			<button onClick = {this.add.bind(this)}> Add One </button>
	    			<button onClick = {this.remove.bind(this)}> Remove </button>

	    		</div>
	    		<TransitionGroup
	    		component = "ul"
	    		className = "list"
	    		>
	    			{
	    				this.state.data.map(num => (
	    					<Transition
	    					key={num}
	    					timeout = {500}
	    					// we don't want annimations to run on start
	    					//appear = {true}
	    					mountOnEnter
	    					unmountOnExit
	    					>
	    						{
	    							(status) => {
	    								return <ListItem status = {status} num = {num} />;
	    							}
	    						}
	    					</Transition>

	    					))
	    			}
	    		</TransitionGroup>
	    	</div>
    );
  }
}

// Exporting Demo Component, while simultaneously pulling data from the database
export default Demo