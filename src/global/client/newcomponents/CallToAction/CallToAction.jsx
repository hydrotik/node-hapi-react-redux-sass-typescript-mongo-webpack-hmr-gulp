import './_CallToAction.scss';
import React from 'react';

const { Component, PropTypes } = React;

const propTypes = {
    position: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string,
    clickAreaAll: PropTypes.bool
};

const displayName = 'CallToAction';

/**
 * @class CallToAction
 * @augments {React.Component}
 */
export default class CallToAction extends Component {

    render() {

        const containernames = 'call-to-action';
        const ctacontainer = 'cta-container';
        const button = 'cta-button';
        const hitArea = 'hit-area';
        const actionAll = (
            <div className={ctacontainer}>
                <a className={hitArea} href={this.props.href}>
                    <div className={containernames + ' ' + this.props.position + ' ' + this.props.color}>
                        <div className={button}>{this.props.label}</div>
                        <div>{this.props.description}</div>
                    </div>
                </a>
            </div>
        );
        const actionLink = (
            <div className={ctacontainer}>
                <div className={containernames + ' ' + this.props.position + ' ' + this.props.color}>
                    <a href={this.props.href} className={button} target={this.props.target}>{this.props.label}</a><br />
                    <div>{this.props.description}</div>
                </div>
            </div>
        );

        return this.props.clickAreaAll ? ( actionAll ) : ( actionLink );
    }
}

CallToAction.displayName = displayName;
CallToAction.propTypes = propTypes;
CallToAction.defaultProps = {position: 'center middle', color: 'light', label: 'Shop Now', clickAreaAll: false};
