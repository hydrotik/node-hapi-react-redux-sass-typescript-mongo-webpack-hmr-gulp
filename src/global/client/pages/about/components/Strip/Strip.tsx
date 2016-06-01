/// <reference path="../../../../../../../typings/index.d.ts" />

import * as React from 'react';

import { connect } from 'react-redux';
import { onExample, IExampleAction } from '../../actions';

import './_Strip.scss';

interface IStripProps {
    dispatch?: (func: any) => void;
    payload?: any[];
    store?: any;
}

interface IStripState extends IStripProps {
    payload?: any[];
}

function select(state: { onExampleReducer: IExampleAction }): IStripState {
    const { onExampleReducer }: { onExampleReducer: IExampleAction; } = state;
    const {
        payload
    }: IExampleAction = onExampleReducer;

    return {
        payload
    };
}

class Container extends React.Component<IStripProps, IStripState> {

    public constructor(props: any) {
        super(props);
    }

    public componentDidMount(): void {
        const {dispatch}: IStripProps = this.props;
        dispatch(onExample(['four', 'five', 'six']));
    }

    public render(): React.ReactElement<{}> {

        return (
            <div className='strip'>
                Payload: { this.props.payload.join(' - ') }
            </div>
        );
    }
}

export const Strip = connect(select)(Container);
