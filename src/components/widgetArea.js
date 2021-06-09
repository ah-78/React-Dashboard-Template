import React from 'react'
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

export default function widgetArea(props) {
    const chartConfigs = {
        type: "area2d", // The chart type
        width: "100%", // Width of the chart
        height: "150", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
          // Chart Configuration
          chart: {
            // caption: "Countries With Most Oil Reserves [2017-18]",    //Set the chart caption
            // subCaption: "In MMbbl = One Million barrels",             //Set the chart subcaption
            bgColor:'#2a2a2a',
            // xAxisName: "Country",           //Set the x-axis name
            // yAxisName: "Reserves (MMbbl)",  //Set the y-axis name
            // numberSuffix: "K",
            theme: "fusion"                 //Set the theme for your chart
          },
          // Chart Data - from step 2
          data: props.data
        }
    };
    return (
        <div>
            <div className="widgetWrap">
                <div className="widgetTitle">
                    {props.title}
                </div>
                <div className="widgetValue">
                    <ReactFC {...chartConfigs} />
                </div>
            </div>
        </div>
    )
}
