/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_ProgressBar.scss';


// Interfaces
interface IProgressBarProps {
    handleProgressClick?: (e: any) => void;
    percentPlayed?: number;
    percentBuffered?: number;
}

interface IProgressBarState {

}

export class ProgressBar extends React.Component<IProgressBarProps, IProgressBarState> {

    public constructor(props: any = {}) {
        super(props);
    }


    public componentDidMount(): void {

    }

    public componentWillUnmount(): void {

    }

    public render(): React.ReactElement<{}> {

        let playedStyle = { width: this.props.percentPlayed + '%' }
        let bufferStyle = { width: this.props.percentBuffered + '%' }

        return (
            <div className="progress_bar progress_bar_ref" onClick={this.props.handleProgressClick}>
                <div className="playback_percent" style={playedStyle}><span></span></div>
                <div className="buffer_percent" style={bufferStyle}></div>
            </div>
        );
    }
}
