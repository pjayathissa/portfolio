import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/react-meteor-data';



import d3 from 'd3'

//Styling
import 'tachyons'

import {scroller} from './scroller.js'
import {processData} from './processData.js'
// import {}

//credits: https://github.com/vlandham/scroll_demo/

class ScrollerChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
          tagcolours : {"<18": "#FF6666", "university": "#FF99FF", "engineering": "#FFFF66",  "architecture": "#66CCFF", "software": "#9966FF", "organisations": "#99FF66", "travel" : "#FF9966" }


    }
  };


  scrollVis(){

    // The data that we are using for this visualisation
    var data = processData()

    // Window Area
    let windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    console.log("screen width" + screen.width)
    console.log("window width" + window.innerWidth)
    let windowHeight = screen.height;
    var width = windowWidth/2.0;
    var height =windowHeight/1.5;
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
    var tagcolours = this.state.tagcolours
    var square_size = (width/52.0)

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
        .attr("opacity", 1)

        // define the sqaure sizes

        

        var squareGroup = g.selectAll(".squareGroup").data(data)
                                                      .enter()
                                                      .append("g")
                                                      .attr("class", "squareGroup")
                                                      .attr("opacity", 0)
                                                      .attr("transform", function(d,i){
                                                        let x = (d.week%52)*square_size
                                                        let y = (Math.floor(d.week/52))*square_size

                                                      return "translate(" + x  + "," + y + ")"});

        var squares = squareGroup.append('rect')
                        .attr('width', square_size*0.8)
                        .attr('height', square_size*0.8)
                        .attr('fill', 'gray')
                        .attr('opacity', 1)
                        .attr('class', 'square')
                                                                               
        // var squares = g.selectAll('.square').data(data)
        //                 .enter()
        //                 .append('rect')
        //                 .attr('width', square_size*0.8)
        //                 .attr('height', square_size*0.8)
        //                 .attr('fill', 'gray')
        //                 .attr('x', (d) => {return (d.week%52)*square_size})
        //                 .attr('y', (d) => {return (Math.floor(d.week/52))*square_size})
        //                 .attr('opacity', 0)
        //                 .attr('class', 'square')




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

    g.attr('opacity', 0)

    // g.selectAll('.squareGroup').transition()
    //           .delay(0)
    //           .attr('opacity', 0)

}

