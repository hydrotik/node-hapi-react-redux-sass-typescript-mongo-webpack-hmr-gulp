/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
import { Line } from 'react-chartjs';
import { Knob } from '../../../../components/Knob/Knob';


// Styles
import './_DashBoardSalesGraph.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';

const data: any = {
    labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
    datasets: [
        {
            label: "My First dataset",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const chartOptions: any = {

    scaleFontColor: "#fff",
    scaleLineColor : "#fff",
    responsive: true,
    maintainAspectRatio: true,

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(255,255,255,.6)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 2,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: false,

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
    datasetFill : false,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};


// Interfaces
interface IDashBoardSalesGraphProps {

}

interface IDashBoardSalesGraphState {

}

export class DashBoardSalesGraph extends React.Component<IDashBoardSalesGraphProps, IDashBoardSalesGraphState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
              <div className="box box-solid bg-teal-gradient">
                <div className="box-header">
                  <i className="fa fa-th" />
                  <h3 className="box-title">Sales Graph</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn bg-teal btn-sm" data-widget="collapse"><i className="fa fa-minus" />
                    </button>
                    <button type="button" className="btn bg-teal btn-sm" data-widget="remove"><i className="fa fa-times" />
                    </button>
                  </div>
                </div>
                <div className="box-body border-radius-none">
                  
                  <Line data={data} options={chartOptions} className="chart-container" />

                </div>
                {/* /.box-body */}
                <div className="box-footer no-border">
                  <div className="row">
                    <div className="col-xs-4 text-center" style={{borderRight: '1px solid #f4f4f4'}}>
                      {/*<input type="text" className="knob" data-readonly="true" defaultValue={20} data-width={60} data-height={60} data-fgcolor="#39CCCC" /> */}
                      <Knob value={20} onChangeValue={(e: any) => console.warn(e)} />
                      <div className="knob-label">Mail-Orders</div>
                    </div>
                    {/* ./col */}
                    <div className="col-xs-4 text-center" style={{borderRight: '1px solid #f4f4f4'}}>
                      {/* <input type="text" className="knob" data-readonly="true" defaultValue={50} data-width={60} data-height={60} data-fgcolor="#39CCCC" /> */}
                      <Knob value={50} onChangeValue={(e: any) => console.warn(e)} />
                      <div className="knob-label">Online</div>
                    </div>
                    {/* ./col */}
                    <div className="col-xs-4 text-center">
                      {/* <input type="text" className="knob" data-readonly="true" defaultValue={30} data-width={60} data-height={60} data-fgcolor="#39CCCC" /> */}
                      <Knob value={30} onChangeValue={(e: any) => console.warn(e)} readOnly={true} className="knob" />
                      <div className="knob-label">In-Store Read Only</div>
                    </div>
                    {/* ./col */}
                  </div>
                  {/* /.row */}
                </div>
                {/* /.box-footer */}
              </div>
        );
    }
}
  