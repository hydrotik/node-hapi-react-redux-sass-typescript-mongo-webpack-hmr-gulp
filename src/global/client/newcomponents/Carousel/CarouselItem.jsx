import React from 'react';

// import CallToAction from '../CallToAction/CallToAction.jsx';

const { Component, PropTypes } = React;

import './_CarouselItem.scss';

const displayName = 'CarouselItem';

const propTypes = {
    item: PropTypes.object.isRequired
};

/**
 * @class CarouselItem
 * @augments {React.Component}
 */
export default class CarouselItem extends Component {

    constructor() {
        super();
        this.onItemClick = this.onItemClick.bind(this);
    }

    onItemClick(e) {
        e.preventDefault();
        window.alert('You clicked ' + this.props.item.href);
    }

    render() {

        const divStyle = {
            backgroundImage: 'url(' + this.props.item.src + ')'
        };

        return (
            <div className="carouselitem" style={divStyle}>
                <div onClick={this.onItemClick} className="carouselitem__link">
                    <div className="carouselitem__link__content">
                        <h2 className="carouselitem__link__content__heading">
                            {this.props.item.title}
                        </h2>
                        <p>{this.props.item.description}</p>
                        {/* TODO Fix positioning of CTA when being used with other siblings
                        <CallToAction
                            position="center"
                            href="http://www.google.com"
                            target="_blank"
                            description="Full Row"/>
                        <img src={require("./images/" + this.props.item.src)} width='100%' />*/}
                    </div>
                </div>
            </div>
        );
    }
}

CarouselItem.displayName = displayName;
CarouselItem.propTypes = propTypes;
