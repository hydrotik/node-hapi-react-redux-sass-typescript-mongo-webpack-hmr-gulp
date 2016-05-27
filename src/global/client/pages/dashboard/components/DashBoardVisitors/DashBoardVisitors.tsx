/// <reference path='../../../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
// import { Map, PolygonGroup } from 'react-d3-map';


// Uber - Map - GL
const assign = require('object-assign');
const MapGL = require('react-map-gl');
const Immutable = require('immutable');
const rasterTileStyle = require('raster-tile-style');
const r = require('r-dom');
const DraggableOverlay = require('react-map-gl/src/overlays/draggable-points.react');
const SVGOverlay = require('react-map-gl/src/overlays/svg.react');
const MAPBOX_API:string = 'pk.eyJ1IjoiZGpkb25vdmFuIiwiYSI6ImNpbW1wa3FvYjAwNWt0cGx2ZWVidmdkcWkifQ.urcVfY5Pppwq2eWL97j5Sw';



// Styles
import './_DashBoardVisitors.scss';


// Page Components

// Behaviors and Actions
import {

} from '../../actions';


// const width: number = 1000;
// const height: number = 800;
// const scale: number = .25 << 4;
// const scaleExtent: any[] = [1 << 10, 1 << 14]
// const center: number[] = [-100.95, 40.7];
// const data: any = require('./data/states.json');
const mapRatio: number = .5;

var points: any = Immutable.fromJS([
  {location:[-122.39508481737994, 37.79450507471435 ], id: 0},
  {location:[-122.39750244137034, 37.79227619464379 ], id: 1},
  {location:[-122.4013303460217,  37.789251178427776], id: 2}
]);

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
  viewport?: any;
  mapStyle?: any;
  points?: any;
}

export class DashBoardVisitors extends React.Component<IDashBoardVisitorsProps, IDashBoardVisitorsState> implements IDashBoardVisitors {

    public constructor(props: any = {}) {
        super(props);

        // window['mapboxgl'].accessToken = 'pk.eyJ1IjoiZGpkb25vdmFuIiwiYSI6ImNpbW1wODk4ejAwNHB2N2tyaDk4aTZrczcifQ.fqZLlfKuakeEd02cNMklRQ';
        var tileSource = '//tile.stamen.com/toner/{z}/{x}/{y}.png';
        //var mapStyle = Immutable.fromJS(rasterTileStyle([tileSource]));
        let mapStyle = 'mapbox://styles/djdonovan/cimmp91bf0011b3kluhoz81hp'
        this.state = {
          viewport: {
            latitude: 45,
            longitude: -100,
            zoom: 0,
            width: 100,
            height: 50,
            startDragLngLat: null,
            isDragging: null
          },
          mapStyle: mapStyle
        }

        /*
        this.state = {
            width: 0,
            height: 0
        };
        */
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

        let newViewport: any = this.state.viewport;
        newViewport.width = w;
        newViewport.height = h;

        let viewport = assign({}, this.state.viewport, newViewport);
        this.setState({viewport});
    };

    public componentDidMount():void {
      this.updateSize();
      window.addEventListener('resize', this.updateSize);
    };

    public componentWillUnmount(): void {
      window.removeEventListener('resize', this.updateSize);
    };

    public onChangeViewport: any = (newViewport: any): void => {
      let w: number = this.ctrls.mapContainer.clientWidth - (20);
      let h: number = w * mapRatio;

      newViewport.width = w;
      newViewport.height = h;

      let viewport = assign({}, this.state.viewport, newViewport);
      this.setState({viewport});
    };

