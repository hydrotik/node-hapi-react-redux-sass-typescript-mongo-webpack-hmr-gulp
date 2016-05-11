/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_Video.scss';

// Page Components
import { VideoPlayer } from '../../../../components/VideoPlayer/VideoPlayer';
// Behaviors and Actions
import {

} from '../../actions';

// Interfaces
interface IVideoPageProps {
    dispatch?: (func: any) => void;
    store?: any;
}

interface IVideoPageState {

}

export class Video extends React.Component<IVideoPageProps, IVideoPageState> {

    public constructor(props: any = {}) {
        super(props);
    }


    public componentDidMount(): void {

    }

    public componentWillUnmount(): void {

    }


    public render(): React.ReactElement<{}> {

        return (
            <div className="content-wrapper dashboard-video-page">

                <section className="content-header">
                    <h1>
                        Dashboard
                        <small>Control panel</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Video</a></li>
                        <li className="active">Dashboard</li>
                    </ol>
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-lg-3 col-xs-6">
                            <h1>ReactPlayer Demo</h1>
                            <VideoPlayer />
                        </div>
                    </div>
                </section>
            </div>


        );
    }
}