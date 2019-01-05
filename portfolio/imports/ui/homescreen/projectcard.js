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
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

class ProjectCard extends Component {
  constructor(props) {
    super(props);

    this.state = { expanded: false,
                  title: this.props.title };

  	
    


	}
	handleExpandClick = () => {
    	this.setState(state => ({ expanded: !state.expanded }))
    };


    // Trying to find a way to parse the html text but cant......
  parseDescriptiveText() {

    //theres probably a better way to create paragraphs...
    return (this.props.descriptive.map((paragraph, idx) =>

      <p key = {idx}> {paragraph}</p>)
      )
  }



	render(){
		const { classes } = this.props
    console.log(this.props.imageurl)

    //TODO the minCardWidth style in main.css is a little hacky, look for a better scalable solution

    //TODO: The vh-100 in CardContent is a little hack to ensure that all the cards have the same hight, but it leave a lot of white space

		return(
      <div className = "w-30 pa3 v-top fl minCardWidth" >
        <Card className="">
          <CardContent className="vh-100">
            <CardMedia
              className={classes.media}
              image={this.props.imageurl}
              title={this.props.title}
            />
         <h2>
            {this.props.title}
          </h2>
          <p className="gray fw2">
            {this.props.position}
          </p>
          
          <p className="gray fw2">
            {this.props.year}
          </p>
          <p>
            {this.props.brief}
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
            {this.parseDescriptiveText()}
          </CardContent>
        </Collapse>

      </Card>
    </div>
  );
	}

}

export default withStyles(styles)(ProjectCard)