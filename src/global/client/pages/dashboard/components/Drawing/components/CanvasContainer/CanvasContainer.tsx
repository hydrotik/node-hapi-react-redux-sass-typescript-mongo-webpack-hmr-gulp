/// <reference path='../../../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
import { IUtilAnimationOptions } from 'fabric';
const fabric = require('fabric').fabric;

// Styles
import './_CanvasContainer.scss';

// Page Components


// Interfaces
interface ICanvasContainerPageProps {
    // rotation?: number;
}

interface ICanvasContainerPageState {

}

<<<<<<< HEAD
let canvas, timer;
=======
let canvas;
>>>>>>> f627eed69da491a632155dc31dd99fc14742bce2

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

<<<<<<< HEAD
let even: boolean;
=======
let even = true;
>>>>>>> f627eed69da491a632155dc31dd99fc14742bce2

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
        
        canvas = new fabric.Canvas(this.refs.canv);
        
        canvas.add(polygon);
        
<<<<<<< HEAD
        //requestAnimationFrame(this.tick);

        even = true;

        timer = setTimeout(this.animate, 1000);
    }

    public componentWillUnmount(): void {
        clearTimeout(timer);
        even = false;
=======
        requestAnimationFrame(this.tick);
    }

    public componentWillUnmount(): void {

>>>>>>> f627eed69da491a632155dc31dd99fc14742bce2
    }

    public componentDidUpdate(): void {
        // let context = this.refs.canv.getContext('2d');
        // context.clearRect(0, 0, 200, 200);
        // this.paint(context);
    }

    public tick = () => {
<<<<<<< HEAD
        //this.animate();
        //requestAnimationFrame(this.tick);
=======
        this.animate();
        requestAnimationFrame(this.tick);
>>>>>>> f627eed69da491a632155dc31dd99fc14742bce2
    }

    public paint(context): void {
        // context.save();
        // context.translate(100, 100);
        // context.rotate(this.props.rotation, 100, 100);
        // context.fillStyle = '#F00';
        // context.fillRect(-50, -50, 100, 100);
        // context.restore();
    }

    
<<<<<<< HEAD
    public animatePoint = (i: number, prop: string, endPoints: any[]) => {
=======
    public animatePoint(i, prop, endPoints): void {
>>>>>>> f627eed69da491a632155dc31dd99fc14742bce2

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
              this.animate();
            }
          }
        };





<<<<<<< HEAD
        fabric.util.animate(opts);
    }

    public animate = () => {
=======
        fabric.util.animate(opts as IUtilAnimationOptions);
    }

    public animate(): void {
>>>>>>> f627eed69da491a632155dc31dd99fc14742bce2
        for (var i = 0, len = startPoints.length; i < len; i++) {
            this.animatePoint(i, 'x', even ? endPoints : startPoints);
            this.animatePoint(i, 'y', even ? endPoints : startPoints);
        }
    }
    
    public render(): React.ReactElement<{}> {

        return (
            <canvas ref="canv" width={600} height={300} />
        );
    }
}
