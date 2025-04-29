/**
 * Load data from JSON file asynchronously and render force directed graph
 */
d3.json('data/TODO').then(data => {
    const forceDirectedGraph = new ForceDirectedGraph({ parentElement: TODO}, data);
  })
  .catch(error => console.error(error));