/// <reference path='../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';
import * as ClassNames from 'classnames';
import * as lodash from 'lodash';

// Styles
import './_Button.scss';

// Interfaces
interface IButtonProps {
    type: string;
    inputClasses: any;
    name?: string;
    disabled?: boolean;
    children?: any;
    onClick?: any;
    value?: any;
}

interface IButtonState {
}

export class Button extends React.Component<IButtonProps, IButtonState> {

    public constructor(props: any) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        let inputClasses: any = ClassNames(lodash.assign({}, {'btn': true}, this.props.inputClasses) as any);

        return (
            <button
                type={this.props.type}
                className={inputClasses}
                name={this.props.name}
                value={this.props.value}
                disabled={this.props.disabled ? true : false}
                onClick={this.props.onClick}>

                {this.props.children}
            </button>
        );
    }
}
