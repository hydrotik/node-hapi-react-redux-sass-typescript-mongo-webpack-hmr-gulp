/// <reference path='../../../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';
// import { connect } from 'react-redux';
import * as Moment from 'moment';

// Styles
import './_DashBoardToDoList.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';


// Interfaces
interface IDashBoardToDoListProps {

}

interface IDashBoardToDoListState {

}

export class DashBoardToDoList extends React.Component<IDashBoardToDoListProps, IDashBoardToDoListState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
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
        );
    }
}
  