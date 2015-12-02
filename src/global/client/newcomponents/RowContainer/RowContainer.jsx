import './_RowContainer.scss';
import React from 'react';

const { Component } = React;

const displayName = 'RowContainer';

const propTypes = {
    children: React.PropTypes.node
};

/**
 * @class ContentRow
 * @augments {React.Component}
 */
export default class RowContainer extends Component {
    render() {
        return (
            <div className="rowcontainer">
                {this.props.children}
            </div>
        );
    }
}

RowContainer.displayName = displayName;
RowContainer.propTypes = propTypes;

