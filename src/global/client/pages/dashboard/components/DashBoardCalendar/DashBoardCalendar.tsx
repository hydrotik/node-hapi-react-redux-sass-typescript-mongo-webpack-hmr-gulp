/// <reference path='../../../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';

const moment = require('moment');
require('moment-range');

// Styles
import './_DashBoardCalendar.scss';

// Page Components
const DateRangePicker = require('react-daterange-picker');

// Behaviors and Actions
import {

} from '../../actions';


// Interfaces
interface IDashBoardCalendarProps {

}

interface IDashBoardCalendarState {
    value: any;
    states: any;
}

const stateDefinitions: any = {
  available: {
    color: null,
    label: 'Available',
  },
  enquire: {
    color: '#ffd200',
    label: 'Enquire',
  },
  unavailable: {
    selectable: false,
    color: '#78818b',
    label: 'Unavailable',
  },
};


const dateRanges: any[] = [
  {
    state: 'enquire',
    range: moment.range(
      moment().add(2, 'weeks').subtract(5, 'days'),
      moment().add(2, 'weeks').add(6, 'days')
    ),
  },
  {
    state: 'unavailable',
    range: moment.range(
      moment().add(3, 'weeks'),
      moment().add(3, 'weeks').add(5, 'days')
    ),
  },
];

const now: any = moment();

const then: number = now.add(2, 'weeks');

const delta = moment.range(now, then);

// https://github.com/onefinestay/react-daterange-picker

export class DashBoardCalendar extends React.Component<IDashBoardCalendarProps, IDashBoardCalendarState> {

    public constructor(props: any = {}) {
        super(props);

        this.state = {
          value: null,
          states: null
        }
    }

    public handleSelect: any = (range: any, states: any): void => {
        this.setState({
            value: range,
            states: states,
        });
    };

    public render(): React.ReactElement<{}> {

        return (
            <div className="box box-solid bg-green-gradient">
                <div className="box-header">
                  <i className="fa fa-calendar" />
                  <h3 className="box-title">Calendar</h3>
                  {/* tools box */}
                  <div className="pull-right box-tools">
                    {/* button with a dropdown */}
                    <div className="btn-group">
                      <button type="button" className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                        <i className="fa fa-bars" /></button>
                      <ul className="dropdown-menu pull-right" role="menu">
                        <li><a href="#">Add new event</a></li>
                        <li><a href="#">Clear events</a></li>
                        <li className="divider" />
                        <li><a href="#">View calendar</a></li>
                      </ul>
                    </div>
                    <button type="button" className="btn btn-success btn-sm" data-widget="collapse"><i className="fa fa-minus" />
                    </button>
                    <button type="button" className="btn btn-success btn-sm" data-widget="remove"><i className="fa fa-times" />
                    </button>
                  </div>
                  {/* /. tools */}
                </div>
                {/* /.box-header */}
                <div className="box-body no-padding">
                    <DateRangePicker
                        firstOfWeek={1}
                        numberOfCalendars={1}
                        selectionType='range'
                        minimumDate={new Date()}
                        stateDefinitions={stateDefinitions}
                        dateStates={dateRanges}
                        defaultState="available"
                        showLegend={true}
                        value={this.state.value}
                        onSelect={this.handleSelect} />

                </div>
                {/* /.box-body */}
                <div className="box-footer text-black">
                  <div className="row">
                    <div className="col-sm-6">
                      {/* Progress bars */}
                      <div className="clearfix">
                        <span className="pull-left">Task #1</span>
                        <small className="pull-right">90%</small>
                      </div>
                      <div className="progress xs">
                        <div className="progress-bar progress-bar-green" style={{width: '90%'}} />
                      </div>
                      <div className="clearfix">
                        <span className="pull-left">Task #2</span>
                        <small className="pull-right">70%</small>
                      </div>
                      <div className="progress xs">
                        <div className="progress-bar progress-bar-green" style={{width: '70%'}} />
                      </div>
                    </div>
                    {/* /.col */}
                    <div className="col-sm-6">
                      <div className="clearfix">
                        <span className="pull-left">Task #3</span>
                        <small className="pull-right">60%</small>
                      </div>
                      <div className="progress xs">
                        <div className="progress-bar progress-bar-green" style={{width: '60%'}} />
                      </div>
                      <div className="clearfix">
                        <span className="pull-left">Task #4</span>
                        <small className="pull-right">40%</small>
                      </div>
                      <div className="progress xs">
                        <div className="progress-bar progress-bar-green" style={{width: '40%'}} />
                      </div>
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                </div>
              </div>
        );
    }
}
  