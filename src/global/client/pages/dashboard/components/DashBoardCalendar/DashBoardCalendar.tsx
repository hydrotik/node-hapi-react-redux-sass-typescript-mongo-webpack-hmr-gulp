/// <reference path='../../../../../../../typings/main.d.ts' />

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
    color: '#A8CBE7',
    label: 'Enquire',
  },
  unavailable: {
    selectable: false,
    color: '#999999',
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
            <div className="calendar">
                
                {/* Title */}
                <h5 className="calendar__title">
                    <span className="font-awesome font-awesome--calendar font-awesome--left" />
                    Calendar
                    <span className="font-awesome font-awesome--bars font-awesome--btn font-awesome--right"/>                    
                </h5>
                
                {/* Tools ? Menu ? */}
                <div>
                    <a href="#" className="event-tool">
                        <span className="font-awesome font-awesome--plus font-awesome--left"/>
                        Add Event
                    </a>

                    <a href="#" className="event-tool">
                        <span className="font-awesome font-awesome--close font-awesome--left"/>
                        Clear Events
                    </a>
                    <a href="#" className="event-tool">
                        <span className="font-awesome font-awesome--search font-awesome--left"/>
                        View Calendar
                    </a>

                </div>

                <div className="box-header"></div>

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
                <hr />
                <div className="box-footer text-black">
                  <div className="row">
                    <div className="col-sm-6">
                      {/* Progress bars */}
                      <div className="clearfix">
                        <span className="task__title">Task #1</span>
                        <small className="task__completion">90%</small>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-bar__status progress-bar__status--default" style={{width: '90%'}} />
                      </div>
                      <div className="clearfix">
                        <span className="task__title">Task #2</span>
                        <small className="task__completion">70%</small>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-bar__status progress-bar__status--info" style={{width: '70%'}} />
                      </div>
                    </div>
                    {/* /.col */}
                    <div className="col-sm-6">
                      <div className="clearfix">
                        <span className="task__title">Task #3</span>
                        <small className="task__completion">60%</small>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-bar__status progress-bar__status--error" style={{width: '60%'}} />
                      </div>
                      <div className="clearfix">
                        <span className="task__title">Task #4</span>
                        <small className="task__completion">40%</small>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-bar__status progress-bar__status--warning" style={{width: '40%'}} />
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