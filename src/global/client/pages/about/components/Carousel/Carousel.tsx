/// <reference path="../../../../../../../typings/tsd.d.ts" />
/// <reference path="../../../../../../../typings/react-slick/react-slick.d.ts" />

import * as React from 'react';

import './_Carousel.scss';

import { map } from 'lodash';

import * as Slick from 'react-slick';

import { CarouselItem } from '../../../../components/CarouselItem/CarouselItem';

import '../../../../../../../node_modules/slick-carousel/slick/slick.scss';
import '../../../../../../../node_modules/slick-carousel/slick/slick-theme.scss';

import { connect } from 'react-redux';
import { fetchContentIfNeeded, CAROUSEL, ICarouselAction} from '../../actions/locals';

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

function select(state: { carouselContent: ICarouselAction }): ICarouselState {
    const { carouselContent }: { carouselContent: ICarouselAction; } = state;
    const {
        isFetching,
        lastUpdated,
        slides
    }: ICarouselAction = carouselContent;

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
    }

    public componentDidMount(): void {
        const {dispatch}: ICarouselProps = this.props;
        dispatch(fetchContentIfNeeded(CAROUSEL));
    }

    public render(): React.ReactElement<{}> {

        const { slides }: ICarouselState = this.props;

        console.warn(slides);

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
                <Slider {... settings}>
                    {map(slides, this.renderCarouselSlide)}
                </Slider>
            </div>
        );
    }

    private renderCarouselSlide(item: any, i: number): React.ReactElement<{}> {
        return (<div key={i}>
                <CarouselItem item={item} />
            </div>
        );
    }
}
