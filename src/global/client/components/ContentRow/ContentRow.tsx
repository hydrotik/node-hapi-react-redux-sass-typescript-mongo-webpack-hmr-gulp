/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react';
import { CallToAction } from '../CallToAction/CallToAction';
import * as ReactPicture from 'react-picture';

import './_ContentRow.scss';

const Img: any = ReactPicture.BaseImage;

export interface IContentRowProps {
    children?: any;
    layouttype?: string;
    type?: any;
    key?: number;
    contents?: any;
}

/**
 * @class ContentRow
 * @augments {React.Component}
 */
export class ContentRow extends React.Component<IContentRowProps, {}> {

    public render(): React.ReactElement<{}> {

        let output: any = null;
        const base: string = 'contentrow',
            layouttype: string = this.props.layouttype;
        let mod: string;

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

        const cn: string = base + ' ' + mod;
        // console.log(Array.isArray(this.props.children)); // => false

        if (!this.props.contents) {
            output = (<div className={cn}>{ this.props.children }</div>); // createFragment();
        } else {

            const {
                position,
                href,
                target,
                description,
                images
            }: {
                position: string;
                href: string;
                target: string;
                description: string;
                images: any[]
            } = this.props.contents;

            let imgs: string = '';

            for (let i: number = 0; i < images.length; i++) {
                imgs = imgs + images[0].src + ' ' + images[0].width + ((i < images.length - 1) ? ', ' : '');
            }
            output = (<div className={cn}>
                <CallToAction
                    position={position}
                    href={href}
                    target={target}
                    description={description} />
                <Img alt='Your picture description' srcSet={imgs} extra={{ width: '100%', height: '100%' }} />
            </div>);
        }

        return output;
    }
}
