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

  parseLinks(){
    if (this.props.linksurl){
    return (
      this.props.linksurl.map((link, idx) =>
      <p key = {idx}> <a href={link.url} target="_blank" > {link.text} </a> </p>
)
    )
  }
  }



	render(){
		const { classes } = this.props

    //TODO the minCardWidth style in main.css is a little hacky, look for a better scalable solution
    // TODO: The card widths are not the same if the screen is not full... might be due to the image size difference..
    //TODO: The vh-100 in CardContent is a little hack to ensure that all the cards have the same hight, but it leave a lot of white space



// {
//     "title": "SpaceMatch",
//     "position": "Project Coordinator",
//     "year": 2019,
//     "imageurl": "/static/images/Thermocycl.png",
//     "brief": "",
//     "descriptive": ["", ""]

//     },


		return(
      <div className = "pa3 v-top fl minCardWidth" >
        <Card className="">
          <CardContent className="">
            <CardMedia
              className={classes.media}
              image={this.props.imageurl}
              title={this.props.title}
            />
         <h3>
            {this.props.title}
          </h3>
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

            {this.parseLinks()}
          </CardContent>
        </Collapse>

      </Card>
    </div>
  );
	}

}

export default withStyles(styles)(ProjectCard)