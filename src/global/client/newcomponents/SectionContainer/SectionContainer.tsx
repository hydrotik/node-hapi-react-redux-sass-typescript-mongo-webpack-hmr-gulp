import './_SectionContainer.scss';
import React from 'react';

const { Component, PropTypes, Context} = React;

const displayName = 'SectionContainer';

const propTypes = {
    fullWidth: PropTypes.bool,
    gutter: PropTypes.number,
    gutterBottom: PropTypes.number,
    children: React.PropTypes.node
};



/**
 * @class SectionContainer
 * @augments {React.Component}
 */
export default class SectionContainer extends Component {

    render() {

        let gutter = this.props.gutter ? {'marginBottom': this.props.gutter + this.props.gutterBottom + 'px','marginTop': this.props.gutter / 2 + 'px'} : {'marginBottom': this.props.gutterBottom + 'px'};
        let width = this.props.fullWidth ? {'maxWidth': '100%'} : {'maxWidth': 960 + this.props.gutter+ 'px'};

        Object.assign(gutter, width);

        return (
            <div style={gutter} className="section-container">
                {this.props.children}
            </div>
        );
    }
}

SectionContainer.displayName = displayName;
SectionContainer.propTypes = propTypes;
SectionContainer.defaultProps = {gutter: 0, gutterBottom: 0, fullWidth: false};
