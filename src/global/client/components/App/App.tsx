/// <reference path='../../../../../typings/tsd.d.ts' />
/* tslint:disable:no-unused-variable */
import * as React from 'react';
import { map } from 'lodash';
import './_App.scss';
import { Header } from '../Header/Header';
import { Carousel } from '../Carousel/Carousel';
import { RowContainer } from '../RowContainer/RowContainer';
import { ColumnContainer } from '../ColumnContainer/ColumnContainer';
import { ContentRow } from '../ContentRow/ContentRow';
import { CallToAction } from '../CallToAction/CallToAction';
import * as ReactPicture from 'react-picture';
const Img: any = ReactPicture.BaseImage;

import { Footer } from '../Footer/Footer';

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

// import { TrackDocument/*, Track*/ } from '../../animation/react-track';
// import { getDocumentRect/*, getDocumentElement*/ } from '../../animation/react-track-formulas';

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
        return (
            <div className = 'app'>
                <Link to='test1' id='element-link-1' spy={true} smooth={true} offset={50} duration={2000}>Carousel</Link>&nbsp; |&nbsp;
                <Link to='test2' id='element-link-2' spy={true} smooth={true} offset={50} duration={2000}>Editorial</Link>&nbsp; |&nbsp;
                <Link to='test3' id='element-link-3' spy={true} smooth={true} offset={50} duration={2000}>Footer</Link>
                <TrackDocument formulas={[getDocumentElement, getDocumentRect, calculateScrollY,
                    topTop, topBottom, topCenter, centerCenter, bottomBottom, bottomTop]}>
                  {(documentElement: any, documentRect: any, scrollY: any, topTop: any,
                        topBottom: any, topCenter: any, centerCenter: any, bottomBottom: any, bottomTop: any) =>
                    <div style={{ minHeight: '1400px' }}>

                        <RowContainer>
                            <ContentRow type='full'>
                                <CallToAction position='left' href='http://www.google.com' target='_blank' description='EXPLICIT ROW' />
                                <TrackedDiv className='hero' formulas={[topTop]}>
                                    { (posTopTop: any) => (
                                        <div>
                                            <Track component='div' formulas={[topBottom, bottomTop]}>
                                            {(Div: any, posTopBottom: any, posBottomTop: any) =>
                                                <Div className='hero-cont'>
                                                            <div
                                                                className='hero-img'
                                                                style={tween(scrollY, [
                                                                    [posTopBottom, this.transformPrefixHelper(translate3d(0, 0, 0))],
                                                                    [posBottomTop, this.transformPrefixHelper(translate3d(0, -80, 0))]
                                                                ]) }></div>
                                                    </Div>
                                            }</Track>
                                          <div className='down-arrow'
                                              style={tween(scrollY, [
                                                  [posTopTop, { opacity: 1, transform: translate3d(0, 0, 0) }],
                                                  [posTopTop + 200, { opacity: 0, transform: translate3d(0, -150, 0) }]
                                              ]) }>v</div>
                                        </div>
                                    ) }
                                </TrackedDiv>
                            </ContentRow>
                        </RowContainer>

                      {/* fade */}
                      <Track component='h2' formulas={[topBottom, centerCenter]}>
                      {(H2: any, posTopBottom: any, posCenterCenter: any) =>
                          <H2
                              style={tween(scrollY, [
                                  [posTopBottom, { opacity: 0 }],
                                  [posCenterCenter, { opacity: 1 }]
                              ]) }>fade</H2>
                      }</Track>

                      {/* parallax */}

                        <Track component='div' formulas={[topBottom, bottomTop]}>
                        {(Div: any, posTopBottom: any, posBottomTop: any) =>
                            <Div className='parallax-cont'>
                            <div className='parallax-shadow' />

                            <div
                                className='parallax-img'
                                style={tween(scrollY, [
                                    [posTopBottom, this.transformPrefixHelper(translate3d(0, 0, 0))],
                                    [posBottomTop, this.transformPrefixHelper(translate3d(0, -80, 0))]
                                ]) }></div>

                            <h3
                                className='parallax-txt fade2'
                        style={tween(scrollY, [
                                    [posTopBottom, this.transformPrefixHelper(combine(scale(0.8), translate3d(0, 120, 0)))],
                                    [posBottomTop, this.transformPrefixHelper(combine(scale(0.8), translate3d(0, -120, 0)))]
                                ]) }>parallax</h3>

                            <h3
                                className='parallax-txt fade1'
                                style={tween(scrollY, [
                                    [posTopBottom, this.transformPrefixHelper(combine(scale(0.9), translate3d(0, 160, 0)))],
                                    [posBottomTop, this.transformPrefixHelper(combine(scale(0.9), translate3d(0, -160, 0)))]
                                ]) }>parallax</h3>

                            <h3
                                className='parallax-txt'
                                style={tween(scrollY, [
                                    [posTopBottom, this.transformPrefixHelper(translate3d(0, 200, 0))],
                                    [posBottomTop, this.transformPrefixHelper(translate3d(0, -200, 0))]
                                ]) }>parallax</h3>
                                </Div>
                        }</Track>

                          </div>
                  }</TrackDocument>
                <Header />
                <Element name='test1' className='element'>
                    <Carousel />
                </Element>
                <Element name='test2' className='element'>
                    { map(this.props.editorial, this.renderEditorialRowContainer) }

                    <RowContainer>
                        <ContentRow type='full'>
                          <CallToAction position='left' href='http://www.google.com' target='_blank' description='EXPLICIT ROW' />
                          <Img alt='Your picture description' srcSet={
                              '//farm1.staticflickr.com/485/20356020016_4a5b357270_c.jpg 600w, ' +
                              '//farm1.staticflickr.com/485/20356020016_f9c816c270_h.jpg 800w, ' +
                              '//farm1.staticflickr.com/485/20356020016_e3e67db2ad_k.jpg 1000w'
                          } extra={{ width: '100%', height: '100%' }} />
                        </ContentRow>
                    </RowContainer>
                    <RowContainer>
                        <ColumnContainer>
                            <ContentRow type='column'>
                                <CallToAction position='center' href='http://www.google.com' target='_blank' description='EXPLICIT' />
                                <Img alt='Your picture description' srcSet={
                                    '//farm3.staticflickr.com/2646/4092034117_203c35f9fa.jpg 600w, ' +
                                    '//farm3.staticflickr.com/2646/4092034117_203c35f9fa_z.jpg 800w, ' +
                                    '//farm3.staticflickr.com/2646/4092034117_203c35f9fa_b.jpg 1000w'
                                } extra={{ width: '100%', height: '100%' }} />
                            </ContentRow>
                            <ContentRow type='column'>
                                <CallToAction position='center' href='http://www.google.com'
                                    target='_blank' description='EXPLICIT Lorem ipsum here in the descripsum to explain sum.' />
                                <Img alt='Your picture description' srcSet={
                                    '//farm3.staticflickr.com/2646/4092034117_203c35f9fa.jpg 600w, ' +
                                    '//farm3.staticflickr.com/2646/4092034117_203c35f9fa_z.jpg 800w, ' +
                                    '//farm3.staticflickr.com/2646/4092034117_203c35f9fa_b.jpg 1000w'
                                } extra={{ width: '100%', height: '100%' }} />
                            </ContentRow>
                        </ColumnContainer>
                        <ColumnContainer>
                            <ContentRow type='column'>
                                <CallToAction position='center' href='http://www.google.com'
                                    target='_blank' description='EXPLICIT 1 and 2 Lorem ipsum here in the descripsum to explain sum.' />
                                <Img alt='Your picture description' srcSet={
                                    '//farm9.staticflickr.com/8301/7794118424_1330cf491d.jpg 600w, ' +
                                    '//farm9.staticflickr.com/8301/7794118424_1330cf491d_c.jpg 800w, ' +
                                    '//farm9.staticflickr.com/8301/7794118424_1330cf491d_b.jpg 1000w'
                                } extra={{ width: '100%', height: '100%' }} />
                            </ContentRow>
                        </ColumnContainer>
                    </RowContainer>
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
