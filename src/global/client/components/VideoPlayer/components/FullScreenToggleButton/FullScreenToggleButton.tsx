/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_FullScreenToggleButton.scss';


// Interfaces
interface IFullScreenToggleButtonProps {
    onToggleFullscreen?: () => void;
    className?: any;
}

interface IFullScreenToggleButtonState {

}

export class FullScreenToggleButton extends React.Component<IFullScreenToggleButtonProps, IFullScreenToggleButtonState> {

    public constructor(props: any = {}) {
        super(props);
    }


    public componentDidMount(): void {

    }

    public componentWillUnmount(): void {

    }

    public requestFullscreen = () => {
        this.props.onToggleFullscreen();
    }

    public render(): React.ReactElement<{}> {

        return (
            <button className="toggle_fullscreen_button" onClick={this.requestFullscreen}>
                <i className="icon-fullscreen"></i>
            </button>
        );
    }
}
