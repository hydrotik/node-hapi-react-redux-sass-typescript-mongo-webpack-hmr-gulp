/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
// import { connect } from 'react-redux';
import * as Moment from 'moment';

// Styles
import './_DashBoardChatBox.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';


// Interfaces
interface IDashBoardChatBoxProps {

}

interface IDashBoardChatBoxState {

}

export class DashBoardChatBox extends React.Component<IDashBoardChatBoxProps, IDashBoardChatBoxState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
          <div class="chat">
          {/* Title */}
                <h3 className="chat__title">
                    <span className="font-awesome font-awesome--comments font-awesome--left" />
                    Chat Box
                    <span className="font-awesome font-awesome--bars font-awesome--btn font-awesome--right"/>                    
                </h3>
                
              
                {/* Tools Hidden
                <div className="box-header">
                  <div className="box-tools pull-right" data-toggle="tooltip" title="Status">
                    <div className="btn-group" data-toggle="btn-toggle">
                      <button type="button" className="btn btn-default btn-sm active"><i className="fa fa-square text-green" />
                      </button>
                      <button type="button" className="btn btn-default btn-sm"><i className="fa fa-square text-red" /></button>
                    </div>
                  </div>
                </div>
                */}
                
                  {/* chat item */}
                  <div className="chat">
                    <img src="http://cdn.movieweb.com/img.news/NELsIUPqBQIrQL_1_1.jpg" alt="user image" className="chat__avatar chat__avatar--online" />
                      <a href="#">
                        <h5 className="chat__user-name">Mike Doe</h5>
                      </a>
                      <a href="#" >
                        <div className="chat__time">
                          <span className="font-awesome font-awesome--clock-o" /> 2:15 PM
                        </div>
                      </a>
                    <p className="chat__message">
                      I would like to meet you to discuss the latest news about
                      the arrival of the new theme. They say it is going to be one the
                      best themes on the market
                    </p>
                    <div className="chat__attachment">
                      Attachments:
                      <p className="filename">
                        Theme-thumbnail-image.jpg
                      </p>
                        <a href="#" className="btn--default">Open</a>
                    </div>
                    {/* /.attachment */}
                  </div>
                  {/* /.item */}
                  {/* chat item */}
                  <div className="chat">
                    <img src="http://data2.whicdn.com/images/37531377/large.jpg" alt="user image" className="chat__avatar chat__avatar--offline" />
                    <a href="#">
                        <h5 className="chat__user-name"> Alexander Pierce</h5>
                      </a>
                      <a href="#" >
                        <div className="chat__time">
                          <span className="font-awesome font-awesome--clock-o" /> 5:15 PM
                        </div>
                      </a>
                      <p className="chat__message">
                      I would like to meet you to discuss the latest news about
                      the arrival of the new theme. They say it is going to be one the
                      best themes on the market
                    </p>
                  </div>
                  {/* /.item */}
                  {/* chat item */}
                  <div className="chat">
                    <img src="http://hsfnotes.com/litigation/wp-content/uploads/sites/7/2014/08/emily.russell@hsf.com_LGS.jpg" alt="user image" className="chat__avatar chat__avatar--offline" />
                    <a href="#">
                        <h5 className="chat__user-name"> Susan Doe</h5>
                      </a>
                      <a href="#" >
                        <div className="chat__time">
                          <span className="font-awesome font-awesome--clock-o" /> 5:30 PM
                        </div>
                      </a>
                      <p className="chat__message">
                      I would like to meet you to discuss the latest news about
                      the arrival of the new theme. They say it is going to be one the
                      best themes on the market
                    </p>
                  </div>
                  {/* /.item */}
                
                {/* /.chat */}
                <div className="chat chat--align-right">
                  <div className="form">
                    <input className="form__input" placeholder="Type message..." />
                    <input className="btn--default right" type="submit" value="Send" />
                  </div>
                </div>
              </div>
          
        );
    }
}