/// <reference path='../../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';
import * as ClassNames from 'classnames';
import * as lodash from 'lodash';

// Styles
import './_TextControl.scss';

// Components
import { ControlGroup } from '../ControlGroup/ControlGroup';

// Interfaces
interface ITextControlProps {
    name: string; // = "name"
    label: string; // = "Name"
    ref?: string; // = "nameControl"
    type?: string;
    hasError?: boolean; // = { this.state.hasError.name }
    valueLink?: any; // = { this.linkState('name') }
    help?: string; // = { this.state.help.name }
    disabled: boolean; // = { this.state.loading }

    autoCapitalize?: string;
    inputClasses?: any;
    placeholder?: string;
    value?: any;
    onChange?: (func: any) => void;
    onBlur?: (func: any) => void;

}
interface ITextControlState {
}

export class TextControl extends React.Component<ITextControlProps, ITextControlState> {

    public constructor(props: any) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        let inputClasses: any = ClassNames(
            lodash.assign(
                {},
                {
                    'form__input': true
                },
                this.props.inputClasses
            ) as any
        );

        return (
            <ControlGroup
                hasError={this.props.hasError}
                label={this.props.label}
                help={this.props.help}>

                <input
                    ref='inputField'
                    type={this.props.type}
                    autoCapitalize={this.props.autoCapitalize}
                    className={inputClasses}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    disabled={this.props.disabled ? true : false}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                    {...this.props}
                    />
                </ControlGroup>
            );
        }
    }
