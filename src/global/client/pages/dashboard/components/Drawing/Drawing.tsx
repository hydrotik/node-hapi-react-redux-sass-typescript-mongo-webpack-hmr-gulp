/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_Drawing.scss';

// Page Components
import { CanvasContainer } from './components/CanvasContainer/CanvasContainer';
import { TimelineGui } from './components/TimelineGui/TimelineGui';


// Interfaces
interface IDrawingPageProps {
    dispatch?: (func: any) => void;
    store?: any;
}

interface IDrawingPageState {
    // rotation?: number;
}

export class Drawing extends React.Component<IDrawingPageProps, IDrawingPageState> {

    public constructor(props: any = {}) {
        super(props);

        /*
        this.state = {
            rotation: 0
        };
        */
    }


    public componentDidMount(): void {
        //requestAnimationFrame(this.tick);
    }

    public componentWillUnmount(): void {

    }

    public tick = () => {
        // this.setState({ rotation: this.state.rotation + .01 });
        // requestAnimationFrame(this.tick);
    }


    // https://github.com/sebmarkbage/art/
    // https://github.com/pughpugh/react-countdown-clock
    // https://github.com/flipboard/react-canvas
    // https://www.tensorflow.org/versions/r0.8/tutorials/image_recognition/index.html


    // https://github.com/kangax/fabric.js/
    // http://reactkomik.jscomic.net

    public render(): React.ReactElement<{}> {

        return (
            <div className="content-wrapper dashboard-drawing-page">

                <section className="content-header">
                    <h1>
                        Dashboard
                        <small>Control panel</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Drawing</a></li>
                        <li className="active">Dashboard</li>
                    </ol>
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-lg-7">
                            <h1>Drawing Demo</h1>
                            {/* <CanvasContainer rotation={this.state.rotation} /> */}
                            <CanvasContainer />
                            <TimelineGui />
                        </div>
                    </div>
                </section>
            </div>


        );
    }
}
