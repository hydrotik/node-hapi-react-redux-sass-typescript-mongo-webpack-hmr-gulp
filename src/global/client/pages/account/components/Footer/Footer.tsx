/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
// import { connect } from 'react-redux';

// Styles
import './_Footer.scss';

// Page Components

/*
// Behaviors and Actions
import {

} from '../../actions';

// Interfaces

interface IFooterProps {
    dispatch?: (func: any) => void;
    store?: any;
}

interface IFooterState {

}
*/
// Decorators
/*
function select(state: { formSignup: IReducer; }): IFooterState {
    const { formSignup }: { formSignup: IReducer; } = state;
    const {
    }: IReducer = formSignup;

    return {
    };

}

@connect(select) */
export class Footer extends React.Component<{}, {}> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
            <div>Footer</div>
        );
    }
}
