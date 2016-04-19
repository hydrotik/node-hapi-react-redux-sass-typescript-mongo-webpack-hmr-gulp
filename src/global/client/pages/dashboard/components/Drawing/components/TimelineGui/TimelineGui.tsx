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
let height: number = 100;
// TODO Properly Type!
let canvas: any;
// TODO Properly Type!
let c: any;

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
        c = canvas.getContext("2d");

        this.updateSize();
        window.addEventListener('resize', this.updateSize);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('resize', this.updateSize);
    }

    public componentDidUpdate(): void {

    }

    public updateSize: any = (e: any): void => {
        width = this.refs.canvContainer.clientWidth;
        this.setState({ width: width, height: height });

        this.updateGui();
    };

    public updateGui: any = (): void => {

        var w = width;
        var h = height;

        c.clearRect(0, 0, w, h);

        this.drawRect(0, 0, w, h, "#FFDDDD");
    }

    public drawRect(x: number, y: number, w: number, h: number, color: string): void {
        c.fillStyle = color;
        c.fillRect(x, y, w, h);
    };
    
    public render(): React.ReactElement<{}> {



        return (
            <div ref="canvContainer" className="timeline-gui">
                <canvas ref="canv" width={this.state.width} height={this.state.height} />
            </div>
        );
    }
}
