
const width = window.innerWidth * 0.6,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 100, right: 40 };

let svg;

let state = {
  data: null,
  tags: null
};


var main = d3.select("main");


/**
 * LOAD DATA
 * */
d3.csv("data_temp.csv", d3.autotype).then(data => {
  state.data = data;
  state.tags = [];
  for (var i = 0; i < state.data.length; i++) {
    console.log(i)
    var name = Object.values(state.data)[i].Name
    state.tags.push(name)
  }
  console.log(state.tags)
  init()
});



function init() {
  AOS.init();

  d3.selection.prototype.moveToFront = function () {
    return this.each(function () {
      this.parentNode.parentNode.parentNode.parentNode.appendChild(this);
    });
  };

  draw()
}



function draw(setGlobalState) {

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
    .attr("id", function (d) {
      return d.Name
    })
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

  console.log(cell)

  const name = cell.selectAll(".name")
    .data(d => [d.Name])
    .join("div")
    .text(d => d)
    .attr("class", "name")
    .style("padding", "10px")
    .style("font-weight", "bolder")
    .style("height", "35px")
    .style("justify-content", "space-between")
    .style("font-size", "17px")
    .style("text-align", "center")
    .style("text-transform", "capitalize")


  const name_arabic = cell.selectAll(".name_arabic")
    .data(d => [d["Name in Arabic"]])
    .join("div")
    .text(d => d)
    .attr("class", "name_arabic")
    .style("padding", "5px")
    .style("font-weight", "bolder")
    .style("font-size", "15px")
    .style("font-family", "arial")
    .style("font-stretch", "ultra-expanded")



  const intro = cell.selectAll(".intro")
    .data(d => [d.Introduction])
    .join("div")
    .text(d => d)
    .attr("class", "intro")
    .style("font-weight", "lighter")
    .style("font-size", "13px")


  var images = d3.selectAll("#Nawal")
    .on("mouseover", function (d) {
      d3.select(this).style("transform", "scale(1.1,1.1)")
        .style("transform-origin", "50% 50%");

    })
    .on("mouseout", function (d) {
      d3.select(this).style("transform", "scale(1,1)")
        .style("transform-origin", "100% 100%");
    })



  // console.log(document.getElementById("info").getBoundingClientRect())

  const search_term = d3.select("#input_t")
  search_term
    .on("keypress", function () {
      if (65 < d3.event.keyCode < 90) {
        ac(this.value)
      }
      if (d3.event.keyCode === 13) {
        console.log("pressed")
        var val = this.value;
        const search_found = d3.selectAll('.cell')
        search_found.each(function (d) {
          console.log(this.id)
          console.log(val)
          if (this.id == val) {
            document.getElementById(val).scrollIntoView();
            d3.select(this)
              .transition()
              .duration(200)
              .style("background-color", "#e3ced3")
              .style("color", "#141313")
              .style("transform", "scale(1.1,1.1)")
              .style("transform-origin", "50% 50%");
          }
        })
      }
    })
}

function ac(value) {
  document.getElementById('datalist').innerHTML = '';

  var n = state.tags.length;
  var l = value.length;

  for (var i = 0; i < n; i++) {
    if (((state.tags[i].toLowerCase()).indexOf(value.toLowerCase())) > -1) {
      var node = document.createElement("option");

      var val = document.createTextNode(state.tags[i]);
      node.appendChild(val);

      document.getElementById("datalist").appendChild(node);
      console.log(document.getElementById('datalist'))
    }
  }
}


function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}

