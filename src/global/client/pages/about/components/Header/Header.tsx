/// <reference path="../../../../../../../typings/tsd.d.ts" />

import * as React from 'react';
import { Motion, spring } from 'react-motion';

import { connect } from 'react-redux';
import { onToggle } from '../../actions/locals';
import { IToggleReducer } from '../../reducers/locals';

import './_Header.scss';

interface IHeaderProps {
    dispatch?: (func: any) => void;
    store?: any;
    on?: boolean;
}

interface IHeaderState {
    on?: boolean;
}

function select(state: { toggle: IToggleReducer }): IHeaderState {
    const { toggle }: { toggle: IToggleReducer; } = state;

    const {
        on
    }: IToggleReducer = toggle;

    return {
        on
    };
}

@connect(select)
export class Header extends React.Component<IHeaderProps, IHeaderState> {

    public handleToggleMouseDown: any = (event: any) => {
        event.preventDefault();
        const {dispatch, on}: IHeaderProps = this.props;
        dispatch(onToggle(!on));
    };

    public componentDidMount(): void {
        const {dispatch}: IHeaderProps = this.props;
        dispatch(onToggle(false));
    }

    public render(): React.ReactElement<{}> {

        const {on}: IHeaderProps = this.props;

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
