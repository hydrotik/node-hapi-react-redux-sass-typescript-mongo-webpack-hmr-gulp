/// <reference path='../../../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_VolumeButton.scss';


// Interfaces
interface IVolumeButtonProps {
    toggleVolume?: (muted: boolean) => void;
    changeVolume?: (e: any) => void;
    className?: any;
    muted?: boolean;
    level?: number;
}

interface IVolumeButtonState {

}

const levels: any = {
    'muted': 'icon-volume-off',
    'low': 'icon-volume-down',
    'medium': 'icon-volume',
    'high': 'icon-volume-up'
}

export class VolumeButton extends React.Component<IVolumeButtonProps, IVolumeButtonState> {

    public constructor(props: any = {}) {
        super(props);
    }


    public componentDidMount(): void {

    }

    public componentWillUnmount(): void {

    }

    public toggleVolume = () => {
        this.props.muted = !this.props.muted;
        this.props.toggleVolume(this.props.muted);
    }

    public render(): React.ReactElement<{}> {

        let { level, muted } = this.props, l;

        if (level <= 0) {
            l = 'muted';
        } else if (level > 0 && level <= 0.33) {
            l = 'low';
        } else if (level > 0.33 && level <= 0.66) {
            l = 'medium';
        } else {
            l = 'high';
        }

        return (
            <div className={this.props.className}>
                <button onClick={this.toggleVolume}>
                    <i className={levels[l]}></i>
                </button>
                <input className="volume_slider" value={level} type="range" min="0" max="1" step="any" onChange={this.props.changeVolume} />
            </div>
        );
    }
}
