/// <reference path='../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';
import * as ClassNames from 'classnames';
import * as lodash from 'lodash';

// Styles
import './_ControlGroup.scss';

// Interfaces
interface IControlGroupProps {
    hideLabel?: boolean;
    hideHelp?: boolean;
    children?: any;
    hasError?: boolean;

    groupClasses?: string;
    labelClasses?: string;
    helpClasses?: string;

    label?: string;
    help?: any;

}
interface IControlGroupState {
}

export class ControlGroup extends React.Component<IControlGroupProps, IControlGroupState> {

    public constructor(props: any) {
        super(props);
    }

    public render(): React.ReactElement<{}> {


        let groupClasses: any = ClassNames(
            lodash.assign(
                {},
                {
                    'form-group': true,
                    'has-error': this.props.hasError
                },
                this.props.groupClasses
            ) as any
        );

        let labelClasses: any = ClassNames(lodash.assign({}, { 'control-label': true }, this.props.labelClasses) as any);

        let helpClasses: any = ClassNames(lodash.assign({}, { 'help-block': true }, this.props.helpClasses) as any);

        let labelComponent: React.ReactElement<{}>;

        if (!this.props.hideLabel) {
            labelComponent = <label className={labelClasses}>
                {this.props.label}
                </label>;
        }

        let helpComponent: React.ReactElement<{}>;

        if (!this.props.hideHelp) {
            helpComponent = <span className={helpClasses}>
                {this.props.help}
                </span>;
        }

        return (
            <div className={groupClasses}>
                {labelComponent}
                {this.props.children}
                {helpComponent}
            </div>
        );
    }
}
