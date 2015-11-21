/// <reference path='../../../../../typings/tsd.d.ts' />

import * as React from 'react';
import { map } from 'lodash';
import './_App.scss';
import 'react-addons-create-fragment';
import { Header } from '../Header/Header';
import { Carousel } from '../Carousel/Carousel';
import { RowContainer } from '../RowContainer/RowContainer';

import { Footer } from '../Footer/Footer';


import { connect } from 'react-redux';
import { fetchContentIfNeeded, EDITORIAL } from '../../actions/actions';

import * as Scroll from 'react-scroll';

const Link: any = Scroll.Link;
const Element: any = Scroll.Element;

interface IAppState {
    editorial?: any;
    isFetching?: boolean;
    lastUpdated?: number;
}

interface IApp {
    dispatch?: (func: any) => void;
    isFetching?: boolean;
    lastUpdated?: number;
    editorial?: any;
    store?: any;
}

function selectEditorial(state: { editorialContent: IAppState }): IAppState {
    const { editorialContent }: { editorialContent: any; } = state;
    const {
        isFetching,
        lastUpdated,
        editorial
    }: IAppState = editorialContent;

    return {
        editorial,
        isFetching,
        lastUpdated
    };
}

@connect(selectEditorial)
export class App extends React.Component<IApp, {}> {

    public constructor(props: any) {
        super(props);
    }

    // fat arrow function for maintaining scope for accessing this.props
    // non performant to pass scrollTop to state.
    public handleScroll: any = (event: any) => {
        let scrollTop: number = event.srcElement.body.scrollTop,
            itemTranslate: number = Math.min(0, scrollTop / -1);
        // const {dispatch}: IApp = this.props;
        // dispatch(onScroll(itemTranslate));
        console.log(itemTranslate);
    };

    public componentDidMount(): void {
        const {dispatch}: IApp = this.props;
        dispatch(fetchContentIfNeeded(EDITORIAL));

        // if (ExecutionEnvironment.canUseDOM) {
        // window.addEventListener('scroll', this.handleScroll);
        // }
    }

    public componentWillUnmount(): void {
        // window.removeEventListener('scroll', this.handleScroll);
    }

    public render(): React.ReactElement<{}> {

        const {editorial}: IApp = this.props;

        return (<div className = 'app'>
            <Link to='test1' spy={true} smooth={true} offset={50} duration={2000}>Carousel</Link>&nbsp; |&nbsp;
            <Link to='test2' spy={true} smooth={true} offset={50} duration={2000}>Editorial</Link>&nbsp; |&nbsp;
            <Link to='test3' spy={true} smooth={true} offset={50} duration={2000}>Footer</Link>
            <Header />
            <Element name='test1' className='element'>
                <Carousel />
                </Element>
            <Element name='test2' className='element'>
                { map(editorial, this.renderEditorialRowContainer) }
                </Element>
            <Element name='test3' className='element'>
                <Footer />
                </Element>
            </div>
        );
    }

    private renderEditorialRowContainer(item: any, i: number): React.ReactElement<{}> {
        let columns: any = item;

        return (<RowContainer key={i} columns={columns} />);
    }

}
