// STEP 1 - Include Dependencies
// Include react
import React from 'react';
import { GithubContext } from '../../context/context';

// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Include the fusioncharts library
import FusionCharts from 'fusioncharts';

// Include the chart type
import Chart from 'fusioncharts/fusioncharts.charts';

// Include the theme as fusion
import GammelTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, GammelTheme);

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
const Doughnut2d = () => {
  const { repos } = React.useContext(GithubContext);
  React.useEffect(() => {
    let dict={};
    let total = 0;
    repos.map((p) => {
      if (p.language) {
        if (dict[p.language]) dict[p.language] += p.stargazers_count;
        else dict[p.language] = p.stargazers_count;
      }
      total++;
    });

// Create items array
var items = Object.keys(dict).map(function(key) {
  return {label:key, value:dict[key]};
});

// Sort the array based on the second element
items.sort(function(first, second) {
  return second['value'] - first['value'];
});

console.log();

    setChartData(items.slice(0,5));
  }, [repos]);

  const [chartData, setChartData] = React.useState([]);
  // STEP 3 - Creating the JSON object to store the chart configurations
  const chartConfigs = {
    type: 'Doughnut2d', // The chart type
    width: '100%', // Width of the chart
    // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: 'Stars/Language',
        //Set the chart subcaption
        subCaption: '',
        showPercentValues: '0',
        pieRadius: '50%',
        //Set the x-axis name
        xAxisName: 'Language',
        //Set the y-axis name
        yAxisName: 'Repos',
        numberSuffix: '',
        //Set the theme for your chart
        theme: 'ocean',
      },
      // Chart Data
      data: chartData,
    },
  };

  if (chartData.length > 0) return <ReactFC {...chartConfigs} />;
  else return <h1>Loading</h1>;
};

export default Doughnut2d;
