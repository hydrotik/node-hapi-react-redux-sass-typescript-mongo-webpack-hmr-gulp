/// <reference path='../../../../../typings/tsd.d.ts' />
/* tslint:disable:no-unused-variable */
import * as React from 'react';
import { map } from 'lodash';
import './_App.scss';
import { Header } from '../../components/Header/Header';
import { Carousel } from '../../components/Carousel/Carousel';
import { RowContainer } from '../RowContainer/RowContainer';
import { ColumnContainer } from '../ColumnContainer/ColumnContainer';
import { ContentRow } from '../ContentRow/ContentRow';
import { CallToAction } from '../CallToAction/CallToAction';

import { Footer } from '../../components/Footer/Footer';

import { connect } from 'react-redux';
import { fetchContentIfNeeded, EDITORIAL } from '../../actions/actions';
import { IEditorialReducer } from '../../reducers/reducers';

import * as Scroll from 'react-scroll';

import * as cx from 'classnames';
import { Easer } from 'functional-easing';
import { Track, TrackedDiv, TrackDocument } from 'react-track';
import { tween, combine } from 'react-imation';
import { topTop,
    topBottom,
    centerCenter,
    topCenter,
    bottomBottom,
    bottomTop,
    getDocumentRect,
    getDocumentElement,
    calculateScrollY } from 'react-track/lib/tracking-formulas';
import { rgb, rgba, scale, rotate,
px, percent, translate3d } from 'react-imation/tween-value-factories';

const easeOutBounce: any = new Easer().using('out-bounce');


import { SectionContainer } from '../SectionContainer/SectionContainer';
import { ImageContainer } from '../ImageContainer/ImageContainer';