    public render(): React.ReactElement<{}> {

        // let { width, height } = this.state;

        // uber-map-gl
        let {mapStyle, viewport} = this.state;

        return (
              <div className="box box-solid dashboard-visitors">
                <div className="box-header">
                  {/* tools box */}
                  <div className="pull-right box-tools">
                    <button type="button" className="btn btn-primary btn-sm daterange pull-right" data-toggle="tooltip" title="Date range">
                      <i className="fa fa-calendar" /></button>
                    <button type="button" className="btn btn-primary btn-sm pull-right" data-widget="collapse" data-toggle="tooltip" title="Collapse" style={{marginRight: 5}}>
                      <i className="fa fa-minus" /></button>
                  </div>
                  {/* /. tools */}
                  <i className="fa fa-map-marker cal-header" />
                  <h3 className="box-title cal-header">
                    Visitors
                  </h3>
                </div>
                <div className="box-body" ref={(mapContainer) => this.ctrls.mapContainer = mapContainer} >
                  {/* <div id="world-map" style={{height: 250, width: '100%'}} /> */ }

                  {/*
                  https://mikewilliamson.wordpress.com/2016/02/24/using-mapbox-gl-and-webpack-together/
                */}
                <MapGL
                    onChangeViewport={this.onChangeViewport}
                    mapboxApiAccessToken="pk.eyJ1IjoiZGpkb25vdmFuIiwiYSI6ImNpbW1wODk4ejAwNHB2N2tyaDk4aTZrczcifQ.fqZLlfKuakeEd02cNMklRQ"
                    mapStyle={mapStyle}
                    {...viewport}>
                  <DraggableOverlay
                    {...viewport}
                    points={points}
                    isDragging={false}
                    renderPoint={point => {
                      let scale = .20;
                      return <g transform={'scale(' + scale + '), translate(-40, -115)'}>
                        

                      <path style={{'fill': '#c64242', 'fillOpacity': '0.98823529'}} d="M 46.977003,126.64334 C 46.693972,125.95584 40.813862,120.20567 36.603071,114.98067 11.655836,81.858372 -16.158365,51.082905 16.319943,13.682837 30.700637,-0.21083367 48.43303,-1.0034227 66.662563,5.4726973 117.9922,35.174601 80.828906,83.627914 56.427079,115.48067 l -9.450076,11.16267 z M 62.417383,75.872046 C 96.654166,51.387445 70.185413,4.2391813 32.569429,19.913013 21.585178,25.769872 16.134954,35.960547 15.944071,47.980664 c -0.524495,11.693153 5.685418,21.471037 15.526227,27.460808 7.055481,3.840074 10.157178,4.533661 18.145697,4.057654 5.177622,-0.308516 8.161127,-1.153847 12.801388,-3.62708 z" id="path4127" />
                      <path style={{'fill': '#c64242', 'fillOpacity': '0.98823529', 'fillRule': 'nonzero', 'stroke': 'none'}} id="path4129" d="m 41.682107,89.891342 a 51.222816,41.754009 0 1 1 1.276617,0.208091" transform="matrix(0.87829487,0,0,1.0519028,0.55474126,-6.9952658)"/>
                      <path style={{'opacity': '0.34016395', 'fill': '#000000', 'fillOpacity': '0', 'fillRule': 'nonzero', 'stroke': 'none'}} id="path4131" d="m 43.631232,69.128546 a 26.010695,20.991087 0 1 1 0.64826,0.104614" transform="translate(0.64534523,0)"/>
                      <path style={{'fill': '#000080', 'fillOpacity': '0', 'fillRule': 'nonzero', 'stroke': 'none'}} id="path4135" d="m 31.892136,114.28 a 16.655972,11.750445 0 1 1 0.415114,0.0586" transform="translate(0.64534523,0)"/>
                      <path style={{'fill': '#b72c2c', 'fillOpacity': '1', 'fillRule': 'nonzero', 'stroke': 'none'}} id="path4149" d="m 45.521425,84.824145 a 34.452763,33.540108 0 1 1 0.85866,0.167155" transform="matrix(0.97020484,0,0,1.0272058,-4.0587829,-5.7503824)"/>
                      <path style={{'fill': '#ffffff', 'fillOpacity': '1', 'fillRule': 'nonzero', 'stroke': 'none'}} id="path4184" d="m 57.079416,104.60778 a 34.203297,36.623341 0 1 1 0.852443,0.18252" transform="matrix(0.64629924,0,0,0.61681122,5.1261236,4.9013803)"/>






                        <text style={{fill: 'white', textAnchor: 'middle'}} y="6">
                          {point.get('id')}
                        </text>
                      </g>;
                    }}
                  />
                </MapGL>
                  
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
  