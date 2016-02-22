/// <reference path="../../../../../../../typings/tsd.d.ts" />

import * as React from 'react';

import { connect } from 'react-redux';
import { onExample, IExampleAction } from '../../actions';

import './_Strip.scss';

interface IStripProps {
    dispatch?: (func: any) => void;
    payload?: any[];
    store?: any;
}

interface IStripState {
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

@connect(select)
export class Strip extends React.Component<IStripProps, IStripState> {

    public constructor(props: any) {
        super(props);
    }

    public componentDidMount(): void {
        const {dispatch}: IStripProps = this.props;
        dispatch(onExample(['one', 'two', 'three']));
    }

    public render(): React.ReactElement<{}> {

        return (
            <div className='strip'>
                Payload: { this.props.payload.join(' - ') }
            </div>
        );
    }
}
