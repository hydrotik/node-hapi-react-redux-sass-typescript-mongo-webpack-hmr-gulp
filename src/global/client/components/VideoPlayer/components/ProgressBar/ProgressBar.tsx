/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_ProgressBar.scss';


// Interfaces
interface IProgressBarProps {
    handleProgressClick?: (e: any) => void;
    percentBuffered?: number;

    handleMouseDown?: (e: any) => void;
    handleChange?: (e: any) => void;
    handleMouseUp?: (e: any) => void;

    played?: number;
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

        let playedStyle = { width: (this.props.played * 100) + '%' }
        let bufferStyle = { width: this.props.percentBuffered + '%' }

        return (
            <div className="progress_bar progress_bar_ref" /*onClick={this.props.handleProgressClick}*/ >
                <input
                    type='range' min={0} max={1} step='any'
                    value={this.props.played}
                    onMouseDown={this.props.handleMouseDown}
                    onChange={this.props.handleChange}
                    onMouseUp={this.props.handleMouseUp}
                    className="seek_slider"
                    />
                <div className="playback_percent" style={playedStyle}></div>
                <div className="buffer_percent" style={bufferStyle}></div>
            </div>
        );
    }
}
