/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_DurationDisplay.scss';

// Page Components

// Behaviors and Actions


// Interfaces
interface IDurationProps {
    dispatch?: (func: any) => void;
    store?: any;
    ms?: number;
    className?: any;
}

interface IDurationState {

}

export class DurationDisplay extends React.Component<IDurationProps, IDurationState> {

    public constructor(props: any = {}) {
        super(props);
    }


    public componentDidMount(): void {

    }

    public componentWillUnmount(): void {

    }

    public format (seconds: number): string {
        const date: Date = new Date(seconds * 1000);
        const hh: string = date.getHours().toString();
        const mm: string = date.getMinutes().toString();
        const ss: string = this.pad(date.getSeconds().toString());
        if (hh) {
            return `${hh}:${this.pad(mm)}:${ss}`;
        }
        return `${mm}:${ss}`;
    }

    public pad (str: string): string {
        return ('0' + str).slice(-2);
    }

    public fromMilliseconds(ms: number): string {

        let hours, minutes, seconds, group;
        group = []

        hours = Math.floor(ms / 3600);
        minutes = Math.floor(ms % 3600 / 60);
        seconds = Math.floor(ms % 3600 % 60);

        //if (hours > 0) {
            group.push((hours > 9) ? hours : '0' + hours);
        //}
        group.push((minutes > 9) ? minutes : '0' + minutes);
        group.push((seconds > 9) ? seconds : '0' + seconds);

        return group.join(':');

    }


    public render(): React.ReactElement<{}> {

        let time = this.fromMilliseconds(this.props.ms);

        return (
            <span className={this.props.className}>{time}</span>
        );
    }
}
