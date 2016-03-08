/// <reference path='../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import * as ClassNames from 'classnames';

// Styles
import './_Spinner.scss';

// Interfaces
interface ISpinnerProps {
    space: string;
    show: boolean;
}

interface ISpinnerState {
}

export class Spinner extends React.Component<ISpinnerProps, ISpinnerState> {

    public constructor(props: any) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        let spaceLeft: string;
        if (this.props.space === 'left') {
            spaceLeft = '\u00A0\u00A0';
        }

        let spaceRight: string;
        if (this.props.space === 'right') {
            spaceRight = '\u00A0\u00A0';
        }

        let spinnerClasses: any = ClassNames({
            hidden: !this.props.show
        });

        return (
            <span className={spinnerClasses}>
                {spaceLeft}
                <i className='fa fa-refresh fa-spin'></i>
                {spaceRight}
            </span>
        );
    }
}
