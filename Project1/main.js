  //importing components
import { Map } from "./map.js";
import { Count} from "./count_table.js"
import { bars} from "./bar_charts.js"

let map, count, bar, barA, barB, barC, barP;

// global state
let state = {
  geojson: null,
  restaurant: null,
  counts: null,
  grade_selected: null
};


Promise.all([
  d3.csv("grades.csv", d3.autoType),
  d3.csv("counts.csv", d3.autoType),
  d3.csv("count-bars.csv", d3.autoType)
]).then(([restaurant,counts,bars]) => {
  // + SET STATE WITH DATA
  state.restaurant = restaurant;
  state.counts = counts;
  state.bars = bars;
  console.log("state: ", state);
  init();
});


function init() {
  map = new Map(state, setGlobalState)
  count = new Count(state, setGlobalState)
  barA = new bars(state, setGlobalState, "A", "#CDAA59")
  barB = new bars(state, setGlobalState, "B", "#2D5781")
  barC = new bars(state, setGlobalState, "C", "#D3381B")
  barP = new bars(state, setGlobalState, "PENDING", "#F78D5C")
  draw();
}


 //yellow CDAA59
      //blue 2D5781
      //ornage D3381B
      //light orange F78D5C

function draw() {
  map.draw(state,setGlobalState);
  count.draw(state,setGlobalState)
  barA.draw(state, setGlobalState)
  barB.draw(state, setGlobalState)
  barC.draw(state, setGlobalState)
  barP.draw(state, setGlobalState)
  console.log("called")
}

// UTILITY FUNCTION: state updating function that we pass to our components so that they are able to update our global state object
function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}

