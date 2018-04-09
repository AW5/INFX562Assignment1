'use strict';  //treat silly mistakes as run-time errors

//the SVG element to add visual content to

var width=1800;
var height=800
var svg = d3.select('#visContainer')
		.append('svg')
		.attr('height', width) //can adjust size as desired
		.attr('width', height)
    .style('border','solidblack'); //comment out to remove border

/* Your script goes here */

//Change title and data source

var header=d3.select('h1')
header.text("Assignment 1 Description: Visualization Design")
var subheader=d3.select('p')
subheader.text("By Anthony Wang")

// add margin and axis

    var margin = {top: 50, bottom: 50, left:50, right: 50};
    var width = 1000 - margin.left - margin.right;
    var height = 1000 - margin.top - margin.bottom;

	var xScale = d3.scaleLinear();
	xScale.domain(0,30).range([0, width]);

    var yScale = d3.scaleLinear();
	yScale.domain(0,480*5).range([0, height]);

    var numTicks = 5;
	var xAxis = d3.axisTop(xScale).ticks(numTicks);


//Create data url
var dataset 
var url='antibiotics_data.csv'

	d3.csv(url,function(error,data){
	//Load data

		if (error) {  //If error is not null, something went wrong.
          console.log(error);  //Log the error.
        } else {      //If no error, the file loaded correctly. Yay!
          console.log(data);   //Log the data.
		}

		dataset=data;
		
		//d3.select("title").selectAll("p").data(dataset).enter().append("p").text(function(d){return d.Penicilin;});
			//Create bars for antibiotics_data
		var rects = svg
		.selectAll('rect')
		.data(dataset, function(d){return d.Penicilin});

		var present = rects.enter()	
		.append('rect')
		.attr('width',0)
		.attr('fill',function(){if(dataset=="Penicilin"){return "blue"}else{if(dataset=="Streptomycin"){return "red"}else{return "green"}}})
		.attr("transform", "translate("+margin.left+","+margin.top+")")
		.merge(rects);

		present
		.transition().duration(400)
		.attr('x', 120)
		.attr('y',function(d,i){console.log(d); return 15 + i*15})
		.attr('width', function(d){if(dataset=="Penicilin"){return d.Penicilin*15}else{if(dataset=="Streptomycin"){return d.Streptomycin*15}else{return d.Neomycin*15}}})
		.attr('height',10);


			});





