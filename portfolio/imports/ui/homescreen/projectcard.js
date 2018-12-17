import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Transition, TransitionGroup} from 'react-transition-group';
 

import 'tachyons';
import anime from 'animejs';

// material ui styles
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
  card: {
    minWidth: 175,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  pos: {
    marginBottom: 12,
  },
  actions: {
    display: 'flex',
  },
});

class ProjectCard extends Component {
  constructor(props) {
    super(props);

    this.state = { expanded: false };

  	
    


	}
	handleExpandClick = () => {
    	this.setState(state => ({ expanded: !state.expanded }))
    };

	render(){
		const { classes } = this.props

		return(
	<div>
	<h2> Architecture </h2>
    <Card className="w-30">
      <CardContent>
      <CardMedia
          className={classes.media}
          image="/static/images/HiLo.jpg"
          title="Paella dish"
       />
       <h2>
          HiLo Building
        </h2>
        <p className="gray fw2">
          Facade Design Engineer
        </p>
        
        <p className="gray fw2">
          2014
        </p>
        <p >
          Net Zero Energy Residential Building
          <br />
          {'"some text"'}
        </p>
      </CardContent>
      <CardActions>

          <button className = "f6 link dim ph3 pv2 mb2 dib white bg-black"
            onClick={this.handleExpandClick}
          > Read More
          </button>
      </CardActions>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <p>
              The HiLo Building is a research and innovatin pl
            <br />
              Lorem ipsum dolor sit amet, option maiorum scriptorem pro at, 
              purto reformidans et nam. His ei vero augue, eum veri perfecto at. 
              Vix te suas nobis noluisse, ponderum qualisque intellegebat vix et. 
              Idque summo noluisse ei vis, pro quot mollis in. Cu melius constituto assueverit usu, 
              repudiandae definitiones sea eu. Eu tota legere pri.
            </p>

            <p>
              Lorem ipsum
            </p>
          </CardContent>
        </Collapse>

    </Card>
    </div>
  );
	}

}

export default withStyles(styles)(ProjectCard)