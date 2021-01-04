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
import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, CandyTheme);

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
const Pie3D = () => {
  const { repos } = React.useContext(GithubContext);
  React.useEffect(() => {
    var dict = new Map();
    let total = 0;
    repos.map((p) => {
      if (p.language) {
        if (dict[p.language]) dict[p.language]++;
        else dict[p.language] = 1;
      }
      total++;
    });
    const objArray = [];

    for (const [key, value] of Object.entries(dict)) {
      objArray.push({ label: key, value: value });
    }

    setChartData(
      objArray
        .sort((a, b) => {
          return b.value - a.value;
        })
        .splice(0, 5)
    );
  }, [repos]);

  const [chartData, setChartData] = React.useState([]);
  // STEP 3 - Creating the JSON object to store the chart configurations
  const chartConfigs = {
    type: 'Pie3D', // The chart type
    width: '100%', // Width of the chart
    // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: 'Top 5 Languages',
        pieRadius: '70%',
        showPercentValues: "1",
        decimals: "0",
        //Set the chart subcaption
        subCaption: '',
        //Set the x-axis name
        xAxisName: 'Language',
        //Set the y-axis name
        yAxisName: 'Repos',
        numberSuffix: '%',
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

export default Pie3D;
