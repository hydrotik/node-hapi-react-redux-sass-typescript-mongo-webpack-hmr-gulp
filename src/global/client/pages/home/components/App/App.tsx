/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import { connect } from 'react-redux';

// Styles
import './_App.scss';

// Page Components
import { Header } from '../Header/Header';
import { Footer } from '../../../../components/Footer/Footer';
import { Carousel } from '../Carousel/Carousel';
import { Strip } from '../Strip/Strip';

// Behaviors and Actions
import { fetchContentIfNeeded, EDITORIAL, IEditorialAction} from '../../actions';

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
function select(state: { editorialContent: IEditorialAction; }): IAppState {
    const { editorialContent }: { editorialContent: IEditorialAction; } = state;
    const {
        isFetching,
        lastUpdated,
        editorial
    }: IEditorialAction = editorialContent;

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
                <Strip />
                <Carousel />
                <Footer />
            </div>
        );
    }
}
