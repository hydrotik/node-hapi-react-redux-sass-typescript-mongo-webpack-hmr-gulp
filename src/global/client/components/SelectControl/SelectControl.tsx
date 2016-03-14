/// <reference path='../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import * as ClassNames from 'classnames';
import * as lodash from 'lodash';

// Styles
import './_SelectControl.scss';

// Components
import { ControlGroup } from '../ControlGroup/ControlGroup';

// Interfaces
interface ISelectControlProps {
    name: string; // = "name"
    label: string; // = "Name"
    ref?: string; // = "nameControl"
    type?: string;
    hasError?: boolean; // = { this.state.hasError.name }
    valueLink?: any; // = { this.linkState('name') }
    help?: string; // = { this.state.help.name }
    disabled: boolean; // = { this.state.loading }

    autoCapitalize?: boolean;
    inputClasses?: any;
    placeholder?: string;
    value?: any;
    onChange?: (func: any) => void;
    children?: any;
    defaultValue?: string;
    size?: any;
    multiple?: any;

}
interface ISelectControlState {
}

export class SelectControl extends React.Component<ISelectControlProps, ISelectControlState> {

    public constructor(props: any) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        let inputClasses: any = ClassNames(
            lodash.assign(
                {},
                {
                    'form-control': true
                },
                this.props.inputClasses
            ) as any
        );

        return (
            <ControlGroup
                hasError={this.props.hasError}
                label={this.props.label}
                help={this.props.help}>

                <select
                    ref="selectField"
                    multiple={this.props.multiple}
                    className={inputClasses}
                    name={this.props.name}
                    size={this.props.size}
                    value={this.props.value}
                    defaultValue={this.props.defaultValue}
                    disabled={this.props.disabled}
                    onChange={this.props.onChange}>

                    {this.props.children}
                </select>
            </ControlGroup>
            );
        }
    }
