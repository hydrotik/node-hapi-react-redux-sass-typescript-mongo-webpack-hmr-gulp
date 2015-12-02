import './_ContentRow.scss';
import React from 'react';

const { Component, PropTypes } = React;

const displayName = 'ContentRow';

const propTypes = {
    children: PropTypes.node
};

/**
 * @class ContentRow
 * @augments {React.Component}
 */
class ContentRow extends Component {

    render() {

        const base = 'contentrow',
            layouttype = this.props.layouttype;
        let mod;

        switch (layouttype) {

            case 'column':
                mod = 'contentrow__doublecolumn';
                break;

            case 'wrap':
                mod = 'contentrow__singlecoumn';
                break;

            case 'full':
                mod = 'contentrow__full';
                break;

            default:
                mod = 'contentrow__full';
        }

        const cn = base + ' ' + mod;

        return (
            <div className={cn}>
                {this.props.children}
            </div>
        );
    }
}

ContentRow.displayName = displayName;
ContentRow.propTypes = propTypes;

export default ContentRow;
