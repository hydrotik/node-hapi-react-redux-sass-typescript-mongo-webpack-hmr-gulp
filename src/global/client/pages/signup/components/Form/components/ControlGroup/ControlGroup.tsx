/// <reference path='../../../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import * as ClassNames from 'classnames';
import * as lodash from 'lodash';

// Styles
import './_ControlGroup.scss';

// Interfaces
interface IControlGroupProps {
    hideLabel: boolean;
    hideHelp: boolean;
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

    public componentDidMount(): void {

    }

    public render(): React.ReactElement<{}> {


        var groupClasses = ClassNames(lodash.assign({}, {
            'form-group': true,
            'has-error': this.props.hasError
        }, this.props.groupClasses) as any);

        var labelClasses = ClassNames(lodash.assign({}, {
            'control-label': true
        }, this.props.labelClasses) as any);

        var helpClasses = ClassNames(lodash.assign({}, {
            'help-block': true
        }, this.props.helpClasses) as any);

        var labelComponent;
        if (!this.props.hideLabel) {
            labelComponent = <label className={labelClasses}>
                {this.props.label}
                </label>;
        }

        var helpComponent;
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
