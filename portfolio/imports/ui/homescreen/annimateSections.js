import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/react-meteor-data';



import d3 from 'd3'

//Styling
import 'tachyons'

import {scroller} from './scroller.js'
// import {}

//credits: https://github.com/vlandham/scroll_demo/

class ScrollerChart extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  };


  scrollVis(){

    // The data that we are using for this visualisation
    var data = [{name: "Reference", value: [1947,1511,690, 321, 209, 0], previous: [1947,1511,690, 321, 209, 0]}, 
    {name: "Envelope", value: [1602,1472,651,322,209, 0], previous: [1947,1511,690, 321, 209, 0]}, 
    {name: "Aircon", value: [1200,1070, 626,321, 209, 0], previous: [1602,1472,651,322,209, 0]},
    {name: "Hybrid", value: [820, 820, 497, 320, 209, 0], previous: [1200,1070, 626,321, 209, 0]}, // Note the graph doesn't add up
    {name: "January", value: [646, 605, 387,245, 186, 30], previous: [820,497, 320,320, 209, 0]}, // Added uncertainity to the start of the graph
    {name: "February", value: [497,470, 348,228, 176, 30], previous: [646, 605, 387,245, 186, 30]},
    {name: "Solar", value: [510], previous: [0]}]


    // Window Area
    let windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    console.log("screen width" + screen.width)
    console.log("window width" + window.innerWidth)
    let windowHeight = screen.height;
    var width = windowWidth/2.0;
    var height =windowHeight/2.0;
    var margin = { top: 0, left: 20, bottom: 40, right: 10 };

    // keeing track of which visualisation we are on
    var lastIndex = -1;
    var activeIndex = 0;
    var numPerRow = width / (squareSize + squarePad);

    //For life grid
    //TODO: Mae responsive
    var squareSize = 6;
    var squarePad = 2;

    //our main svg and group
    var svg = null;
    var g = null;


    // when scrolling to a new section, the activation function is called
    var activateFunctions = [];

    // when the section has an update function then this iscalled
    var updateFunctions = [];

    // Left is light, right is dark
    //var barColors = { 0: '#A9FCFF', 1: '#86F3FA', 2: '#30D8ED', 3: '#00AAD7', 4:'#0074B3', 5: '#004487' };
    var barColors = { 0: '#FED4B2', 1: '#FBC193', 2: '#F9AE76', 3: '#F79650', 4:'#F48031', 5: '#874434' };


    // Our Chart which we will call
    var chart = function (selection){
      selection.each(function () {

        // Access our elemt that we will work on
        var el = ReactDOM.findDOMNode(this)

        // Build our element within this 
        svg = d3.select(el)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("z-index", -1);

        // Append our main group 
        svg.append("g");

        // Move the main g depending on the margins
        g = svg.select('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

        // define the bar as a group that will eventually contain rectangles



        // Sets the sections up, see next function below
        setupSections();

      })
    }

    // Set up our visualisation elements 
    var setupSections = function(){
      activateFunctions[0] = showReference;
      activateFunctions[1] = showFirst;
      activateFunctions[2] = showSecond;
      activateFunctions[3] = showThird;
      activateFunctions[4] = showFourth;
      activateFunctions[5] = showFifth;
      activateFunctions[6] = showSolar;
    // TODO: Work out what this does
    // Something about update functions being set to no-op functions
    for (var i = 0; i < 9; i++) {
      updateFunctions[i] = function () {};
    }

  }


// Activate Function 0
var showReference = function(){

  // Show first bar
}

var showFirst = function(){

    // Select the second bar and link in the real data set

}

  var showSecond = function(){
    // Select the second bar and link in the new data to it


  }


  var showThird = function(){
    // Select the second bar and link in the new data to it
 
  }


  var showFourth = function(){
    // Select the second bar and link in the new data to it
 
  }

  var showFifth = function(){
     // Select the second bar and link in the new data to it

   }

     var showSolar = function(){
     // Select the second bar and link in the new data to it
     var solarBar = g.select('.Solar').selectAll('rect')

   }

   // Set the cart to activate and launch the corresponding activation functions
   chart.activate = function(index){
    activeIndex = index;
    var sign = (activeIndex - lastIndex)< 0? -1: 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function(i) {
      activateFunctions[i]();
    })
    lastIndex = activeIndex
  }

  // Update the chart based on its index and progress
  chart.update = function(index, progress){
    updateFunctions[index](progress);

  }

  return chart; 
}

// Select the correct element and create the graph
display(data){
  var plot = this.scrollVis();
  d3.select("#vis")
  .datum(data)
  .call(plot)

  var scroll = scroller()
  .container(d3.select('#graphic'));

  scroll(d3.selectAll('.step'));

  scroll.on('active', function (index){
    d3.selectAll('.step')
    .style('opacity', function(d,i) {return i === index ? 1: 0.1;});

    plot.activate(index)
  })

  scroll.on('progress', function (index, progress) {
    plot.update(index, progress);
  })

}


componentDidMount() {
  this.display()

}





  render(){
  	return(
     <div>	
      <div id ="graphic">
        <div id = "sections" className = "relative dib w-25 z-2">
          <section className = "step mb7">
            <div className = "b">
              Reference Building
            </div>
            <div className = "">
            
            </div>
          </section>

          <section className = "step mb7">
            <div className = "b">
              Envelope Design
            </div>
            <div className = "f6">
              
            </div>
          </section>

          <section className = "step mb7">
            <div className = "b">
              High Efficiency Cooling
            </div>
            <div className = "f6">
              
            </div>
          </section>

          <section className = "step mb7">
            <div className = "b">
              Hybrid System
            </div>
            <div className = "f6">
              Cieling fans, and natural ventilation 
            </div>
          </section>

          <section className = "step mb7">
            <div className = "b">
              January Redesign
            </div>
            <div className = "f6">
              With detailed energy simulation and optmisation
            </div>
          </section>

          <section className = "step mb7">
            <div className = "b">
              February Redesign
            </div>
            <div className = "f6">
              With reduced ventilation schedule 
            </div>
          </section>

          <section className = "step mb7 pb7">
            <div className = "b">
              Roof Top Solar
            </div>
            <div className = "f6">
              510MWh per year capacity
            </div>
          </section>
        </div>
        <div id="vis" className = "dib fixed top-2 z-1 ml-0 h5 w-70">
        </div>
      </div>
      <div className = "pb7"> r</div>
     </div>
     );
  };

};

//in the event that props aren't passed
ScrollerChart.defaultProps= {
  width: 440,
  height: 440

}

export default ScrollerChart
