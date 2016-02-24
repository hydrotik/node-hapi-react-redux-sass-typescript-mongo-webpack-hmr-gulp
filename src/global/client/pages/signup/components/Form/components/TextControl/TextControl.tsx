/// <reference path='../../../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_TextControl.scss';

// Interfaces
interface ITextControlProps {
    name: string; // = "name"
    label: string; // = "Name"
    ref?: string; // = "nameControl"
    type?: string;
    hasError: boolean; // = { this.state.hasError.name }
    valueLink: any; // = { this.linkState('name') }
    help: string; // = { this.state.help.name }
    disabled: boolean; // = { this.state.loading }
}
interface ITextControlState {
}

export class TextControl extends React.Component<ITextControlProps, ITextControlState> {

    public constructor(props: any) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

            return (
                <div className='textcontrol'></div>
            );
        }
    }
