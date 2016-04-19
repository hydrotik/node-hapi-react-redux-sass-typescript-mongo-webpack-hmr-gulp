/// <reference path='../../../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_TimelineGui.scss';

// Page Components


// Interfaces
interface ITimelineGuiProps {
    // rotation?: number;
}

interface ITimelineGuiState {
    width?: number;
    height?: number;
}

let width: number = 0;
let height: number = 0;
// TODO Properly Type!
let canvas: any;
// TODO Properly Type!
let c: any;

// https://github.com/dalisoft/timeline.js/blob/master/src/timeline-gui.js

export class TimelineGui extends React.Component<ITimelineGuiProps, ITimelineGuiState> {

    public constructor(props: any = {}) {
        super(props);

        this.state = {
            width: width,
            height: height
        };
    }

    refs: {
        [key: string]: (Element);
        canv: Element;
        canvContainer: Element;
    }

    public componentDidMount(): void {

        canvas = this.refs.canv;
        c = canvas.getContext('2d');

        window.addEventListener('resize', this.updateSize);

        setTimeout(this.updateSize, 100);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('resize', this.updateSize);
    }

    public componentDidUpdate(): void {

    }

    public updateSize: any = (e: any): void => {
        width = this.refs.canvContainer.clientWidth;
        height = this.refs.canvContainer.clientHeight;
        this.setState({ width: width, height: height });

        this.updateGui();
    };

    public updateGui: any = (): void => {

        var w = this.state.width;
        var h = this.state.height;

        c.clearRect(0, 0, w, h);

        let topBar = 24;
        let leftPanel = 200;

        // Background
        this.drawRect(0, 0, w, h, '#cccccc');
        // Top Bar
        this.drawRectStroke(0, 0, w, topBar, '#b0b0b0', '#8aa4af');
        // Left Panel
        this.drawRect(0, topBar, leftPanel, h - topBar, '#c0c0c0');
    }

    public drawRect(x: number, y: number, w: number, h: number, color: string): void {
        c.save();
        c.fillStyle = color;
        c.fillRect(x, y, w, h);
        c.restore();
    };

    public drawRectStroke(x: number, y: number, w: number, h: number, color: string, strokeColor: string): void {
        c.save();
        c.strokeStyle = strokeColor;
        c.fillStyle = color;
        c.strokeRect(x + .5, .5, w - 1, h - 1);
        c.restore();
    };
    
    public render(): React.ReactElement<{}> {

        return (
            <div ref="canvContainer" className="timeline-gui">
                <canvas ref="canv" width={this.state.width} height={this.state.height} />
            </div>
        );
    }
}
