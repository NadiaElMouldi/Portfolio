
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

let svg;

let state = {
  data: null,
};


var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// resize function to set dimensions on load and on page resize
function handleResize() {
  console.log("handleResize")
  var stepHeight = Math.floor(window.innerHeight * 0.75);
  step.style('height', stepHeight + 'px');

  var figureHeight = window.innerHeight / 3;
  var figureMarginTop = (window.innerHeight - figureHeight) / 4;

  figure
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

  console.log(figureMarginTop)

  scroller.resize();
  console.log(scroller)
}

// scrollama event handlers
function handleStepEnter(response) {
  console.log(response);
  step.classed('is-active', function (d, i) {
    return i === response.index;
  })

  var myElement = document.querySelector( '#writers' );
  

  figure.select('p').text(response.index + 1)
  article.select('p')
  if (response.index === 4) {
    // myElement.style("visibility", "visible")
    figure.style("position", "relative")
    figure.style("top", "0px")
    article.style("visibility", "hidden")
  }
}


function setupStickyfill() {
  d3.selectAll(".sticky").each(function () {
    Stickyfill.add(this);
  });
  console.log("set up")
}



/**
 * LOAD DATA
 * */
d3.csv("data_temp.csv", d3.autotype).then(data => {
  state.data = data;
  init()
});



function init() {

  d3.selection.prototype.moveToFront = function () {
    return this.each(function () {
      this.parentNode.parentNode.parentNode.parentNode.appendChild(this);
    });
  };

  const cell = d3.select("#writers")
    .selectAll(".cell")
    .data(state.data)
    .join("div")
    .attr("class", "cell")
    .style("padding", "10px")
    .style("height", "400px")
    .style("border", "0 2px solid white")
    .style("height", "auto")
    .on("mouseover", function (d) {
      d3.select(this).transition()
        .duration(200)
        .style("background-color", "#C0C0C0")
        .style("color", "black")

    })
    .on("mouseout", function (d) {
      d3.select(this).transition()
        .duration(200)
        .style("background-color", "black")
        .style("color", "lightgrey")
    })
    .on("click", function (d) {
      console.log(this.getBoundingClientRect())
    })
    .on("scroll", function(d){
      cell.style("visibility","visible")
      console.log("scroll")
    })


  const cell_to_show = document.querySelector("#writers");
  console.log(cell_to_show)

  var myScrollFunc = function () {
    var y = window.scrollY;
    console.log(y)
    if (y > 2000) {
      cell_to_show.style.animation= "30s fadeIn";
      // cell_to_show.style['animation-delay']="20s";
      cell_to_show.style['animation-fill-mode']="forwards";
    } else {
      cell_to_show.style.visibility = "hidden"
    }
  };

  window.addEventListener("scroll", myScrollFunc);



  const name = cell.selectAll(".name")
    .data(d => [d.Name])
    .join("div")
    .text(d => d)
    .attr("class", "name")
    .style("padding", "10px")
    .style("font-weight", "bolder")
    .style("height", "35px")
    .style("justify-content", "space-between")
    .style("font-size", "25px")
    .style("text-align", "center")
    .style("text-transform", "capitalize")





  const name_arabic = cell.selectAll(".name_arabic")
    .data(d => [d["Name in Arabic"]])
    .join("div")
    .text(d => d)
    .attr("class", "name_arabic")
    .style("padding", "5px")
    .style("font-weight", "bolder")
    .style("font-size", "25px")
    .style("font-family", "arial")
    .style("font-stretch", "ultra-expanded")





  const intro = cell.selectAll(".intro")
    .data(d => [d.Introduction])
    .join("div")
    .text(d => d)
    .attr("class", "intro")
    .style("font-weight", "lighter")
    .style("font-size", "18px")



  setupStickyfill();

  handleResize();

  scroller.setup({
    step: "#scrolly article .step",
    offset: 0.5,
    debug: true
  }).onStepEnter(handleStepEnter)
  // setup resize event
  window.addEventListener('resize', handleResize);

}


function draw() {

}
