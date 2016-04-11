/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { Map, PolygonGroup } from 'react-d3-map';


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

let initialPoints: any[] = [
  {location: [-122.39508481737994, 37.79450507471435], id: 0},
  {location: [-122.39750244137034, 37.79227619464379], id: 1},
  {location: [-122.4013303460217, 37.789251178427776], id: 2},
  {location: [-122.40475531334141, 37.786862920252986], id: 3},
  {location: [-122.40505751634022, 37.78861431712821], id: 4},
  {location: [-122.40556118800487, 37.79060449046487], id: 5},
  {location: [-122.4088854209916, 37.790047247333675], id: 6},
  {location: [-122.4091876239904, 37.79275381746233], id: 7},
  {location: [-122.40989276432093, 37.795619489534374], id: 8},
  {location: [-122.41049717031848, 37.79792786675678], id: 9},
  {location: [-122.4109001076502, 37.80031576728801], id: 10},
  {location: [-122.41916032295062, 37.79920142331301], id: 11}
];

let ids: number = initialPoints[initialPoints.length - 1].id;

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
          mapStyle: mapStyle,
          points: Immutable.fromJS(initialPoints)
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
        /*
        this.setState({
          width: w,
          height: h
        });
        */

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

    public onAddPoint: any = (location: any): void => {
      var points = this.state.points.push(new Immutable.Map({
        location: new Immutable.List(location),
        id: ++ids
      }));
      this.setState({points: points});
    };

    public onUpdatePoint: any = (opt: any): any => {
      var index = this.state.points.findIndex(function filter(p) {
        return p.get('id') === opt.key;
      });
      var point = this.state.points.get(index);
      point = point.set('location', new Immutable.List(opt.location));
      var points = this.state.points.set(index, point);
      this.setState({points: points});
    };


    public onChangeViewport: any = (newViewport: any): void => {
      let w: number = this.ctrls.mapContainer.clientWidth - (20);
      let h: number = w * mapRatio;

      newViewport.width = w;
      newViewport.height = h;

      let viewport = assign({}, this.state.viewport, newViewport);
      this.setState({viewport});
    };

    public renderOverlays: any = (viewport: any): any => {
      return [
        r(SVGOverlay, assign({}, viewport, {
          redraw: function _redraw(opt) {
            if (!this.state.points.size) {
              return null;
            }
            var d = 'M' + this.state.points.map(function _map(point) {
              return opt.project(point.get('location').toArray());
            }).join('L');
            return r.path({
              style: {stroke: '#1FBAD6', strokeWidth: 2, fill: 'none'},
              d: d
            });
          }.bind(this)
        })),
        r(DraggableOverlay, assign({}, viewport, {
          points: this.state.points,
          onAddPoint: this.onAddPoint,
          onUpdatePoint: this.onUpdatePoint,
          renderPoint: function renderPoint(point, pixel) {
            return r.g({}, [
              r.circle({
                r: 10,
                style: {
                  fill: '#1FBAD6',
                  pointerEvents: 'all'
                }
              }),
              r.text({
                style: {fill: 'white', textAnchor: 'middle'},
                y: 5
              }, point.get('id'))
            ]);
          }
        }))
      ];
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
                  */}
                  {/*
                  https://mikewilliamson.wordpress.com/2016/02/24/using-mapbox-gl-and-webpack-together/
                */}
                <MapGL
                    onChangeViewport={this.onChangeViewport}
                    mapboxApiAccessToken="pk.eyJ1IjoiZGpkb25vdmFuIiwiYSI6ImNpbW1wODk4ejAwNHB2N2tyaDk4aTZrczcifQ.fqZLlfKuakeEd02cNMklRQ"
                    mapStyle={mapStyle}
                    {...viewport}
                  />
                  {/* r.div([
                    r(<MapGL
                    onChangeViewport={this.onChangeViewport}
                    mapboxApiAccessToken="pk.eyJ1IjoiZGpkb25vdmFuIiwiYSI6ImNpbW1wODk4ejAwNHB2N2tyaDk4aTZrczcifQ.fqZLlfKuakeEd02cNMklRQ"
                    mapStyle={mapStyle}
                    {...viewport}
                  />, assign({}, viewport, {
                      onChangeViewport: this.onChangeViewport
                    }), [this.renderOverlays(viewport)])
                  ]) */}
                  
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
  