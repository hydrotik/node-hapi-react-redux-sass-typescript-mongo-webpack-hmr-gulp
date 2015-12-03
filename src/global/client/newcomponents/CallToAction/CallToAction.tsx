/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react';
import './_CallToAction.scss';

interface ICallToActionProps {
    position?: string;
    href?: string;
    target?: string;
    description?: string;
    label?: string;
    color?: string;
    clickAreaAll?: boolean;
}

/**
 * @class CallToAction
 * @augments {React.Component}
 */
export class CallToAction extends React.Component<ICallToActionProps, {}> {

    public constructor(props: ICallToActionProps) {
        super(props);

        this.props = { position: 'center middle', color: 'light', label: 'Shop Now', clickAreaAll: false };
    }

    public render(): React.ReactElement<{}> {
        const containernames: string = 'call-to-action';
        const ctacontainer: string = 'cta-container';
        const button: string = 'cta-button';
        const hitArea: string = 'hit-area';
        const actionAll: React.ReactElement<{}> = (
            <div className={ctacontainer}>
                <a className={hitArea} href={this.props.href}>
                    <div className={containernames + ' ' + this.props.position + ' ' + this.props.color}>
                        <div className={button}>{this.props.label}</div>
                        <div>{this.props.description}</div>
                    </div>
                </a>
            </div>
        );
        const actionLink: React.ReactElement<{}> = (
            <div className={ctacontainer}>
                <div className={containernames + ' ' + this.props.position + ' ' + this.props.color}>
                    <a href={this.props.href} className={button} target={this.props.target}>{this.props.label}</a><br />
                    <div>{this.props.description}</div>
                </div>
            </div>
        );

        return this.props.clickAreaAll ? (actionAll) : (actionLink);
    }
}
