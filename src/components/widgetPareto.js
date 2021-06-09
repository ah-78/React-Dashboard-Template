import React from 'react'
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

export default function widgetPareto(props) {
    const chartConfigs = {
        type: "pareto2d", // The chart type
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
          data: [
            {
                label: "Jan",
                value: props.data[0]
            },
            {
                label: "Feb",
                value: props.data[1]
            },
            {
                label: "Mar",
                value: props.data[2]
            },
            {
                label: "Apr",
                value: props.data[3]
            },
            {
                label: "May",
                value: props.data[4]
            },
            {
                label: "Jun",
                value: props.data[5]
            },
            {
                label: "Jul",
                value: props.data[6]
            },
            {
                label: "Aug",
                value: props.data[7]
            },
            {
                label: "Sep",
                value: props.data[8]
            },
            {
                label: "Oct",
                value: props.data[9]
            },
            {
                label: "Nov",
                value: props.data[10]
            },
            {
                label: "Dec",
                value: props.data[11]
            }
        ],
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
