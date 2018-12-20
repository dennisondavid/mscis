

$(document).ready(function()
{
 $('#load_data').click(function()
 {

  


  $.ajax({
   url:"cars_dataset.csv",
   dataType:"text",
   success:function(data)
   {
    var employee_data = data.split(/\r?\n|\r/);
    var table_data = '<table class="table table-bordered table-striped tablesorter" id="tbl">';
    var flag= false;


    for(var count = 0; count<employee_data.length; count++)
    {
      if(count === 0)
      {
      table_data += '<thead>';
      }
     var cell_data = employee_data[count].split(",");
     
     table_data += '<tr onclick="getId(this)" id="tr'+count+'">';
     for(var cell_count=0; cell_count<cell_data.length; cell_count++)
     {
      if(count === 0)
      {
       table_data += '<th onclick="getId(this)" id="th'+count+'">'+cell_data[cell_count]+'</th>';

      }
      else
      {
       table_data += '<td onclick="getId(this)">'+cell_data[cell_count]+'</td>';
      }
     }
     table_data += '</tr>';
     if(count === 0)
      {
      table_data += '</thead>';
      }

    }
     
    table_data += '</table>';
    $('#employee_table').html(table_data);


     $('#tbl').tablesorter();

   }

 });
  
 
});



 $('#freq').click(function()
 {

d3.select("#draggablefreq")
  .select("svg")
  .remove();

  var body = d3.select("#draggablefreq")
  
 function getSelectValue()
        {
            var selectedValue = document.getElementById("list").value;
            console.log(selectedValue);
        }
        getSelectValue();
 
 var occurences = {};
    $('table#tbl tr').each(function()    
    {

var c=3;

    // iterate each cell
    $('table#tbl td:nth-child('+c+')').each(function()

    {

      var count = 0; 
   console.log('freq');
        // get number in cell
        var number = $(this).html();
        
        // if that number was counted already then exit
        if (number in occurences) { return; }

        // get occurence count for that number
       
        
        $('table#tbl td:contains('+number+')').each(function()
        {
            if ($(this).html() == number) { count++ }
        });

        // and store it
        occurences[number] = count;
                           
    });

  

    });




var pointer = 0;
    
var elements = {};
var frequent = {};
    // for each found number
    for(var number in occurences)
    {
         
        // get stored count
        var count = occurences[number];


        elements [pointer] = number;
        frequent [pointer] = count;
        
        
        

        pointer = pointer +1;
    }
 
       

 
 console.log(elements);
        console.log(frequent);


    


});



    

 });



  var svgWidth = 900; 
var svgHeight = 500;
var barPadding = 5;
var barWidth = svgWidth / (Object.values(frequent).length);

var freqarray = Object.values(frequent);
var elearray = Object.values(elements);

console.log(d3.max(freqarray));

var x = d3.scale.linear()
    .domain([0, d3.max(freqarray)  ])
    .range([0, svgWidth-20]);

var y = d3.scale.ordinal()
    .domain(freqarray)
    .rangeBands([0, svgHeight-20]);






var chart = d3.select("#draggablefreq")
  .append("svg:svg")
    .attr("class", "chart")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style("margin-left", "32px") 
  .append("svg:g")
    .attr("transform", "translate(10,15)");

chart.selectAll("line")
    .data(x.ticks(10))
  .enter().append("svg:line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", svgHeight-20)
    .attr("stroke", "#ccc");

chart.selectAll("text.rule")
    .data(x.ticks(10))
  .enter().append("svg:text")
    .attr("x", x)
    .attr("y", 0)
    .attr("dy", -3)
    .attr("text-anchor", "middle")
    .text(String);

barnum=0;

chart.selectAll("rect")
    .data(freqarray)
  .enter().append("svg:rect")
    .attr("height", "35")
          .attr("width", function(d, i) {return (d * 110)})
          .attr("x", function(d, i) {return svgWidth - 900})
          .attr("y", function(d, i) {return ((i * 115) + 25)/3}  )
          .attr("id", function(d) { barnum = barnum+1; return "fbar"+barnum;});


chart.selectAll("text.bar")
    .data(freqarray)
  .enter().append("svg:text")
    .attr("class", "bar")
    .attr("x", function(d) { return ((x(d)/4 ))+10 })
    .attr("y", function(d, i) {return ((i * 115) + 70)/3}  )
    .attr("dx", -3)
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .data(elearray)
    .text(String);

chart.append("svg:line")
    .attr("y1", 0)
    .attr("y2", svgHeight-20)
    .attr("stroke", "#000");

    