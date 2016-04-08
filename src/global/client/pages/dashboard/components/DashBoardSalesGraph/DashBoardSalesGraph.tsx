/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
import { Knob } from '../../../../components/Knob/Knob';

// Styles
import './_DashBoardSalesGraph.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';


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
                  <div className="chart" id="line-chart" style={{height: 250}} />
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
  