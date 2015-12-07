/// <reference path="../../../../../typings/tsd.d.ts" />
/// <reference path="../../../../../typings/react-slick/react-slick.d.ts" />

import * as React from 'react';

import './_Carousel.scss';

import { map } from 'lodash';

import * as Slick from 'react-slick';

import { CarouselItem } from './CarouselItem.tsx';

import '../../../../../node_modules/slick-carousel/slick/slick.scss';
import '../../../../../node_modules/slick-carousel/slick/slick-theme.scss';

import { connect } from 'react-redux';
import { fetchContentIfNeeded, CAROUSEL } from '../../actions/actions.ts';
import { ICarouselReducer } from '../../reducers/reducers.ts';

const Slider: any = Slick.Slider;

interface ICarouselProps {
    dispatch?: (func: any) => void;
    isFetching?: boolean;
    lastUpdated?: number;
    slides?: any;
    store?: any;
}

interface ICarouselState {
    slides?: any;
    isFetching?: boolean;
    lastUpdated?: number;
}

function select(state: { carouselContent: ICarouselReducer }): ICarouselState {
    const { carouselContent }: { carouselContent: ICarouselReducer; } = state;
    const {
        isFetching,
        lastUpdated,
        slides
    }: ICarouselReducer = carouselContent;

    return {
        slides,
        isFetching,
        lastUpdated
    };
}

/**
 * @class Carousel
 * @augments {React.Component}
 */
@connect(select)
export class Carousel extends React.Component<ICarouselProps, ICarouselState> {

    public constructor(props: any) {
        super(props);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    public componentDidMount(): void {
        const {dispatch}: ICarouselProps = this.props;
        dispatch(fetchContentIfNeeded(CAROUSEL));
    }

    public render(): React.ReactElement<{}> {

        const {slides, isFetching, lastUpdated }: ICarouselState = this.props;

        /* tslint:disable:no-unused-variable */
        const settings: Object = {
            arrows: true,
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: true
        };
        /* tslint:enable:no-unused-variable */

        return (
            <div className='carousel'>
                <p>
                  {lastUpdated &&
                    <span>
                      Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                    </span>
                  }
                  {!isFetching &&
                    <a href='#'
                       onClick={this.handleRefreshClick}>
                      Refresh
                    </a>
                  }
                </p>
                <Slider {... settings}>
                    {map(slides, this.renderCarouselSlide)}
                </Slider>
            </div>
        );
    }

    private handleRefreshClick(e: any): void {
        e.preventDefault();
        const {dispatch}: ICarouselProps = this.props;
        dispatch(fetchContentIfNeeded(CAROUSEL, true));
    }


    private renderCarouselSlide(item: any, i: number): React.ReactElement<{}> {
        return (<div key={i}>
                <CarouselItem item={item} />
            </div>
        );
    }
}
