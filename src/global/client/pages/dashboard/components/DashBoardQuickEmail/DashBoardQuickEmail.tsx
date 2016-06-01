/// <reference path='../../../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_DashBoardQuickEmail.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';


// Interfaces
interface IDashBoardQuickEmailProps {

}

interface IDashBoardQuickEmailState {

}

export class DashBoardQuickEmail extends React.Component<IDashBoardQuickEmailProps, IDashBoardQuickEmailState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
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
        );
    }
}
  