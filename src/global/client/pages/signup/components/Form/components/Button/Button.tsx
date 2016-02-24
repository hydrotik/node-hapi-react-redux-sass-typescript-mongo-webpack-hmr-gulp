/// <reference path='../../../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_Button.scss';

// Interfaces
interface IButtonProps {
    type: string;
    inputClasses: any;
    disabled: boolean;
}

interface IButtonState {
}

export class Button extends React.Component<IButtonProps, IButtonState> {

    public constructor(props: any) {
        super(props);
    }

    public componentDidMount(): void {

    }

    public render(): React.ReactElement<{}> {

        return (
            <div className="button"></div>
        );
    }
}