var showFirst = function(){

    // Select the second bar and link in the real data set
    
    g.attr('opacity', 1)

     g.selectAll('.squareGroup').transition()
              .attr('opacity', 1)
              .delay((d,i) => Math.floor(i/52)*30);

    // HOver over metadata div
    var metaData = d3.select("body").append("div")  
    .attr("class", "tooltip")       
    .style("opacity", 0);

    // Delete div when user clicks away
    d3.select("body")
    .on("click",function(){
      console.log("click away")
      d3.select("body").selectAll(".tooltip")
      .transition()
      .style("opacity",0);
    });

    // Show div when user hovers over
    g.selectAll('.square').on("mouseover", function(d) {    
            metaData.transition()    
                .duration(200)    
                .style("opacity", .9);    
            metaData .html("Week: " + d.week + "<br/>"  + d.activity[0].name)  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 28) + "px");  
            })

}

  var showSecond = function(){
    // Select the second bar and link in the new data to it FFFF66 #FFCC33=yellow
    console.log(this.state)
    //let tagcolours = this.state.tagcolours

    //var tagcolours = {"<18": "#FF6666", "engineering": "#FFFF66", "organisations": "#99FF66", "architecture": "#66CCFF", "software": "#9966FF", "university": "#FF99FF", "travel" : "#FF9966" }

    g.selectAll('.square').transition()
              .attr('fill', (d) => {return (tagcolours[d.tags[0]] ? tagcolours[d.tags[0]] : "gray")})
              .delay((d,i) => i*1);


  }


  var showThird = function(){
    // Filter under 18

    g.selectAll('.square').transition()
                          .attr("opacity", (d)=> {return d.tags[0]=="<18" || d.tags.length==0 ? 0 : 1})
    // let filteredData = data.filter((d) => d.tags[0]!="<18")
    // console.log(filteredData)

    // let circleGroup = g.selectAll('.square').data(filteredData);
    // circleGroup.exit().remove();
    // // circleGroup.transition()
    // //                     .attr('width', square_size*0.8)
    // //                     .attr('height', square_size*0.8)
    // //                     .attr('fill', 'gray')
    // //                     .attr('x', (d) => {return (d.week%52)*square_size})
    // //                     .attr('y', (d) => {return (Math.floor(d.week/52))*square_size})
    // //                     .attr('opacity', 1)
    // //                     .attr('class', 'square')
    // circleGroup.transition()
    //             .duration(500)
    //             .attr("fill", (d) => {return (tagcolours[d.tags[0]] ? tagcolours[d.tags[0]] : "gray")})
    //             .attr();


 
  }


  var showFourth = function(){
    // Let the data dance

    let tagCount = {"university": 0, "engineering": 0,  "architecture": 0, "software": 0, "organisations": 0, "travel" : 0 }


    let barXLabels = Object.keys(tagcolours)


    g.selectAll('.squareGroup').transition()
                          .duration(1000)
                            .attr("transform", (d)=> {
                              if (d.tags[0] in tagCount){
                                let ypos = barXLabels.indexOf(d.tags[0])*square_size*8.5
                                //Bar has a y-width of 5 blocks
                                ypos = ypos + tagCount[d.tags[0]]%5 * square_size
                                let xpos = Math.floor(tagCount[d.tags[0]]/5) * square_size
                                tagCount[d.tags[0]]++
                                return "translate(" + xpos  + "," + ypos + ")"
                              }
                            })
                            .delay((d,i) => Math.floor(i/150)*100)
    let counter = 1
    for (var key in tagCount) {
      g.select('.squareGroup').append("text").text(key)
                                          .style("fill", tagcolours[key])
                                          .style("font-weight", "bold")
                                          .attr("y", square_size*8.5*counter - square_size*0.5)
                                          .attr("opacity", 0)
                                          .attr("class", "labels")

      g.select('.squareGroup').selectAll("text").transition()
                                                .duration(200)
                                                .delay(2200)
                                                .attr("opacity", 1)

      counter++
      }
 
  }

  var showFifth = function(){
     // Select the second bar and link in the new data to it



   }

     var showSolar = function(){
     // Select the second bar and link in the new data to it
     g.transition()
      .attr('opacity', 0)
      .delay(1000)



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
        <div id = "sections" className = "pl2 relative dib w-25 z-2">
          <section className = "step mb7 white">

            <div className = "b">
              
            </div>
          </section>

          <section className = "step mb7 white">
            <div className = "b f3-ns f4">
              my life as a dataset
            </div>
            <div className = "f3-ns f5">
            each square is a week of my life, <br/> 
            1 row = 1 year 
              
            </div>
          </section>

          <section className = "step mb7 white">
            <div className = "b f3-ns f4 f3-ns f4">
              let us bring life to this data through colour
            </div>
            <div className = "pl2 f4-ns f5 b" style = {{color:this.state.tagcolours["<18"]}}> under 18 </div>
            <div className = "pl2 f4-ns f5 b" style = {{color:this.state.tagcolours["university"]}}> university </div>
            <div className = "pl2 f4-ns f5 b" style = {{color:this.state.tagcolours["engineering"]}}> engineering</div>
            <div className = "pl2 f4-ns f5 b" style = {{color:this.state.tagcolours["architecture"]}}> architecture</div>
            <div className = "pl2 f4-ns f5 b" style = {{color:this.state.tagcolours["software"]}}> software</div>
            <div className = "pl2 f4-ns f5 b" style = {{color:this.state.tagcolours["organisations"]}}> social</div>
            <div className = "pl2 f4-ns f5 b" style = {{color:this.state.tagcolours["travel"]}}> travel</div>
              
            
          </section>

          <section className = "step mb7 white">
            <div className = "b f3-ns f4">
              first step: filter
            </div>
            <div className = "f3-ns f5">
              removing missing data and life under the age of 18
            </div>
          </section>

          <section className = "step mb7 white">
            <div className = "b f3-ns f4">
              now let the data dance
            </div>
            <div className = "f3-ns f5">
              each column is roughly one month of my life
            </div>
          </section>

          <section className = "step mb7 white">
            <div className = "b f3-ns f4">
              but the full picture is missing
            </div>
            <div className = "f3-ns f5">
              More visualisations coming soon...
            </div>
          </section>

          <section className = "step mb7 white pb7">
            <div className = "b f3-ns f4">
              Scroll down and enjoy my standard project portfolio below
            </div>
            <div className = "f3-ns f5">
              And come back for more updates
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
