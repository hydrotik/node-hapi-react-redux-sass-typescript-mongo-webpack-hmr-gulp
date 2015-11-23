/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react';
import { Motion, spring } from 'react-motion';

import { connect } from 'react-redux';
import { onToggle } from '../../actions/actions';

import './_Header.scss';

interface IHeaderState {
    on?: boolean;
}

interface IHeader {
    dispatch?: (func: any) => void;
    store?: any;
    on?: boolean;
}

function select(state: { toggle: IHeaderState }): IHeaderState {
    const { toggle }: { toggle: IHeaderState; } = state;

    const {
        on
    }: IHeaderState = toggle;

    return {
        on
    };
}

@connect(select)
export class Header extends React.Component<IHeader, {}> {

    public handleToggleMouseDown: any = (event: any) => {
        event.preventDefault();
        const {dispatch, on}: IHeader = this.props;
        dispatch(onToggle(!on));
    };

    public componentDidMount(): void {
        const {dispatch}: IHeader = this.props;
        dispatch(onToggle(false));
    }

    public render(): React.ReactElement<{}> {

        const {on}: IHeader = this.props;

        return (
            <div className='header'>
                <h1>Hello World</h1>
                <div>
                    <button
                        onMouseDown={this.handleToggleMouseDown}>
                        Toggle
                    </button>
                    <Motion style={{ x: spring(on ? 400 : 0) }}>
                        {({x}: { x: number }) =>
                            // children is a callback which should accept the current value of
                            // `style` es6 string interpolation
                            <div className='demo0'>
                                <div className='demo0-block' style={{
                                    WebkitTransform: `translate3d(${x}px, 0, 0)`,
                                    transform: `translate3d(${x}px, 0, 0)`,
                                }}>{Math.floor(x) }</div>
                            </div>
                        }
                    </Motion>
                    { on ? 'Right' : 'Left' }
                </div>
            </div>
        );
    }
}
