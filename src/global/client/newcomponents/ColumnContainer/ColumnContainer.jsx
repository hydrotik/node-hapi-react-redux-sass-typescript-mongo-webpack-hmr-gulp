import './_ColumnContainer.scss';
import React from 'react';

const { Component } = React;

const displayName = 'ColumnContainer';

const propTypes = {
    children: React.PropTypes.node
};

/**
 * @class ColumnContainer
 * @augments {React.Component}
 */
export default class ColumnContainer extends Component {
    render() {
        return (
            <div className="columncontainer">
                {this.props.children}
            </div>
        );
    }
}

ColumnContainer.displayName = displayName;
ColumnContainer.propTypes = propTypes;
