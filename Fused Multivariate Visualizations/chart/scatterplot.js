

d3.csv('cars_dataset.csv',function (data) {
// CSV section
  var body = d3.select("#draggablechs")
  var selectData = [ { "text" : "Acceleration" },
                     { "text" : "Horsepower" }
                     
                   ]

  // Select X-axis Variable
  var span = body.append('span')
    .text('Select X-Axis variable: ')
  var yInput = body.append('select')
      .attr('id','xSelect')
      .on('change',xChange)
    .selectAll('option')
      .data(selectData)
      .enter()
    .append('option')
      .attr('value', function (d) { return d.text })
      .text(function (d) { return d.text ;})
  body.append('br')

  // Select Y-axis Variable
  var span = body.append('span')
      .text('Select Y-Axis variable: ')
  var yInput = body.append('select')
      .attr('id','ySelect')
      .on('change',yChange)
    .selectAll('option')
      .data(selectData)
      .enter()
    .append('option')
      .attr('value', function (d) { return d.text })
      .text(function (d) { return d.text ;})
  body.append('br')

  // Variables
  var body = d3.select("#draggablechs")
  var margin = { top: 50, right: 50, bottom: 50, left: 50 }
  var h = (700 - margin.top - margin.bottom)
  var w = (700 - margin.left - margin.right)
  var formatPercent = d3.format('.0')
  // Scales
  var colorScale = d3.scale.category10()
  var xScale = d3.scale.linear()
    .domain([
      d3.min([0,d3.min(data,function (d) { return d['Acceleration'] })])*3,
      d3.max([0,d3.max(data,function (d) { return d['Acceleration'] })])*3
      ])
    .range([0,w])
  var yScale = d3.scale.linear()
    .domain([
      d3.min([0,d3.min(data,function (d) { return d['Acceleration'] })])*3,
      d3.max([0,d3.max(data,function (d) { return d['Acceleration'] })])*3
      ])
    .range([w,0])
  // SVG



  var svg = body.append('svg')
      .attr('height',625)
      .attr('width',625)
      .call(d3.behavior.zoom().on("zoom", function () {
    svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
  }))
    .append('g')
      .attr('transform', 'translate('+ margin.left +', '+margin.right +')' )
      

  // X-axis
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickFormat(formatPercent)
    .ticks(10)
    .orient('bottom')
  // Y-axis
  var yAxis = d3.svg.axis()
    .scale(yScale)
    .tickFormat(formatPercent)
    .ticks(10)
    .orient('left')
  // Circles
var cirnum=0;


var flag= false;

  var circles = svg.selectAll('circle')
      .data(data)
      .enter()
    .append('circle')
      .attr('cx',function (d) { return xScale(d['Acceleration']) })
      .attr('cy',function (d) { return yScale(d['Acceleration']) })
      .attr('r','7')
      .attr({"id": function(d) { cirnum = cirnum+1; return "cir"+cirnum; }})
      .attr('stroke','black')
      .attr('stroke-width',1)
      .attr('fill',function(d,i) { return 'rgb(20, 20, 200)'})



      


.on('click', function () {

this.flag= !this.flag;

console.log(this.flag);

if(this.flag == true)

{


        d3.select(this)
          .transition()
          .duration(300)
          .style("fill", function(d,i) { return 'rgb(200, 20, 20)'});


console.log(this.id);

var numbers = (this.id).match(/\d+/g).map(Number);
var first= numbers[0];
console.log(first);

         

          d3.select("#tbl").select("#tr"+first)
            .style('background-color', 'steelblue');




d3.select("#draggablech");

d3.select("#bar"+first)
    .transition().duration(300)
    .delay( function(d,i) { return i * 200; })
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
          .duration(300)
          .style("fill", function(d,i) { return 'rgb(20, 20, 200)'});


console.log(this.id);

var numbers = (this.id).match(/\d+/g).map(Number);
var first= numbers[0];
console.log(first);

         

          d3.select("#tbl").select("#tr"+first)
            .style('background-color', 'white');




d3.select("#draggablech");

d3.select("#bar"+first)
    .transition().duration(300)
    .delay( function(d,i) { return i * 200; })
    .style("fill", function(d,i) { return 'rgb( 0, 0, 200)'});



     $('.lines'+first).connections('remove');



}


})



.on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',20)
          .attr('stroke-width',3)



var numbers = (this.id).match(/\d+/g).map(Number);
var first= numbers[0];
console.log(first);

         

    if(this.flag != true)
{
 d3.select("#tbl").select("#tr"+first)
           .style({'background-color': '#d3d3d3'}); 
};




d3.select("#draggablech");

d3.select("#bar"+first)
    .transition().duration(300)
    .delay( function(d,i) { return i * 200; })
    .style("opacity", 0.6);

      })



      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',7)
          .attr('stroke-width',1)



var numbers = (this.id).match(/\d+/g).map(Number);
var first= numbers[0];
console.log(first);

         
if(this.flag != true)
{
 d3.select("#tbl").select("#tr"+first)
           .style({'background-color': '#fff'}); 
};


          




d3.select("#draggablech");

d3.select("#bar"+first)
    .transition().duration(100)
    .delay( function(d,i) { return i * 200; })
    .style("opacity", 1);

      })





    .append('title') // Tooltip
      .text(function (d) { return d.Model +
                           '\nAcceleration: ' + formatPercent(d['Acceleration']) +
                           '\nHorsepower: ' + formatPercent(d['Horsepower'])  })






  // X-axis
  svg.append('g')
      .attr('class','axis')
      .attr('id','xAxis')
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxis)
    .append('text') // X-axis Label
      .attr('id','xAxisLabel')
      .attr('y',-10)
      .attr('x',w)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('Acceleration')
  // Y-axis
  svg.append('g')
      .attr('class','axis')
      .attr('id','yAxis')
      .call(yAxis)
    .append('text') // y-axis Label
      .attr('id', 'yAxisLabel')
      .attr('transform','rotate(-90)')
      .attr('x',0)
      .attr('y',5)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('Acceleration')

  function yChange() {
    var value = this.value // get the new y value
    yScale // change the yScale
      .domain([
        d3.min([0,d3.min(data,function (d) { return d[value] })])*3,
        d3.max([0,d3.max(data,function (d) { return d[value] })])*3
        ])
    yAxis.scale(yScale) // change the yScale
    d3.select('#yAxis') // redraw the yAxis
      .transition().duration(100)
      .call(yAxis)
    d3.select('#yAxisLabel') // change the yAxisLabel
      .text(value)    
    d3.selectAll('circle') // move the circles
      .transition().duration(5)
      .delay(function (d,i) { return i*10})
        .attr('cy',function (d) { return yScale(d[value]) })
  }

  function xChange() {
    var value = this.value // get the new x value
    xScale // change the xScale
      .domain([
        d3.min([0,d3.min(data,function (d) { return d[value] })])*3,
        d3.max([0,d3.max(data,function (d) { return d[value] })])*3
        ])
    xAxis.scale(xScale) // change the xScale
    d3.select('#xAxis') // redraw the xAxis
      .transition().duration(100)
      .call(xAxis)
    d3.select('#xAxisLabel') // change the xAxisLabel
      .text(value)
    d3.selectAll('circle') // move the circles
      .transition().duration(5)
      .delay(function (d,i) { return i*10})
        .attr('cx',function (d) { return xScale(d[value]) })
  }




})