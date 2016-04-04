/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
// import { connect } from 'react-redux';
import * as Moment from 'moment';

// Styles
import './_Home.scss';

// Page Components


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
              <div className="nav-tabs-custom">
                {/* Tabs within a box */}
                <ul className="nav nav-tabs pull-right">
                  <li className="active"><a href="#revenue-chart" data-toggle="tab">Area</a></li>
                  <li><a href="#sales-chart" data-toggle="tab">Donut</a></li>
                  <li className="pull-left header"><i className="fa fa-inbox" /> Sales</li>
                </ul>
                <div className="tab-content no-padding">
                  {/* Morris chart - Sales */}
                  <div className="chart tab-pane active" id="revenue-chart" style={{position: 'relative', height: 300}} />
                  <div className="chart tab-pane" id="sales-chart" style={{position: 'relative', height: 300}} />
                </div>
              </div>
              {/* /.nav-tabs-custom */}
              {/* Chat box */}
              <div className="box box-success">
                <div className="box-header">
                  <i className="fa fa-comments-o" />
                  <h3 className="box-title">Chat</h3>
                  <div className="box-tools pull-right" data-toggle="tooltip" title="Status">
                    <div className="btn-group" data-toggle="btn-toggle">
                      <button type="button" className="btn btn-default btn-sm active"><i className="fa fa-square text-green" />
                      </button>
                      <button type="button" className="btn btn-default btn-sm"><i className="fa fa-square text-red" /></button>
                    </div>
                  </div>
                </div>
                <div className="box-body chat" id="chat-box">
                  {/* chat item */}
                  <div className="item">
                    <img src="assets/dashboard/img/user4-128x128.jpg" alt="user image" className="online" />
                    <p className="message">
                      <a href="#" className="name">
                        <small className="text-muted pull-right"><i className="fa fa-clock-o" /> 2:15</small>
                        Mike Doe
                      </a>
                      I would like to meet you to discuss the latest news about
                      the arrival of the new theme. They say it is going to be one the
                      best themes on the market
                    </p>
                    <div className="attachment">
                      <h4>Attachments:</h4>
                      <p className="filename">
                        Theme-thumbnail-image.jpg
                      </p>
                      <div className="pull-right">
                        <button type="button" className="btn btn-primary btn-sm btn-flat">Open</button>
                      </div>
                    </div>
                    {/* /.attachment */}
                  </div>
                  {/* /.item */}
                  {/* chat item */}
                  <div className="item">
                    <img src="assets/dashboard/img/user3-128x128.jpg" alt="user image" className="offline" />
                    <p className="message">
                      <a href="#" className="name">
                        <small className="text-muted pull-right"><i className="fa fa-clock-o" /> 5:15</small>
                        Alexander Pierce
                      </a>
                      I would like to meet you to discuss the latest news about
                      the arrival of the new theme. They say it is going to be one the
                      best themes on the market
                    </p>
                  </div>
                  {/* /.item */}
                  {/* chat item */}
                  <div className="item">
                    <img src="assets/dashboard/img/user2-160x160.jpg" alt="user image" className="offline" />
                    <p className="message">
                      <a href="#" className="name">
                        <small className="text-muted pull-right"><i className="fa fa-clock-o" /> 5:30</small>
                        Susan Doe
                      </a>
                      I would like to meet you to discuss the latest news about
                      the arrival of the new theme. They say it is going to be one the
                      best themes on the market
                    </p>
                  </div>
                  {/* /.item */}
                </div>
                {/* /.chat */}
                <div className="box-footer">
                  <div className="input-group">
                    <input className="form-control" placeholder="Type message..." />
                    <div className="input-group-btn">
                      <button type="button" className="btn btn-success"><i className="fa fa-plus" /></button>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.box (chat box) */}
              {/* TO DO List */}
              <div className="box box-primary">
                <div className="box-header">
                  <i className="ion ion-clipboard" />
                  <h3 className="box-title">To Do List</h3>
                  <div className="box-tools pull-right">
                    <ul className="pagination pagination-sm inline">
                      <li><a href="#">«</a></li>
                      <li><a href="#">1</a></li>
                      <li><a href="#">2</a></li>
                      <li><a href="#">3</a></li>
                      <li><a href="#">»</a></li>
                    </ul>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <ul className="todo-list">
                    <li>
                      {/* drag handle */}
                      <span className="handle">
                        <i className="fa fa-ellipsis-v" />
                        <i className="fa fa-ellipsis-v" />
                      </span>
                      {/* checkbox */}
                      <input type="checkbox" defaultValue />
                      {/* todo text */}
                      <span className="text">Design a nice theme</span>
                      {/* Emphasis label */}
                      <small className="label label-danger"><i className="fa fa-clock-o" /> 2 mins</small>
                      {/* General tools such as edit or delete*/}
                      <div className="tools">
                        <i className="fa fa-edit" />
                        <i className="fa fa-trash-o" />
                      </div>
                    </li>
                    <li>
                      <span className="handle">
                        <i className="fa fa-ellipsis-v" />
                        <i className="fa fa-ellipsis-v" />
                      </span>
                      <input type="checkbox" defaultValue />
                      <span className="text">Make the theme responsive</span>
                      <small className="label label-info"><i className="fa fa-clock-o" /> 4 hours</small>
                      <div className="tools">
                        <i className="fa fa-edit" />
                        <i className="fa fa-trash-o" />
                      </div>
                    </li>
                    <li>
                      <span className="handle">
                        <i className="fa fa-ellipsis-v" />
                        <i className="fa fa-ellipsis-v" />
                      </span>
                      <input type="checkbox" defaultValue />
                      <span className="text">Let theme shine like a star</span>
                      <small className="label label-warning"><i className="fa fa-clock-o" /> 1 day</small>
                      <div className="tools">
                        <i className="fa fa-edit" />
                        <i className="fa fa-trash-o" />
                      </div>
                    </li>
                    <li>
                      <span className="handle">
                        <i className="fa fa-ellipsis-v" />
                        <i className="fa fa-ellipsis-v" />
                      </span>
                      <input type="checkbox" defaultValue />
                      <span className="text">Let theme shine like a star</span>
                      <small className="label label-success"><i className="fa fa-clock-o" /> 3 days</small>
                      <div className="tools">
                        <i className="fa fa-edit" />
                        <i className="fa fa-trash-o" />
                      </div>
                    </li>
                    <li>
                      <span className="handle">
                        <i className="fa fa-ellipsis-v" />
                        <i className="fa fa-ellipsis-v" />
                      </span>
                      <input type="checkbox" defaultValue />
                      <span className="text">Check your messages and notifications</span>
                      <small className="label label-primary"><i className="fa fa-clock-o" /> 1 week</small>
                      <div className="tools">
                        <i className="fa fa-edit" />
                        <i className="fa fa-trash-o" />
                      </div>
                    </li>
                    <li>
                      <span className="handle">
                        <i className="fa fa-ellipsis-v" />
                        <i className="fa fa-ellipsis-v" />
                      </span>
                      <input type="checkbox" defaultValue />
                      <span className="text">Let theme shine like a star</span>
                      <small className="label label-default"><i className="fa fa-clock-o" /> 1 month</small>
                      <div className="tools">
                        <i className="fa fa-edit" />
                        <i className="fa fa-trash-o" />
                      </div>
                    </li>
                  </ul>
                </div>
                {/* /.box-body */}
                <div className="box-footer clearfix no-border">
                  <button type="button" className="btn btn-default pull-right"><i className="fa fa-plus" /> Add item</button>
                </div>
              </div>
              {/* /.box */}
              {/* quick email widget */}
              <div className="box box-info">
                <div className="box-header">
                  <i className="fa fa-envelope" />
                  <h3 className="box-title">Quick Email</h3>
                  {/* tools box */}
                  <div className="pull-right box-tools">
                    <button type="button" className="btn btn-info btn-sm" data-widget="remove" data-toggle="tooltip" title="Remove">
                      <i className="fa fa-times" /></button>
                  </div>
                  {/* /. tools */}
                </div>
                <div className="box-body">
                  <form action="#" method="post">
                    <div className="form-group">
                      <input type="email" className="form-control" name="emailto" placeholder="Email to:" />
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" name="subject" placeholder="Subject" />
                    </div>
                    <div>
                      <textarea className="textarea" placeholder="Message" style={{width: '100%', height: 125, fontSize: 14, lineHeight: 18, border: '1px solid #dddddd', padding: 10}} defaultValue={""} />
                    </div>
                  </form>
                </div>
                <div className="box-footer clearfix">
                  <button type="button" className="pull-right btn btn-default" id="sendEmail">Send
                    <i className="fa fa-arrow-circle-right" /></button>
                </div>
              </div>
            </section>
            {/* /.Left col */}
            {/* right col (We are only adding the ID to make the widgets sortable)*/}
            <section className="col-lg-5 connectedSortable">
              {/* Map box */}
              <div className="box box-solid bg-light-blue-gradient">
                <div className="box-header">
                  {/* tools box */}
                  <div className="pull-right box-tools">
                    <button type="button" className="btn btn-primary btn-sm daterange pull-right" data-toggle="tooltip" title="Date range">
                      <i className="fa fa-calendar" /></button>
                    <button type="button" className="btn btn-primary btn-sm pull-right" data-widget="collapse" data-toggle="tooltip" title="Collapse" style={{marginRight: 5}}>
                      <i className="fa fa-minus" /></button>
                  </div>
                  {/* /. tools */}
                  <i className="fa fa-map-marker" />
                  <h3 className="box-title">
                    Visitors
                  </h3>
                </div>
                <div className="box-body">
                  <div id="world-map" style={{height: 250, width: '100%'}} />
                </div>
                {/* /.box-body*/}
                <div className="box-footer no-border">
                  <div className="row">
                    <div className="col-xs-4 text-center" style={{borderRight: '1px solid #f4f4f4'}}>
                      <div id="sparkline-1" />
                      <div className="knob-label">Visitors</div>
                    </div>
                    {/* ./col */}
                    <div className="col-xs-4 text-center" style={{borderRight: '1px solid #f4f4f4'}}>
                      <div id="sparkline-2" />
                      <div className="knob-label">Online</div>
                    </div>
                    {/* ./col */}
                    <div className="col-xs-4 text-center">
                      <div id="sparkline-3" />
                      <div className="knob-label">Exists</div>
                    </div>
                    {/* ./col */}
                  </div>
                  {/* /.row */}
                </div>
              </div>
              {/* /.box */}
              {/* solid sales graph */}
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
                  <div className="chart" id="line-chart" style={{height: 250}} />
                </div>
                {/* /.box-body */}
                <div className="box-footer no-border">
                  <div className="row">
                    <div className="col-xs-4 text-center" style={{borderRight: '1px solid #f4f4f4'}}>
                      <input type="text" className="knob" data-readonly="true" defaultValue={20} data-width={60} data-height={60} data-fgcolor="#39CCCC" />
                      <div className="knob-label">Mail-Orders</div>
                    </div>
                    {/* ./col */}
                    <div className="col-xs-4 text-center" style={{borderRight: '1px solid #f4f4f4'}}>
                      <input type="text" className="knob" data-readonly="true" defaultValue={50} data-width={60} data-height={60} data-fgcolor="#39CCCC" />
                      <div className="knob-label">Online</div>
                    </div>
                    {/* ./col */}
                    <div className="col-xs-4 text-center">
                      <input type="text" className="knob" data-readonly="true" defaultValue={30} data-width={60} data-height={60} data-fgcolor="#39CCCC" />
                      <div className="knob-label">In-Store</div>
                    </div>
                    {/* ./col */}
                  </div>
                  {/* /.row */}
                </div>
                {/* /.box-footer */}
              </div>
              {/* /.box */}
              {/* Calendar */}
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
                  {/*The calendar */}
                  <div id="calendar" style={{width: '100%'}} />
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
              {/* /.box */}
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
