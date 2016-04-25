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
    duration?: number;
    seconds?: number;
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


    public render(): React.ReactElement<{}> {

        return (
            <time dateTime={`P${Math.round(this.props.seconds)}S`} className={this.props.className}>
                {this.format(this.props.seconds)}
            </time>


        );
    }
}
