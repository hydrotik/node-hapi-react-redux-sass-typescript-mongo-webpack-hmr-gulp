/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import { connect } from 'react-redux';
// Styles
import './_App.scss';
// Page Components
import { Header } from '../../../../components/Header/Header.tsx';
import { Footer } from '../../../../components/Footer/Footer.tsx';
import { Carousel } from '../../../../components/Carousel/Carousel.tsx';
// Behaviors and Actions
import { fetchContentIfNeeded, EDITORIAL } from '../../actions/actions.ts';
import { IEditorialReducer } from '../../reducers/reducer.ts';

// Interfaces
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

// Decorators
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
    }

    public render(): React.ReactElement<{}> {
        return (
            <div className = 'app'>
                <Header />
                <Carousel />
                <Footer />
            </div>
        );
    }
}
