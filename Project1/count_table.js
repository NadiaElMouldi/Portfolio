class Count {

    constructor(state, setGlobalState) {

    const table = d3.select("#count").append("table");
    const format = d3.format(",." + d3.precisionFixed(1) + "f");

    // table
    //   .append("thead")
    //   .append("tr")
    //   .selectAll("th")
    //   .attr("colspan", "13")
    //   .data(state.counts.columns)
    //   .join("th")
    //   .text(d => d)
    //   .attr("class", d => {return "bold"})
    //   .style("font-size", "34px")
    //   .style("padding","5px")
    //   .on("click", d => {
    //     setGlobalState({ grade_selected: d })
    //   })
      //.style("width", "3000px")

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
             setGlobalState({ grade_selected: d })
         });

    this.tableRows
      .selectAll("td")
      .data(d => Object.values(d))
      .join("td")
      .text(d => d)
      .style("padding","5px")
    }
  
    draw(state, setGlobalState) {
  }
  }
  
  export { Count };
  