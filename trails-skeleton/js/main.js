
// Global objects go here (outside of any functions)
let data, scatterplot, barchart; 
let difficultyFilter = [];
const dispatcher = d3.dispatch('filterCategories');

/**
 * Load data from CSV file asynchronously and render charts
 */
d3.csv('data/vancouver_trails.csv')
   .then(_data => {
     data = _data; // for safety, so that we use a local copy of data.

     // ... data preprocessing etc. ... TODO: you add code here for numeric
     data.forEach(d => {
        d.time = +d.time;
        d.distance = +d.distance;
     })
     // Be sure to examine your data to fully understand the code

     const colorScale = d3.scaleOrdinal()
     .domain(['Easy', 'Intermediate', 'Difficult'])
     .range(['#d3eecd', '#7bc77e', '#2a8d46']); // TODO: add an ordinal scale for the difficulty

     const scatterConfig = {
        parentElement: '#scatterplot',
        colorScale: colorScale
      };
 
      const barConfig = {
        parentElement: '#barchart',
        colorScale: colorScale
      };

     scatterplot = new Scatterplot(scatterConfig, data); //we will update config soon
     scatterplot.updateVis();

     barchart = new Barchart(barConfig, data);
     barchart.updateVis();
   })
  .catch(error => console.error(error));


/**
 * Use bar chart as filter and update scatter plot accordingly
 */
function filterData() {
    if (difficultyFilter.length === 0) {
      scatterplot.data = data;
    } else {
      scatterplot.data = data.filter(d =>
        difficultyFilter.includes(d.difficulty)
      );
    }
    scatterplot.updateVis();
  }
