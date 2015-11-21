/// <reference path="../../../../../typings/tsd.d.ts" />
/// <reference path="../../../../../typings/react-slick/react-slick.d.ts" />

import * as React from 'react';

import './_Carousel.scss';

import { map } from 'lodash';

import * as Slick from 'react-slick';

import { CarouselItem } from './CarouselItem';

import '../../../../../node_modules/slick-carousel/slick/slick.scss';
import '../../../../../node_modules/slick-carousel/slick/slick-theme.scss';

import { connect } from 'react-redux';
import { fetchContentIfNeeded, CAROUSEL } from '../../actions/actions';

const Slider: any = Slick.Slider;

const settings: Object = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true
};

interface ICarouselState {
    slides?: any;
    isFetching?: boolean;
    lastUpdated?: number;
}

interface ICarousel {
    dispatch?: (func: any) => void;
    isFetching?: boolean;
    lastUpdated?: number;
    slides?: any;
    store?: any;
}

function select(state: { carouselContent: ICarouselState }): ICarouselState {
    const { carouselContent }: { carouselContent: any; } = state;
    const {
        isFetching,
        lastUpdated,
        slides
    }: ICarouselState = carouselContent;

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
export class Carousel extends React.Component<ICarousel, {}> {

    public constructor(props: any) {
        super(props);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    public componentDidMount(): void {
        const {dispatch}: ICarousel = this.props;
        dispatch(fetchContentIfNeeded(CAROUSEL));
    }

    public render(): React.ReactElement<{}> {

        const {slides, isFetching, lastUpdated }: ICarouselState = this.props;

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

                <Slider {... this.getSettings()}>
                    {map(slides, this.renderCarouselSlide)}
                </Slider>
            </div>
        );
    }

    private getSettings(): any {
        return settings;
    }

    private handleRefreshClick(e: any): void {
        e.preventDefault();
        const {dispatch}: ICarousel = this.props;
        dispatch(fetchContentIfNeeded(CAROUSEL, true));
    }


    private renderCarouselSlide(item: any, i: number): React.ReactElement<{}> {
        return (<div key={i}>
                <CarouselItem item={item} />
            </div>
        );
    }
}
