/// <reference path='../../../../../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';
var FabricBrowserify = require('fabric-browserify');
var fabric = FabricBrowserify.fabric;
var IUtilAnimationOptions = FabricBrowserify.IUtilAnimationOptions

// Styles
import './_CanvasContainer.scss';

// Page Components


// Interfaces
interface ICanvasContainerPageProps {
    // rotation?: number;
}

interface ICanvasContainerPageState {

}

let canvas, timer;


let startPoints = [
    {x: 0, y: 42},
    {x: 155, y: 0},
    {x: 155, y: 243},
    {x: 0, y: 256}
];

let endPoints = [
    {x: 185, y: 0},
    {x: 250, y: 100},
    {x: 385, y: 170},
    {x: 0, y: 245}
];

let clonedStartPoints = startPoints.map(function(o){
    return fabric.util.object.clone(o);
});

let polygon = new fabric.Polygon(clonedStartPoints, {
    left: 0,
    top: 0,
    fill: 'purple',
    selectable: false
});

let even: boolean;

let activeAnimations: number = 0;
let cleanupRunningAnimations: boolean = false;

export class CanvasContainer extends React.Component<ICanvasContainerPageProps, ICanvasContainerPageState> {

    public constructor(props: any = {}) {
        super(props);
    }

    refs: {
        [key: string]: (Element);
        canv: any;
    }

    public componentDidMount(): void {
        // let context = this.refs.canv.getContext('2d');
        // this.paint(context);
        
        if(!this.isAnimating()) {
            canvas = new fabric.Canvas(this.refs.canv);

            canvas.add(polygon);

            even = true;
            cleanupRunningAnimations = false;

            this.animate();
        }
    }

    public componentWillUnmount(): void {
        even = false;
        cleanupRunningAnimations = true;
    }

    public componentDidUpdate(): void {
        // let context = this.refs.canv.getContext('2d');
        // context.clearRect(0, 0, 200, 200);
        // this.paint(context);
    }

    public tick = () => {
        this.animate();

    }

    public paint(context): void {
        // context.save();
        // context.translate(100, 100);
        // context.rotate(this.props.rotation, 100, 100);
        // context.fillStyle = '#F00';
        // context.fillRect(-50, -50, 100, 100);
        // context.restore();
    }

    
    public animatePoint = (i: number, prop: string, endPoints: any[]) => {

        let opts: any = {
          startValue: polygon.points[i][prop],
          endValue: endPoints[i][prop],
          duration: 1000,
          onChange: (value) => {
            polygon.points[i][prop] = value;
            // only render once
            if (i === startPoints.length - 1 && prop === 'y') {
              canvas.renderAll();
            }
          },
          onComplete: () => {
            polygon.setCoords();
            // only start animation once
            if (i === startPoints.length - 1 && prop === 'y') {
              even = !even;
              if (cleanupRunningAnimations) {
                  activeAnimations = 0;
                  cleanupRunningAnimations = false;
              }else{
                  this.animate();
              }
            }
          }
        };


        activeAnimations = activeAnimations + 1;


        fabric.util.animate(opts);
    }

    public animate = () => {
        for (var i = 0, len = startPoints.length; i < len; i++) {
            this.animatePoint(i, 'x', even ? endPoints : startPoints);
            this.animatePoint(i, 'y', even ? endPoints : startPoints);
        }
    }

    public isAnimating(): boolean {
        return (activeAnimations > 0);
    }
    
    public render(): React.ReactElement<{}> {

        return (
            <canvas ref="canv" width={600} height={300} />
        );
    }
}
