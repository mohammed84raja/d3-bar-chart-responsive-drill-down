var Chart = (function(window,d3) {

  var generateData = function() {

    var data = [
      {name: "Locke",    value: Math.floor(Math.random() * 1000)},
      {name: "Reyes",    value: Math.floor(Math.random() * 1000)},
      {name: "Ford",     value: Math.floor(Math.random() * 1000)},
      {name: "Jarrah",   value: Math.floor(Math.random() * 1000)},
      {name: "Shephard", value: Math.floor(Math.random() * 1000)},
      {name: "Kwerwerwon",     value: Math.floor(Math.random() * 1000)},
      {name: "Jawewrrah",   value: Math.floor(Math.random() * 1000)},/*
      {name: "Shqwerephard", value: Math.floor(Math.random() * 1000)},
      {name: "Kwasdawwon",     value: Math.floor(Math.random() * 1000)},
      {name: "Jarasdasdrah",   value: Math.floor(Math.random() * 1000)},
      {name: "qwa", value: Math.floor(Math.random() * 1000)},
      {name: "zz",     value: Math.floor(Math.random() * 1000)},
      {name: "Jaxxxrrah",   value: Math.floor(Math.random() * 1000)},
      {name: "Shevvvn",     value: Math.floor(Math.random() * 1000)},
      {name: "Ksswerwerwon",     value: Math.floor(Math.random() * 1000)},
      {name: "Jawsewrrah",   value: Math.floor(Math.random() * 1000)},
      {name: "Shqswerephard", value: Math.floor(Math.random() * 1000)},
      {name: "Kwssasdawwon",     value: Math.floor(Math.random() * 1000)},
      {name: "Jarssasdasdrah",   value: Math.floor(Math.random() * 1000)},
      {name: "qwssa", value: Math.floor(Math.random() * 1000)},
      {name: "sszz",     value: Math.floor(Math.random() * 1000)},
      {name: "Jassxxxrrah",   value: Math.floor(Math.random() * 1000)},
      {name: "Shssevvvn",     value: Math.floor(Math.random() * 1000)},
      {name: "Jaxffxxrrah",   value: Math.floor(Math.random() * 1000)},
      {name: "Shfffevvvn",     value: Math.floor(Math.random() * 1000)},
      {name: "Kssffwerwerwon",     value: Math.floor(Math.random() * 1000)},
      {name: "Jawffsewrrah",   value: Math.floor(Math.random() * 1000)},
      {name: "Shqsffwerephard", value: Math.floor(Math.random() * 1000)},
      {name: "Kwssfffasdawwon",     value: Math.floor(Math.random() * 1000)},
      {name: "Jarssffasdasdrah",   value: Math.floor(Math.random() * 1000)},
      {name: "qwsffsa", value: Math.floor(Math.random() * 1000)},
      {name: "sszfffz",     value: Math.floor(Math.random() * 1000)},
      {name: "Jasfffsxxxrrah",   value: Math.floor(Math.random() * 1000)},*/
      {name: "Shsfffsevvvn",     value: Math.floor(Math.random() * 1000)}
    ];
    return data;
  }



  // Mike Bostock "margin conventions"
  var margin = {top: 20, right: 20, bottom: 50, left: 40},
      width = ($(".chart-container").width()) - margin.left - margin.right,
      height = ($(".chart-container").height()) - margin.top - margin.bottom;

  // D3 scales = just math
  // x is a function that transforms from "domain" (data) into "range" (usual pixels)
  // domain gets set after the data loads
  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .range([height, 0]);

  // D3 Axis - renders a d3 scale in SVG
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");


  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>" + d.name + ":</strong> <span style='color:red'>" + d.value + "</span>";
  })

  // create an SVG element (appended to body)
  // set size
  // add a "g" element (think "group")
  // annoying d3 gotcha - the 'svg' variable here is a 'g' element
  // the final line sets the transform on <g>, not on <svg>
  var svg = d3.select(".chart-container").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

  svg.append("g")
    .attr("class", "y axis")
    .append("text") // just for the title (ticks are automatic)
    .attr("transform", "rotate(-90)") // rotate the text!
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Frequency");


  var gradient = svg.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

  gradient.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "#4e88b8")
    .attr("stop-opacity", 1);

  gradient.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", "#149bf7")
    .attr("stop-opacity", 1);


  // d3.tsv is a wrapper around XMLHTTPRequest, returns array of arrays (?) for a TSV file
  // type function transforms strings to numbers, dates, etc.

    draw(generateData());


  function draw(data) {
    // measure the domain (for x, unique letters) (for y [0,maxFrequency])
    // now the scales are finished and usable
    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    // another g element, this time to move the origin to the bottom of the svg element
    // someSelection.call(thing) is roughly equivalent to thing(someSelection[i])
    //   for everything in the selection\
    // the end result is g populated with text and lines!
    svg.select('.x.axis')
    .transition()
    .duration(300)
    .call(xAxis)
    .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(45)")
      .style("text-anchor", "start");;

    // same for yAxis but with more transform and a title
    svg.select(".y.axis").transition().duration(300).call(yAxis)

    // THIS IS THE ACTUAL WORK!
    var bars = svg.selectAll(".bar").data(data, function(d) { return d.name; }) // (data) is an array/iterable thing, second argument is an ID generator function

    bars.exit()
      .transition()
      .duration(300)
      .attr("y", y(0))
      .attr("height", height - y(0))
      .style('fill-opacity', 1e-6)
      .remove();

    // data that needs DOM = enter() (a set/selection, not an event!)
    bars.enter().append("rect")
      .attr("class", "bar")
      .attr("y", y(0))
      .attr("height", height - y(0))
      .style("fill", "url(#gradient)")
      .on('click', function() {
        draw(generateData());
      }) 
      .on('mouseover', function(data) {
        d3.select(this).style('opacity',.8);
        tip.show(data);

      })
      .on('mouseout', function(data) {
        tip.hide(data);
        d3.select(this).style('opacity',1);
      })
    // the "UPDATE" set:
    bars.transition().duration(300).attr("x", function(d) { return x(d.name); }) // (d) is one item from the data array, x is the scale object from above
      .attr("width", x.rangeBand()) // constant, so no callback function(d) here
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); }); // flip the height, because y's domain is bottom up, but SVG renders top down

  }
  function updateWindow(){
      updateWidth();
      x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
      xAxis = d3.svg.axis().scale(x).orient("bottom");

      draw(generateData());
  }
  function updateWidth() {
    width = ($(".chart-container").width()) - margin.left - margin.right;
  }
  window.onresize = updateWindow;

})(window,d3);