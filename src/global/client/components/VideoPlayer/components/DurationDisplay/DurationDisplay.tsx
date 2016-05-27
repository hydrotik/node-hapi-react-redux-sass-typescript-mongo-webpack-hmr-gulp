/// <reference path='../../../../../../../typings/index.d.ts' />

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
    time: string;
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

    public render(): React.ReactElement<{}> {

        return (
            <span className={this.props.className}>{this.props.time}</span>
        );
    }
}
