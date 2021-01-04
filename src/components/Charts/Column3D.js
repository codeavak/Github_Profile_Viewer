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
import OceanTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, OceanTheme);

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
const Column3D = () => {
  const { repos } = React.useContext(GithubContext);
  React.useEffect(() => {
    let results = [];
    repos
      .sort(
        (a, b) => parseInt(b.stargazers_count) - parseInt(a.stargazers_count)
      )
      .slice(0, 5)
      .map((r) => results.push({ label: r.name, value: r.stargazers_count }));

    
    setChartData(results);
  }, [repos]);

  const [chartData, setChartData] = React.useState([]);
  // STEP 3 - Creating the JSON object to store the chart configurations
  const chartConfigs = {
    type: 'Column3D', // The chart type
    width: '100%', // Width of the chart
    // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: 'Most Popular Repos',
        //Set the chart subcaption
        subCaption: '',
        //Set the x-axis name
        xAxisName: 'Repos',
        //Set the y-axis name
        yAxisName: 'Stars',
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

export default Column3D;
