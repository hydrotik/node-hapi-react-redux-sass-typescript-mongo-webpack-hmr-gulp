/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { Map, PolygonGroup } from 'react-d3-map';

// Styles
import './_DashBoardVisitors.scss';

const MAPBOX_API:string = 'pk.eyJ1IjoiZGpkb25vdmFuIiwiYSI6ImNpbW1wa3FvYjAwNWt0cGx2ZWVidmdkcWkifQ.urcVfY5Pppwq2eWL97j5Sw';

// Page Components

// Behaviors and Actions
import {

} from '../../actions';


// const width: number = 1000;
// const height: number = 800;
const scale: number = 1 << 12;
const scaleExtent: any[] = [1 << 10, 1 << 14]
const center: number[] = [-100.95, 40.7];
const data: any = require('./data/states.json');
const mapRatio: number = .5;

// Interfaces
interface IDashBoardVisitors {
    refs: {
        mapContainer?: any;
    }
}

interface IDashBoardVisitorsProps {

}

interface IDashBoardVisitorsState {
  width?: number;
  height?: number;
}

export class DashBoardVisitors extends React.Component<IDashBoardVisitorsProps, IDashBoardVisitorsState> implements IDashBoardVisitors {

    public constructor(props: any = {}) {
        super(props);

        this.state = {
            width: 0,
            height: 0
        };
    }


    // https://github.com/react-d3/react-d3-map
    // http://eyeseast.github.io/visible-data/2013/08/26/responsive-d3/
    // http://stackoverflow.com/questions/25371926/using-react-how-can-i-get-the-width-of-an-auto-sized-dom-element
    // https://medium.com/@basarat/strongly-typed-refs-for-react-typescript-9a07419f807#.su1nktywj
    
    ctrls: {
        mapContainer?: HTMLElement;
    } = {};

    public updateSize: any = (e: any): void => {
        let w: number = this.ctrls.mapContainer.clientWidth - (20);
        let h: number = w * mapRatio;


        this.setState({
          width: w,
          height: h
        });
    };

    public componentDidMount():void {
      this.updateSize();
      window.addEventListener('resize', this.updateSize);
    };

    public componentWillUnmount(): void {
      window.removeEventListener('resize', this.updateSize);
    };

    public render(): React.ReactElement<{}> {

        let { width, height } = this.state;


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
                <div className="box-body" ref={(mapContainer) => this.ctrls.mapContainer = mapContainer} >
                  {/* <div id="world-map" style={{height: 250, width: '100%'}} /> */ }

                  <Map
                    width= {width}
                    height= {height}
                    scale= {scale}
                    scaleExtent= {scaleExtent}
                    center= {center}
                    clip={true}
                    bounds={[[0, 0], [width, height]]}
                  >
                    <g>
                      <PolygonGroup
                        key= {"polygon-test"}
                        data= {data}
                        popupContent= {(e: any) => console.warn('popup content')}
                        onClick= {(e: any) => console.warn('onClick')}
                        polygonClass= {"your-polygon-css-class"}
                      />
                    </g>
                  </Map>

                  {/*
                  https://mikewilliamson.wordpress.com/2016/02/24/using-mapbox-gl-and-webpack-together/
                */}

                  {/*
                  <MapGL
                    mapStyle={mapStyle}
                    {...viewport}
                  />
                  */}
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
  