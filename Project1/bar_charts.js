class bars {

    constructor(state, setGlobalState,grade, fill_color) {

      this.width = window.innerWidth * 0.6;
      this.height = window.innerHeight * 0.22;
      this.margins = { top: 20, bottom: 20, left: 20, right: 20 };
      this.duration = 1000;
      this.format = d3.format(",." + d3.precisionFixed(1) + "f");

    const data =  state.bars.filter(d => d.GRADE === grade)

    const yScale = d3
      .scaleBand()
      .domain(data.map(d => d.rating_cat))
      .range([this.height - this.margins.bottom,0])
      .paddingInner(.2);
  
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.n)])
      .range([this.margins.left, this.width/1.8]);
  
    //const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisRight(yScale).ticks(data.length)

    var tooltip = d3.select("body").append("div").attr("class", "toolTip");

  
    this.svg = d3.select("#bars")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    // append rects
    const rect = this.svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("y", d => yScale(d.rating_cat))
      .attr("x", d => 2*this.margins.left)
      .attr("width", d => xScale(d.n) - this.margins.left)
      .attr("height", yScale.bandwidth())
      .attr("fill", fill_color)
      .attr("opacity", "0.5")
      .on("mousemove", function(d){
        tooltip
          .style("left", d3.event.pageX - 50 + "px")
          .style("top", d3.event.pageY - 70 + "px")
          .style("display", "inline-block")
          .html(d.n)
    })
    .on("mouseout", function(d){ tooltip.style("display", "none")})
    .on("click", d => {
      console.log(d)
      setGlobalState({ rating_selected: d })
  });
   
  //   rect
  //   .on("click", function() {
  //     d3.select(this)
  //       .attr("fill", "border: 10px solid red;");
  // })
  // .on("mouseout", function(d, i) {
  //     d3.select(this).attr("border", function() {
  //         return "none"
  //     })});

      //yellow CDAA59
      //blue 2D5781
      //ornage D3381B
      //light orange F78D5C
  
    // append text
    // const text = this.svg
    //   .selectAll("text")
    //   .data(data)
    //   .join("text")
    //   .attr("class", "label")
    //   // this allows us to position the text in the center of the bar
    //   .attr("x", d => xScale(d.n)+this.margins.left)
    //   .attr("y", d => yScale(d.rating_cat))
    //   .text(d => d.n)
    //   .attr("dy", "1.25em");
      
    this.svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${2*this.margins.left}, 0)`)
      .call(yAxis);
      }
  
    draw(state, setGlobalState) {
  }
  }
  
  export { bars };
  