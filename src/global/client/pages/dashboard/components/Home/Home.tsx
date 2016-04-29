/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
// import { connect } from 'react-redux';
import * as Moment from 'moment';

// Styles
import './_Home.scss';

// Modal
import { Modal } from '../Modal/Modal';

// Page Components
import { DashBoardVisitors } from '../DashBoardVisitors/DashBoardVisitors';
import { DashBoardSalesGraph } from '../DashBoardSalesGraph/DashBoardSalesGraph';
import { DashBoardChatBox } from '../DashBoardChatBox/DashBoardChatBox';
import { DashBoardToDoList } from '../DashBoardToDoList/DashBoardToDoList';
import { DashBoardQuickEmail } from '../DashBoardQuickEmail/DashBoardQuickEmail';
import { DashBoardTabbedChart } from '../DashBoardTabbedChart/DashBoardTabbedChart';
import { DashBoardCalendar } from '../DashBoardCalendar/DashBoardCalendar';


// Behaviors and Actions
import {

} from '../../actions';

interface IHome {
    interval: any;
}

// Interfaces
interface IHomeProps {
    dispatch?: (func: any) => void;
    store?: any;

    hour?: number;
    minute?: number;
    second?: number;
    year?: number;
    month?: number;
    day?: number;
}

interface IHomeState {
    hour?: number;
    minute?: number;
    second?: number;
    year?: number;
    month?: number;
    day?: number;
}

export class Home extends React.Component<IHomeProps, IHomeState> implements IHome {

    public constructor(props: any = {}) {
        super(props);

        this.state = {
            second: 0,
            minute: 0,
            hour: 0,
            day: 0,
            month: 0,
            year: 0
        };
    }

    public interval: any;

    public refreshTime: any = (e: any): void => {
        this.setState(this.getThisMoment());
    };

    public componentDidMount(): void {
        this.interval = setInterval(this.refreshTime, 1000);
    }

    public componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    public getThisMoment(): any {

        let thisMoment: any = Moment();

        return {
            second: thisMoment.format('ss'),
            minute: thisMoment.format('mm'),
            hour: thisMoment.format('HH'),
            day: thisMoment.format('DD'),
            month: thisMoment.format('MM'),
            year: thisMoment.format('YYYY')
        };
    }

    public render(): React.ReactElement<{}> {

        return (
            <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>
            Dashboard
            <small>Control panel</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
            <li className="active">Dashboard</li>
          </ol>
        </section>
        {/* Main content */}
        <section className="content">
          {/* Small boxes (Stat box) */}
          <div className="row">
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-aqua">
                <div className="inner">
                  <h3>150</h3>
                  <p>New Orders</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-green">
                <div className="inner">
                  <h3>53<sup style={{fontSize: 20}}>%</sup></h3>
                  <p>Bounce Rate</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-yellow">
                <div className="inner">
                  <h3>44</h3>
                  <p>User Registrations</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-red">
                <div className="inner">
                  <h3>65</h3>
                  <p>Unique Visitors</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
              </div>
            </div>
            {/* ./col */}
          </div>
          {/* /.row */}
          {/* Main row */}
          <div className="row">
            {/* Left col */}
            <section className="col-lg-7 connectedSortable">
            
              {/* Custom tabs (Charts with tabs)*/}
              <DashBoardTabbedChart />
              {/* /.nav-tabs-custom */}

              {/* Chat box */}
              <DashBoardChatBox />
              {/* /.box (chat box) */}

              {/* TO DO List */}
              <DashBoardToDoList />
              {/* /.box (todo list) */}

              {/* quick email widget */}
              <DashBoardQuickEmail />
              {/* /.box (quick email widget) */}

            </section>
            {/* /.Left col */}
            {/* right col (We are only adding the ID to make the widgets sortable)*/}
            <section className="col-lg-5 connectedSortable">

              {/* Map box */}
              <Modal>
              <DashBoardVisitors />
              </Modal>
              {/* /.box (Map box) */}

              {/* solid sales graph */}
              <Modal>
              <DashBoardSalesGraph />
              </Modal>
              {/* /.box (solid sales graph) */}

              {/* 
              
              Calendar
              https://github.com/onefinestay/react-daterange-picker

              */}
              <Modal>
                <DashBoardCalendar />
              </Modal>
              {/* /.box (Calendar) */}





            </section>
            {/* right col */}
          </div>
          {/* /.row (main row) */}
        </section>
        {/* /.content */}
      </div>


        );
    }
}
