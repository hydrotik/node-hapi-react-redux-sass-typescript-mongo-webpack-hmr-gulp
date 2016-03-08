/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
// import { connect } from 'react-redux';
import * as Moment from 'moment';

// Styles
import './_Home.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';

interface IHome {
    interval: any;
}

// Interfaces
interface IHomeProps {
    dispatch?: (func: any) => void;
    store?: any;

    hour?: number;
    minute?: number;
    second?: number;
    year?: number;
    month?: number;
    day?: number;
}

interface IHomeState {
    hour?: number;
    minute?: number;
    second?: number;
    year?: number;
    month?: number;
    day?: number;
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
export class Home extends React.Component<IHomeProps, IHomeState> implements IHome {



    public constructor(props: any = {}) {
        super(props);

        this.state = {
            second: 0,
            minute: 0,
            hour: 0,
            day: 0,
            month: 0,
            year: 0
        };
    }

    public interval: any;

    public refreshTime: any = (e: any): void => {
        this.setState(this.getThisMoment());
    };

    public componentDidMount(): void {
        this.interval = setInterval(this.refreshTime, 1000);
    }

    public componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    public getThisMoment(): any {

        let thisMoment: any = Moment();

        return {
            second: thisMoment.format('ss'),
            minute: thisMoment.format('mm'),
            hour: thisMoment.format('HH'),
            day: thisMoment.format('DD'),
            month: thisMoment.format('MM'),
            year: thisMoment.format('YYYY')
        };
    }

    public render(): React.ReactElement<{}> {

        return (
            <section className='section-home container'>
                <div className='row'>
                    <div className='col-sm-7'>
                        <h1 className='page-header'>Admin</h1>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <div className='well text-center'>
                                    <div className='stat-value'>
                                        {this.state.hour}
                                        </div>
                                    <div className='stat-label'>hour</div>
                                    </div>
                                </div>
                            <div className='col-sm-4'>
                                <div className='well text-center'>
                                    <div className='stat-value'>
                                        {this.state.minute}
                                        </div>
                                    <div className='stat-label'>minute</div>
                                    </div>
                                </div>
                            <div className='col-sm-4'>
                                <div className='well text-center'>
                                    <div className='stat-value'>
                                        {this.state.second}
                                        </div>
                                    <div className='stat-label'>second</div>
                                    </div>
                                </div>
                            <div className='col-sm-4'>
                                <div className='well text-center'>
                                    <div className='stat-value'>
                                        {this.state.year}
                                        </div>
                                    <div className='stat-label'>year</div>
                                    </div>
                                </div>
                            <div className='col-sm-4'>
                                <div className='well text-center'>
                                    <div className='stat-value'>
                                        {this.state.month}
                                        </div>
                                    <div className='stat-label'>month</div>
                                    </div>
                                </div>
                            <div className='col-sm-4'>
                                <div className='well text-center'>
                                    <div className='stat-value'>
                                        {this.state.day}
                                        </div>
                                    <div className='stat-label'>day</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className='col-sm-5'>
                        <h1 className='page-header'>Throttle guage</h1>
                        <div className='text-center'>
                            <i className='fa fa-dashboard bamf'></i>
                            </div>
                        </div>
                    </div>
                </section>
        );
    }
}
