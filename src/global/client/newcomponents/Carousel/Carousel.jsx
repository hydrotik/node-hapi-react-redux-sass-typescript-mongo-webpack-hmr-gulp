
import { map } from 'lodash';

import Slider from 'react-slick/dist/react-slick';
import CarouselItem from './CarouselItem.jsx';

import './_Carousel.scss';

import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchSlidesIfNeeded } from '../../actions/actions.es6';

const displayName = 'Carousel';

/**
 * @class Carousel
 * @augments {React.Component}
 */
export default class Carousel extends Component {

    constructor(props) {
        super(props);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchSlidesIfNeeded());
    }

    componentWillReceiveProps() {
    }

    componentWillUnmount() {
    }

    handleRefreshClick(e) {
        e.preventDefault();
        const {dispatch} = this.props;
        dispatch(fetchSlidesIfNeeded());
    }

    renderCarouselSlide(item, i) {
        return (<div key={i}>
                <CarouselItem item={item} />
            </div>
        );
    }

    renderCarousel(slides) {
        const settings = {
            arrows: true,
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: true
        };

        return (
            <Slider {...settings}>
                {map(slides, this.renderCarouselSlide)}
            </Slider>
        );
    }

    render() {

        const {slides, isFetching, lastUpdated } = this.props;

        return (
            <div className="carousel">
                <p>
                  {lastUpdated &&
                    <span>
                      Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                    </span>
                  }
                  {!isFetching &&
                    <a href="#"
                       onClick={this.handleRefreshClick}>
                      Refresh
                    </a>
                  }
                </p>
                {this.renderCarousel(slides)}
            </div>
        );
    }
}

Carousel.displayName = displayName;
Carousel.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    lastUpdated: PropTypes.number,
    slides: PropTypes.array
};

function mapStateToProps(state) {
    const { selectedReddit, carouselContent } = state;
    const {
        isFetching,
        lastUpdated,
        slides
    } = carouselContent;

    return {
        selectedReddit,
        slides,
        isFetching,
        lastUpdated
    };
}

export default connect(mapStateToProps)(Carousel);
