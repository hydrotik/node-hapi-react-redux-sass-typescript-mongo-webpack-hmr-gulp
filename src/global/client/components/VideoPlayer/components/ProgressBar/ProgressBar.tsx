/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
import * as ClassNames from 'classnames';

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
    hovered?: boolean;
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

        let propgressClass = ClassNames({
            'progress_bar': true,
            'progress_bar_ref': true,
            'hovered': this.props.hovered
        });

        let seekClass = ClassNames({
            'seek_slider': true,
            'hovered': this.props.hovered
        });

        return (
            <div className={propgressClass} /*onClick={this.props.handleProgressClick}*/ >
                <input
                    type='range' min={0} max={1} step='any'
                    value={this.props.played}
                    onMouseDown={this.props.handleMouseDown}
                    onChange={this.props.handleChange}
                    onMouseUp={this.props.handleMouseUp}
                    className={seekClass}
                    />
                <div className="playback_percent" style={playedStyle}></div>
                <div className="buffer_percent" style={bufferStyle}></div>
            </div>
        );
    }
}
