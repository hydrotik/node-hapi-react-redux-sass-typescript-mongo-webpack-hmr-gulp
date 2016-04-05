/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { MapGL } from 'react-map-gl';
import * as Immutable from 'immutable';
import { rasterTileStyle } from 'raster-tile-style';

// Styles
import './_DashBoardVisitors.scss';

const MAPBOX_API:string = 'pk.eyJ1IjoiZGpkb25vdmFuIiwiYSI6ImNpbW1wa3FvYjAwNWt0cGx2ZWVidmdkcWkifQ.urcVfY5Pppwq2eWL97j5Sw';

// Page Components

// console.warn(MapGL);

// Behaviors and Actions
import {

} from '../../actions';


// Interfaces
interface IDashBoardVisitorsProps {

}

interface IDashBoardVisitorsState {

}

export class DashBoardVisitors extends React.Component<IDashBoardVisitorsProps, IDashBoardVisitorsState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        // https://github.com/caspg/simple-data-table-map

        const tileSource: string = '//tile.stamen.com/toner/{z}/{x}/{y}.png';

        console.warn(rasterTileStyle);

        const rts: any = rasterTileStyle([tileSource]);
        console.warn(rts);
        const mapStyle: any = Immutable.fromJS(rts);
        const viewport: any = {
          latitude: 37.78,
          longitude: -122.45,
          zoom: 11,
          width: 800,
          height: 800,
          startDragLngLat: null,
          isDragging: null
        };


        return (
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
                  {/* <div id="world-map" style={{height: 250, width: '100%'}} /> */ }

                  {/*
                  https://mikewilliamson.wordpress.com/2016/02/24/using-mapbox-gl-and-webpack-together/
                */}


                  <MapGL
                    mapStyle={mapStyle}
                    {...viewport}
                  />

                </div>
                {/* /.box-body*/}
                <div className="box-footer no-border">
                  <div className="row">
                    <div className="col-xs-4 text-center" style={{borderRight: '1px solid #f4f4f4'}}>
                      <Sparklines data={[1000, 1200, 920, 927, 931, 1027, 819, 930, 1021]} limit={10} width={80} height={50} margin={0}>
                          <SparklinesLine style={{ stroke: "#92c1dc", fill: "#ebf4f9", fillOpacity: ".9" }} />
                          <SparklinesSpots style={{ fill: "orange" }} />
                      </Sparklines>
                      <div className="knob-label">Visitors</div>
                    </div>
                    {/* ./col */}
                    <div className="col-xs-4 text-center" style={{borderRight: '1px solid #f4f4f4'}}>
                      <Sparklines data={[515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921]} limit={10} width={80} height={50} margin={0}>
                          <SparklinesLine style={{ stroke: "#92c1dc", fill: "#ebf4f9", fillOpacity: ".9" }} />
                          <SparklinesSpots style={{ fill: "orange" }} />
                      </Sparklines>
                      <div className="knob-label">Online</div>
                    </div>
                    {/* ./col */}
                    <div className="col-xs-4 text-center">
                      <Sparklines data={[15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21]} limit={10} width={80} height={50} margin={0}>
                          <SparklinesLine style={{ stroke: "#92c1dc", fill: "#ebf4f9", fillOpacity: ".9" }} />
                          <SparklinesSpots style={{ fill: "orange" }} />
                      </Sparklines>
                      <div className="knob-label">Exists</div>
                    </div>
                    {/* ./col */}
                  </div>
                  {/* /.row */}
                </div>
              </div>
        );
    }
}
  