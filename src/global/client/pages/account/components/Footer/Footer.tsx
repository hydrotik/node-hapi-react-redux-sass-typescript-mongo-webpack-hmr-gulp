/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import { connect } from 'react-redux';

// Styles
import './_Footer.scss';

// Page Components


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
export class Footer extends React.Component<IFooterProps, IFooterState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        // const { dispatch }: IFooterProps = this.props;
        // dispatch(onFooterInit());
    }

    /*
    public handleChange(event: any): void {
        const { dispatch }: IFooterProps = this.props;
        dispatch(onFooterUpdate(event.target.name, event.target.value));
    }
    */
    
    public render(): React.ReactElement<{}> {

        return (
            
        );
    }
}
