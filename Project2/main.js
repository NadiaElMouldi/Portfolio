
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

let svg;

let state = {
  data: null,
};


var main = d3.select("main");


/**
 * LOAD DATA
 * */
d3.csv("data_temp.csv", d3.autotype).then(data => {
  state.data = data;
  init()
});



function init() {
  AOS.init();

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
    .style("background-color", "rgba(158, 47, 40, 0)")
    .on("mouseover", function (d) {
      d3.select(this).transition()
        .duration(200)
        .style("background-color", "#e3ced3")

        // #d4b9c8
        .style("color", "#141313")
        .style("transform", "scale(1.1,1.1)")
        .style("transform-origin", "50% 50%");

    })
    .on("mouseout", function (d) {
      d3.select(this).transition()
        .duration(200)
        .style("background-color", "rgba(158, 47, 40, 0)")
        .style("color", "#e3ced3")
        .style("transform", "scale(1,1)")
        .style("transform-origin", "100% 100%")
    })
    .on("click", function (d) {
      console.log(this.getBoundingClientRect())
    })
    .on("scroll", function (d) {
      cell.style("visibility", "visible")
      console.log("scroll")
    })


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


  var images = d3.selectAll("#Nawal")
    .on("mouseover", function (d) {
      console.log("hey")
      d3.select(this).style("transform", "scale(1.1,1.1)")
        .style("transform-origin", "50% 50%");

    })
    .on("mouseout", function (d) {
      d3.select(this).style("transform", "scale(1,1)")
        .style("transform-origin", "100% 100%");
    })


    draw()
}

function handleClick(event){
  console.log(document.getElementById("#input_t").value)
  return false;
}


function draw() {

}
