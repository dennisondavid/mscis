

var margin = {top: 20, right: 10, bottom: 100, left:75},
    width = 1500 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#draggablech")
    .append("svg")
      .attr ({
        "width": width + margin.right + margin.left,  
        "height": height + margin.top + margin.bottom
      })
    .append("g")
      .attr("transform","translate(" + margin.left + "," + margin.right + ")");


var xScale = d3.scale.ordinal()
    .rangeRoundBands([0,width], 0.2, 0.2);

var yScale = d3.scale.linear()
    .range([height, 0]);

// define x axis and y axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

var iter=-2;


function createData() 
{

  svg.selectAll('rect')
    .remove();
svg.selectAll('text')
    .remove();

d3.csv("cars_dataset.csv", function(error,data) {
  if(error) console.log("Error: data not loaded!");

  data.forEach(function(d) {
    d.Model = d.Model;
    d.Acceleration = +d.Acceleration;       
    console.log(d.Acceleration);   // console output
  });

   


  // Specify the domains of the x and y scales
  xScale.domain(data.map(function(d) { return d.Model; }) );
  yScale.domain([0, d3.max(data, function(d) { return d.Acceleration; } ) ]);


var barnum=0;

svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .on({"click":  function(e) {console.log(e.id)}})
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(1000)
    .delay( function(d,i) { return i * 50; })
   .attr({
      "id": function(d) { barnum = barnum+1; return "bar"+barnum; },
      "x": function(d) { return xScale(d.Model); },
      "y": function(d) { return yScale(d.Acceleration); },
      "width": xScale.rangeBand(),
      "height": function(d) { return  height - yScale(d.Acceleration); }
    })
    .style("fill", function(d,i) { return 'rgb(20, 20, 200)'});








var flag= false;



var rects = svg.selectAll('rect')
.on('click', function () {

this.flag= !this.flag;

console.log(this.flag);

if(this.flag == true)

{


        d3.select(this)
          .transition()
          .style("fill", function(d,i) { return 'rgb(200, 20, 20)'});

          console.log(this.id);


var numbers = (this.id).match(/\d+/g).map(Number);
var first= numbers[0];
console.log(first);

       


          d3.select("#tbl").select("#tr"+first)
            .style('background-color', 'steelblue');

d3.select("#draggablechs")
d3.select("#cir"+first)
    .transition()
    .style("fill", function(d,i) { return 'rgb( 200, 0, 0)'});



     $().connections( { from: "#tr"+first, to: "#bar"+first ,'class': 'lines'+first, borderClasses: {
          top: 'connection-border-top',
          right: 'connection-border-right',
          bottom: 'connection-border-bottom',
          left: 'connection-border-left'
      }});

            $().connections({from: "#tr"+first ,to: "#cir"+first,  'class': 'lines'+first, borderClasses: {
          top: 'connection-border-top',
          right: 'connection-border-right',
          bottom: 'connection-border-bottom',
          left: 'connection-border-left'
      }});

             $().connections({from:  "#bar"+first ,to: "#cir"+first ,  'class': 'lines'+first, borderClasses: {
          top: 'connection-border-top',
          right: 'connection-border-right',
          bottom: 'connection-border-bottom',
          left: 'connection-border-left'
      }});

  $.repeat().add('connection').each($).connections('update').wait(0);

  
document.getElementById("bar"+first).classList.add("group") ;
document.getElementById("cir"+first).classList.add("group") ;
document.getElementById("tr"+first).classList.add("group") ;


}


if(this.flag == false)

{

d3.select(this)
          .transition()
          .style("fill", function(d,i) { return 'rgb(20, 20, 200)'});

          console.log(this.id);


var numbers = (this.id).match(/\d+/g).map(Number);
var first= numbers[0];
console.log(first);

       


          d3.select("#tbl").select("#tr"+first)
            .style('background-color', '#fff');

d3.select("#draggablechs")
d3.select("#cir"+first)
    .transition()
    .style("fill", function(d,i) { return 'rgb( 0, 0, 200)'});


     $('.lines'+first).connections('remove');


}

      })



var rects = svg.selectAll('rect')
.on('mouseover', function () {


 d3.select(this)
          .transition()
          .duration(300)
          .style("opacity", 0.6);


var numbers = (this.id).match(/\d+/g).map(Number);
var first= numbers[0];
console.log(first);


if(this.flag != true)
{
 d3.select("#tbl").select("#tr"+first)
           .style({'background-color': '#d3d3d3'}); 
};

 d3.select("#draggablechs")
d3.select("#cir"+first)
.transition()
          .attr('r',20)
          .attr('stroke-width',3);     



})
.on('mouseout', function () {

  d3.select(this)
          .transition()
          .duration(300)
          .style('opacity', 1);


          var numbers = (this.id).match(/\d+/g).map(Number);
var first= numbers[0];
console.log(first);

if(this.flag != true)
{
 d3.select("#tbl").select("#tr"+first)
           .style({'background-color': '#fff'}); 
};


 d3.select("#draggablechs")
d3.select("#cir"+first)
.transition()
          .attr('r',7)
          .attr('stroke-width',1); 
});



        svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')



            .text(function(d){
                return d.Acceleration;
            })
            .attr({
                "x": function(d){ return xScale(d.Model) +  xScale.rangeBand()/2; },
                "y": function(d){ return yScale(d.Acceleration)+ 12; },
                "font-family": 'sans-serif',
                "font-size": '8px',
                "font-weight": 'bold',
                "fill": 'white',
                "text-anchor": 'middle'
            });

    // Draw xAxis and position the label
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .attr("transform", "rotate(-60)" )
        .style("text-anchor", "end")
        .attr("font-size", "10px");


    // Draw yAxis and postion the label
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("dy", "-4em")
        .style("text-anchor", "middle")
        .text("Acceleration(kmph)");



    });

  iter = iter +2 ;


}

