/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import { connect } from 'react-redux';

// Styles
import './_NotFound.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';

// Interfaces
interface INotFoundProps {
    dispatch?: (func: any) => void;
    store?: any;
}

interface INotFoundState {

}

// Decorators
/*
function select(state: { formSignup: IReducer; }): INotFoundState {
    const { formSignup }: { formSignup: IReducer; } = state;
    const {
    }: IReducer = formSignup;

    return {
    };

}

@connect(select) */
export class NotFound extends React.Component<INotFoundProps, INotFoundState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        // const { dispatch }: INotFoundProps = this.props;
        // dispatch(onNotFoundInit());
    }

    /*
    public handleChange(event: any): void {
        const { dispatch }: INotFoundProps = this.props;
        dispatch(onNotFoundUpdate(event.target.name, event.target.value));
    }
    */

    public render(): React.ReactElement<{}> {

        return (
            
        );
    }
}
