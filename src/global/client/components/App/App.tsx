/// <reference path='../../../../../typings/tsd.d.ts' />
/* tslint:disable:no-unused-variable */
import * as React from 'react';
import { map } from 'lodash';
import './_App.scss';
import { Header } from '../../components/Header/Header.tsx';
import { Carousel } from '../../components/Carousel/Carousel.tsx';

import { Footer } from '../../components/Footer/Footer.tsx';

import { connect } from 'react-redux';
import { fetchContentIfNeeded, EDITORIAL } from '../../actions/actions.ts';
import { IEditorialReducer } from '../../reducers/reducers.ts';


interface IAppProps {
    dispatch?: (func: any) => void;
    isFetching?: boolean;
    lastUpdated?: number;
    editorial?: any;
    store?: any;
}

interface IAppState {
    editorial?: any;
    isFetching?: boolean;
    lastUpdated?: number;
}

function select(state: { editorialContent: IEditorialReducer; }): IAppState {
    const { editorialContent }: { editorialContent: IEditorialReducer; } = state;
    const {
        isFetching,
        lastUpdated,
        editorial
    }: IEditorialReducer = editorialContent;

    return {
        editorial,
        isFetching,
        lastUpdated
    };
}

@connect(select)
export class App extends React.Component<IAppProps, IAppState> {

    public constructor(props: any) {
        super(props);
    }

    public componentDidMount(): void {
        const {dispatch}: IAppProps = this.props;
        dispatch(fetchContentIfNeeded(EDITORIAL));

        // if (ExecutionEnvironment.canUseDOM) {
        // window.addEventListener('scroll', this.handleScroll);
        // }

        // window.addEventListener('scroll', (event: any) => {
        //    this.setState({ rect: document.documentElement.getBoundingClientRect() });
        // });
    }

    public componentWillUnmount(): void {
        // window.removeEventListener('scroll', this.handleScroll);
    }

    public render(): React.ReactElement<{}> {

        let gutter: number = 20;

        return (
            <div className = 'app'>
                <Header />
                <Carousel />
                <Footer />
            </div>
        );
    }

    /* tslint:enable:no-unused-variable */
}