const Link: any = Scroll.Link;
const Element: any = Scroll.Element;

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
                <SectionContainer
            { ... {
                fullWidth: false,
                    gutter:20
            } }>
        <RowContainer>
            <ColumnContainer>
            <ImageContainer { ... {
                width: 6,
                    height: 2,
                    url: 'http://s7d9.scene7.com/is/image/LordandTaylor/lt-edtrl-beauty-082615-0.0.1-model-hero?scl=1&fmt=png-alpha'
            } } />
        <CallToAction
            description='A full width section with a message related to the content.'
            clickAreaAll={false}
            href='http://www.google.com'
            label='Explore the Collection'
            target='_blank' />
                </ColumnContainer>
                </RowContainer>
                </SectionContainer>

                <SectionContainer>
                <RowContainer>
                <ColumnContainer>
                <ImageContainer { ... {
                width: 1,
                    height: 1,
                    url: 'http://unsplash.it/2000/3000?random=5'
            } } />
        <CallToAction
            label='Shop'
            position='left middle'
            href='http://www.google.com'
            target='_blank'
            description='A message related to the content.'/>
                </ColumnContainer>
                <ColumnContainer>
                <ImageContainer { ... {
                width: 1,
                    height: 1,
                    url: 'http://unsplash.it/2000/3000?random=6'
            } } />
        <CallToAction
            label='Shop'
            position='right middle'
            href='http://www.google.com'
            target='_blank'
            description='A message related to the content.'/>
                </ColumnContainer>
                </RowContainer>
                </SectionContainer>

                <SectionContainer { ... {
                gutter: gutter
            } } >
        <RowContainer>
            <ColumnContainer>
            <ImageContainer { ... {
                width: 1,
                    height: 1,
                    gutter:gutter,
                    url: 'http://unsplash.it/2000/3000?random=2'
            } } />
        <CallToAction
            label='Shop Now'
            position='bottom center'
            href='http://www.google.com'
            target='_blank'
            description='A message related to the content.'/>
                </ColumnContainer>
                <ColumnContainer>
                <ImageContainer { ... {
                width: 1,
                    height: 1,
                    gutter:gutter,
                    url: 'http://unsplash.it/2000/3000?random=3'
            } } />
        <CallToAction
            label='Shop Now'
            position='bottom center'
            href='http://www.google.com'
            target='_blank'
            description='A message related to the content.'/>
                </ColumnContainer>
                <ColumnContainer>
                <ImageContainer { ... {
                width: 1,
                    height: 1,
                    gutter:gutter,
                    url: 'http://unsplash.it/2000/3000?random=4'
            } } />
        <CallToAction
            label='Shop Now'
            position='bottom center'
            href='http://www.google.com'
            target='_blank'
            description='A message related to the content.'/>
                </ColumnContainer>
                </RowContainer>
                </SectionContainer>

                <SectionContainer { ... {
                gutterBottom: gutter
            } } >
        <RowContainer>

            <ColumnContainer>
            <RowContainer>
            <ColumnContainer>
            <ImageContainer { ... {
                width: 2,
                    height: 1,
                    url: 'http://unsplash.it/2000/3000?random=7'
            } } />
        <CallToAction
            label='Shop Now'
            position='bottom left'
            href='http://www.google.com'
            target='_blank'
            description='A message related to the content.'/>
                </ColumnContainer>
                </RowContainer>


                <RowContainer>
                <ColumnContainer>
                <ImageContainer { ... {
                width: 1,
                    height: 1,
                    url: 'http://unsplash.it/2000/3000?random=8'
            } } />
        <CallToAction
            label='Shop Now'
            position='bottom left'
            href='http://www.google.com'
            target='_blank'
            description='A message related to the content.'/>
                </ColumnContainer>
                </RowContainer>

                </ColumnContainer>

                <ColumnContainer>
                <ImageContainer { ... {
                width: 2,
                    height: 3,
                    url: 'http://unsplash.it/2000/3000?random=1'
            } } />
        <CallToAction
            label='Shop Now'
            position='right middle'
            href='http://www.google.com'
            target='_blank'
            description='A message related to the content.'/>
                </ColumnContainer>

                </RowContainer>
                </SectionContainer>

                <SectionContainer>
                <RowContainer>

                <ColumnContainer>
                <ImageContainer { ... {
                width: 2,
                    height: 3,
                    url: 'http://unsplash.it/2000/3000?random=19'
            } } />
        <CallToAction
            label='Shop Now'
            position='right middle'
            href='http://www.google.com'
            target='_blank'
            description='A message related to the content.'/>
                </ColumnContainer>

                <ColumnContainer>
                <RowContainer>
                <ColumnContainer>
                <ImageContainer { ... {
                width: 4,
                    height: 2,
                    url: 'http://unsplash.it/2000/3000?random=10'
            } } />
        <CallToAction
            label='Shop Now'
            position='bottom'
            href='http://www.google.com'
            target='_blank'
            description='A message related to the content.'/>
                </ColumnContainer>
                </RowContainer>


                <RowContainer>
                <ColumnContainer>
                <ImageContainer { ... {
                width: 4,
                    height: 2,
                    url: 'http://unsplash.it/2000/3000?random=11'
            } } />
        <CallToAction
            label='Shop Now'
            position='bottom'
            href='http://www.google.com'
            target='_blank'
            description='A message related to the content.'/>
                </ColumnContainer>
                </RowContainer>

                <RowContainer>
                <ColumnContainer>
                <ImageContainer { ... {
                width: 4,
                    height: 2,
                    url: 'http://unsplash.it/2000/3000?random=12'
            } } />
        <CallToAction
            label='Shop Now'
            position='bottom'
            href='http://www.google.com'
            target='_blank'
            description='A message related to the content.'/>
                </ColumnContainer>
                </RowContainer>

                </ColumnContainer>

                </RowContainer>
                </SectionContainer>


                <SectionContainer { ... {
                gutter:gutter,
            } }>
        <RowContainer>
            <ColumnContainer>
            <ImageContainer { ... {
                width: 1,
                    height: 1,
                    gutter:gutter,
                    url: 'http://unsplash.it/2000/3000?random=13'
            } } />
        <CallToAction
            label='Shop Now'
            href='http://www.google.com'
            target='_blank'
            description='A message related to the content.'/>
                </ColumnContainer>
                <ColumnContainer>
                <ImageContainer { ... {
                width: 1,
                    height: 1,
                    gutter:gutter,
                    url: 'http://unsplash.it/2000/3000?random=14'
            } } />
        <CallToAction
            label='Shop Now'
            href='http://www.google.com'
            target='_blank'
            description='A message related to the content.'/>
                </ColumnContainer>
                <ColumnContainer>
                <ImageContainer { ... {
                width: 1,
                    height: 1,
                    gutter:gutter,
                    url: 'http://unsplash.it/2000/3000?random=15'
            } } />
        <CallToAction
            label='Shop Now'
            href='http://www.google.com'
            target='_blank'
            description='A message related to the content.'/>
                </ColumnContainer>
                <ColumnContainer>
                <ImageContainer { ... {
                width: 1,
                    height: 1,
                    gutter:gutter,
                    url: 'http://unsplash.it/2000/3000?random=16'
            } } />
        <CallToAction
            label='Shop Now'
            href='http://www.google.com'
            target='_blank'
            description='A message related to the content.'/>
                </ColumnContainer>
                </RowContainer>
                </SectionContainer> <Footer />
                </div>
        );
    }

    private renderEditorialRowContainer(item: any, i: number): React.ReactElement<{}> {
        let columns: any = item;
        return (<RowContainer key={i} columns={columns} />);
    }

    private transformPrefixHelper(f: string): any {
        let output: Object = {};
        let prefixes: string[] = [
            '',
            '-webkit-',
            '-ms-'
        ];

        for (var i: number = 0; i < prefixes.length; i = i + 1) {
            output[prefixes[i] + 'transform'] = f;
        }
        return output;
    }
    /* tslint:enable:no-unused-variable */
}
