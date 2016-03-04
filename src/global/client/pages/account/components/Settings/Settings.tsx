/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
// import { connect } from 'react-redux';

// Styles
import './_Settings.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';

// Interfaces
interface ISettingsProps {
    dispatch?: (func: any) => void;
    store?: any;
}

interface ISettingsState {

}

// Decorators
/*
function select(state: { formSignup: IReducer; }): ISettingsState {
    const { formSignup }: { formSignup: IReducer; } = state;
    const {
    }: IReducer = formSignup;

    return {
    };

}

@connect(select) */
export class Settings extends React.Component<ISettingsProps, ISettingsState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        // const { dispatch }: ISettingsProps = this.props;
        // dispatch(onSettingsInit());
    }

    /*
    public handleChange(event: any): void {
        const { dispatch }: ISettingsProps = this.props;
        dispatch(onSettingsUpdate(event.target.name, event.target.value));
    }
    */

    public render(): React.ReactElement<{}> {

        return (
            <div>SETTINGS</div>
        );
    }
}
