
var margin = {top: 20, right: 10, bottom: 100, left:75},
    width = 750 - margin.right - margin.left,
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

d3.csv("chart/employee.csv", function(error,data) {
  if(error) console.log("Error: data not loaded!");

  data.forEach(function(d) {
    d.Name = d.Name;
    d.Age = +d.Age;       
    console.log(d.Age);   // console output
  });

   // sort the Age values
  data.sort(function(a,b) {
    return a.Age - b.Age;
  });


  // Specify the domains of the x and y scales
  xScale.domain(data.map(function(d) { return d.Name; }) );
  yScale.domain([0, d3.max(data, function(d) { return d.Age; } ) ]);



svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(1000)
    .delay( function(d,i) { return i * 200; })
   
    .attr({
      "id": 'bar',
      "x": function(d) { return xScale(d.Name); },
      "y": function(d) { return yScale(d.Age); },
      "width": xScale.rangeBand(),
      "height": function(d) { return  height - yScale(d.Age); }
    })
    .style("fill", function(d,i) { return 'rgb(20, 20, 200)'});


        svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')



            .text(function(d){
                return d.Age;
            })
            .attr({
                "x": function(d){ return xScale(d.Name) +  xScale.rangeBand()/2; },
                "y": function(d){ return yScale(d.Age)+ 12; },
                "font-family": 'sans-serif',
                "font-size": '13px',
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
        .text("Age(Years)");
    });

iter = iter +2 ;


}

function updateData() 
{

  svg.selectAll('rect')
    .remove();
svg.selectAll('text')
    .remove();

d3.csv("chart/employee.csv", function(error,data) {
  if(error) console.log("Error: data not loaded!");

  data.forEach(function(d) {
    d.Name = d.Name;
    d.Salary = +d.Salary;       
    console.log(d.Salary);   // console output
  });

   // sort the Age values
  data.sort(function(a,b) {
    return a.Salary - b.Salary;
  });


  // Specify the domains of the x and y scales
  xScale.domain(data.map(function(d) { return d.Name; }) );
  yScale.domain([0, d3.max(data, function(d) { return d.Salary; } ) ]);



svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(1000)
    .delay( function(d,i) { return i * 200; })
   
    .attr({
      "id": 'bar',
      "x": function(d) { return xScale(d.Name); },
      "y": function(d) { return yScale(d.Salary); },
      "width": xScale.rangeBand(),
      "height": function(d) { return  height - yScale(d.Salary); }
    })
    .style("fill", function(d,i) { return 'rgb(20, 20, 200)'});


        svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')



            .text(function(d){
                return d.Salary;
            })
            .attr({
                "x": function(d){ return xScale(d.Name) +  xScale.rangeBand()/2; },
                "y": function(d){ return yScale(d.Salary)+ 12; },
                "font-family": 'sans-serif',
                "font-size": '13px',
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
        .text("Salary (Thousands)");
    });


iter = iter +2;

}