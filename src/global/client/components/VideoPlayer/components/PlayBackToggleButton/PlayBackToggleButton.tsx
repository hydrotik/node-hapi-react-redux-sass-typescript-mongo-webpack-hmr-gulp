/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_PlayBackToggleButton.scss';


// Interfaces
interface IPlayBackToggleButtonProps {
    handleTogglePlayback?: () => void;
    playing?: boolean;
}

interface IPlayBackToggleButtonState {

}

export class PlayBackToggleButton extends React.Component<IPlayBackToggleButtonProps, IPlayBackToggleButtonState> {

    public constructor(props: any = {}) {
        super(props);
    }


    public componentDidMount(): void {

    }

    public componentWillUnmount(): void {

    }

    public render(): React.ReactElement<{}> {

        let icon = this.props.playing ? (<i className="icon-pause"></i>) : (<i className="icon-play"></i>);

        return (
            <button className="toggle_playback" onClick={this.props.handleTogglePlayback}>
                {icon}
            </button>
        );
    }
}
