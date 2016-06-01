/// <reference path='../../../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';
// import { Chart } from 'react-d3-core';
// import { LineChart } from 'react-d3-basic';
import { Line } from 'react-chartjs';


// Styles
import './_DashBoardTabbedChart.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';



// https://github.com/codesuki/react-d3-components/issues/9


const data: any = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

const chartOptions: any = {

    responsive: true,

    maintainAspectRatio: true,

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};

// Interfaces
interface IDashBoardTabbedChartProps {

}

interface IDashBoardTabbedChartState {

}

export class DashBoardTabbedChart extends React.Component<IDashBoardTabbedChartProps, IDashBoardTabbedChartState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
            <div className="nav-tabs-custom">
                {/* Tabs within a box */}
                <ul className="nav nav-tabs pull-right">
                    <li className="active"><a href="#revenue-chart" data-toggle="tab">Area</a></li>
                    <li><a href="#sales-chart" data-toggle="tab">Donut</a></li>
                    <li className="pull-left header"><i className="fa fa-inbox" /> Sales</li>
                </ul>
                <div className="tab-content no-padding">
                    {/* Morris chart - Sales
                    <div className="chart tab-pane active" id="revenue-chart" style={{position: 'relative', height: 300}} /> */}
                    <Line data={data} options={chartOptions} className="chart-container" />


                    {/*}
                    <Chart
                    title={title}
                    width={width}
                    height={height}
                    margins= {margins}
                    className="chart tab-pane active"
                    >
                    <LineChart
                      margins= {margins}
                      title={title}
                      data={data}
                      width={width}
                      height={height}
                      chartSeries={chartSeries}
                      x={x}
                    />
                  </Chart>
                    */}

                    <div className="chart tab-pane" id="sales-chart" style={{position: 'relative', height: 300}} />
                </div>
            </div>
        );
    }
}
  