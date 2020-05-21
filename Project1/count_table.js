class Count {

    constructor(state, setGlobalState) {

    const table = d3.select("#count").append("table");
    const format = d3.format(",." + d3.precisionFixed(1) + "f");

    var colorScale = d3.scaleOrdinal().range([ "#CDAA59", "#CDAA59","#2D5781","#2D5781","#D3381B", "#D3381B","#F78D5C", "#F78D5C"]);

    // make this a "this" to invoke global scope
    this.tableRows = table
      .append("tbody")
      .selectAll("tr")
      .data(state.counts)
      .join("tr")
      .style("background-color","white")
      .style("color", "black")
      .style("padding","5px")
      .attr("style", "font-size: 1000") 
      .on("click", d => {
            console.log(d)
             setGlobalState({ grade_selected: d })
         });

    this.tableRows
      .selectAll("td")
      .data(d => Object.values(d))
      .join("td")
      .text(d => d)
      .style("padding","10px")
      .style("color", d =>  colorScale(d))
      .style("opacity", "0.5")
    }
  
    draw(state, setGlobalState) {
  }
  }
  
  export { Count };
  