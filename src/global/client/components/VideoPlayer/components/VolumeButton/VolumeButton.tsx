/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_VolumeButton.scss';


// Interfaces
interface IVolumeButtonProps {
    toggleVolume?: (muted: boolean) => void;
    changeVolume?: (value: number) => void;
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
        this.props.toggleVolume(!this.props.muted);
    }

    public changeVolume = (e: Event) => {
        this.props.changeVolume((e.target as any).value);
    }

    public render(): React.ReactElement<{}> {

        let level = this.props.level, l;
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
                <button onClick={this.toggleVolume} className="toggle_volume">
                    <i className={levels[l]}></i>
                </button>
                <input className="volume_slider" type="range" min="0" max="100" onInput={this.changeVolume} />
            </div>
        );
    }
}
