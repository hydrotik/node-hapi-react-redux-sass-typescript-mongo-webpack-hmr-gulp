/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
// import { connect } from 'react-redux';

// Styles
import './_Home.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';

// Interfaces
interface IHomeProps {
    dispatch?: (func: any) => void;
    store?: any;
}

interface IHomeState {

}

// Decorators
/*
function select(state: { formSignup: IReducer; }): IHomeState {
    const { formSignup }: { formSignup: IReducer; } = state;
    const {
    }: IReducer = formSignup;

    return {
    };

}

@connect(select) */
export class Home extends React.Component<IHomeProps, IHomeState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        // const { dispatch }: IHomeProps = this.props;
        // dispatch(onHomeInit());
    }

    /*
    public handleChange(event: any): void {
        const { dispatch }: IHomeProps = this.props;
        dispatch(onHomeUpdate(event.target.name, event.target.value));
    }
    */

    public render(): React.ReactElement<{}> {

        return (
            <div>HOME</div>
        );
    }
}
