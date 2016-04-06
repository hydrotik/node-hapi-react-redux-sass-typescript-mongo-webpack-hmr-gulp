/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
import { Chart } from 'react-d3-core';
import { LineChart } from 'react-d3-basic';

// Styles
import './_DashBoardTabbedChart.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';



// https://github.com/codesuki/react-d3-components/issues/9


const data: any[] = [
  {
    name: "Lavon Hilll I",
    BMI: 20.57,
    age: 12,
    birthday: "1994-10-26T00:00:00.000Z",
    city: "Annatown",
    married: true,
    index: 1
  },
  {
    name: "Clovis Pagac",
    BMI: 24.28,
    age: 26,
    birthday: "1995-11-10T00:00:00.000Z",
    city: "South Eldredtown",
    married: false,
    index: 3
  },
  {
    name: "Gaylord Paucek",
    BMI: 24.41,
    age: 30,
    birthday: "1975-06-12T00:00:00.000Z",
    city: "Koeppchester",
    married: true,
    index: 5
  },
  {
    name: "Ashlynn Kuhn MD",
    BMI: 23.77,
    age: 32,
    birthday: "1985-08-09T00:00:00.000Z",
    city: "West Josiemouth",
    married: false,
    index: 6
  }
];

const width = 100,
    height = 50,
    margins = {left: 0, right: 0, top: 0, bottom: 0},
    title = "User sample",
    // chart series,
    // field: is what field your data want to be selected
    // name: the name of the field that display in legend
    // color: what color is the line
    chartSeries = [
      {
        field: 'BMI',
        name: 'BMI',
        color: '#ff7f0e'
      }
    ],
    // your x accessor
    x = function(d) {
      return d.index;
    }


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

                    <div className="chart tab-pane" id="sales-chart" style={{position: 'relative', height: 300}} />
                </div>
            </div>
        );
    }
}
  