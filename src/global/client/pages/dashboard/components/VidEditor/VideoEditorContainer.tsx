/// <reference path='../../../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react'; //??? Not working => import React from 'react';

// Styles
// import './_Video.scss';

// Page Components
import { VideoEditor } from '../../../../components/VideoEditor/VideoEditor';

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

export class VideoEditorContainer extends React.Component<any, any> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        alert('masallah')
    }

    public componentWillUnmount(): void {

    }
   
    public render(): React.ReactElement<{}> {
        let videoURL = "video/group1.mp4";
        let cuePoints = [{"timecode": 3.5, "products":"1, 12, 13"}, {"timecode": 9.5, "products":"21, 212, 213"}, {"timecode": 13.5, "products":"31, 312, 13"}];

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
                            <VideoEditor />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

/*
<VideoEditor    videoURL={videoURL} 
                                            fullyQualifiedSwfDIR="src/components/VideoEditor/components/Flex/"
                                            cuePoints={cuePoints} > 
                            </VideoEditor>
*/