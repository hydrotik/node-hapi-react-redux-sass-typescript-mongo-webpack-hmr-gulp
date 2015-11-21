/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react';
import './_CallToAction.scss';

interface ICallToAction {
    position?: string;
    href?: string;
    target?: string;
    description?: string;
}

/**
 * @class CallToAction
 * @augments {React.Component}
 */
export class CallToAction extends React.Component<ICallToAction, {}> {

    public render(): React.ReactElement<{}> {

        const base: string = 'wrapper';

        const containernames: string = base + ' wrapper--' + this.props.position;

        const buttonnames: string = 'button btn btn--s btn--saks-border';


        return (
            <div className={containernames}>
                <a href={this.props.href} target={this.props.target} className={buttonnames}>Shop Now</a><br />
                <span>{this.props.description}</span>
            </div>
        );
    }
}