function updateData() 
{

  svg.selectAll('rect')
    .remove();
svg.selectAll('text')
    .remove();

d3.csv("cars_dataset.csv", function(error,data) {
  if(error) console.log("Error: data not loaded!");

  data.forEach(function(d) {
    d.Model = d.Model;
    d.Displacement = +d.Displacement;       
    console.log(d.Displacement);   // console output
  });

  


  // Specify the domains of the x and y scales
  xScale.domain(data.map(function(d) { return d.Model; }) );
  yScale.domain([0, d3.max(data, function(d) { return d.Displacement; } ) ]);

barnum=0;

svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(1000)
    .delay( function(d,i) { return i * 200; })
   
    .attr({
       "id": function(d) { barnum = barnum+1; return "bar"+barnum;},
      "x": function(d) { return xScale(d.Model); },
      "y": function(d) { return yScale(d.Displacement); },
      "width": xScale.rangeBand(),
      "height": function(d) { return  height - yScale(d.Displacement); }
    })
    .style("fill", function(d,i) { return 'rgb(20, 20, 200)'});



var flag= false;



var rects = svg.selectAll('rect')
.on('click', function () {

this.flag= !this.flag;

console.log(this.flag);

if(this.flag == true)

{


        d3.select(this)
          .transition()
          .style("fill", function(d,i) { return 'rgb(200, 20, 20)'});

          console.log(this.id);


var numbers = (this.id).match(/\d+/g).map(Number);
var first= numbers[0];
console.log(first);

       


          d3.select("#tbl").select("#tr"+first)
            .style('background-color', 'steelblue');

d3.select("#draggablechs")
d3.select("#cir"+first)
    .transition()
    .style("fill", function(d,i) { return 'rgb( 200, 0, 0)'});


             $().connections( { from: "#tr"+first, to: "#bar"+first ,'class': 'lines'+first, borderClasses: {
          top: 'connection-border-top',
          right: 'connection-border-right',
          bottom: 'connection-border-bottom',
          left: 'connection-border-left'
      }});

            $().connections({from: "#tr"+first ,to: "#cir"+first,  'class': 'lines'+first, borderClasses: {
          top: 'connection-border-top',
          right: 'connection-border-right',
          bottom: 'connection-border-bottom',
          left: 'connection-border-left'
      }});

             $().connections({from:  "#bar"+first ,to: "#cir"+first ,  'class': 'lines'+first, borderClasses: {
          top: 'connection-border-top',
          right: 'connection-border-right',
          bottom: 'connection-border-bottom',
          left: 'connection-border-left'
      }});

  $.repeat().add('connection').each($).connections('update').wait(0);


document.getElementById("bar"+first).classList.add("group") ;
document.getElementById("cir"+first).classList.add("group") ;
document.getElementById("tr"+first).classList.add("group") ;


}


if(this.flag == false)

{

d3.select(this)
          .transition()
          .style("fill", function(d,i) { return 'rgb(20, 20, 200)'});

          console.log(this.id);


var numbers = (this.id).match(/\d+/g).map(Number);
var first= numbers[0];
console.log(first);

       


          d3.select("#tbl").select("#tr"+first)
            .style('background-color', '#fff');

d3.select("#draggablechs")
d3.select("#cir"+first)
    .transition()
    .style("fill", function(d,i) { return 'rgb( 0, 0, 200)'});



     $('.lines'+first).connections('remove');

}

      })





var rects = svg.selectAll('rect')
.on('mouseover', function () {


 d3.select(this)
          .transition()
          .duration(300)
          .style("opacity", 0.6);


var numbers = (this.id).match(/\d+/g).map(Number);
var first= numbers[0];
console.log(first);



    if(this.flag != true)
{
 d3.select("#tbl").select("#tr"+first)
           .style({'background-color': '#d3d3d3'}); 
};



 d3.select("#draggablechs")
d3.select("#cir"+first)
    .attr('r',20)
    .attr('stroke-width',3);     


})
.on('mouseout', function () {

  d3.select(this)
          .transition()
          .style("opacity", 1);


          var numbers = (this.id).match(/\d+/g).map(Number);
var first= numbers[0];
console.log(first);

if(this.flag != true)
{
 d3.select("#tbl").select("#tr"+first)
           .style({'background-color': '#fff'}); 
};

 d3.select("#draggablechs")
d3.select("#cir"+first)
.transition()
          .attr('r',7)
          .attr('stroke-width',1); 
});

        svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')



            .text(function(d){
                return d.Displacement;
            })
            .attr({
                "x": function(d){ return xScale(d.Model) +  xScale.rangeBand()/2; },
                "y": function(d){ return yScale(d.Displacement)+ 12; },
                "font-family": 'sans-serif',
                "font-size": '10px',
                "font-weight": 'bold',
                "fill": 'white',
                "text-anchor": 'middle'
            });

    // Draw xAxis and position the label
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .attr("transform", "rotate(-60)" )
        .style("text-anchor", "end")
        .attr("font-size", "10px");


    // Draw yAxis and postion the label
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("dy", "-4em")
        .style("text-anchor", "middle")
        .text("Displacement");
    });


iter = iter +2;

}