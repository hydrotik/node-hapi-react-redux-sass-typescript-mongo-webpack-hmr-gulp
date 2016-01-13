/// <reference path='../../../../../../../typings/tsd.d.ts' />

import * as React from 'react';

import './_CarouselItem.scss';

interface ICarouselItem {
    item?: any;
}

/**
 * @class CarouselItem
 * @augments {React.Component}
 */
export class CarouselItem extends React.Component<ICarouselItem, {}> {

    public constructor() {
        super();
        this.onItemClick = this.onItemClick.bind(this);
    }

    public render(): React.ReactElement<{}> {

        const divStyle: Object = {
            backgroundImage: 'url(' + this.props.item.src + ')'
        };

        return (
            <div className='carouselitem' style={divStyle}>
                <div onClick={this.onItemClick} className='carouselitem__link'>
                    <div className='carouselitem__link__content'>
                        <h2 className='carouselitem__link__content__heading'>
                            {this.props.item.title}
                        </h2>
                        <p>{this.props.item.description}</p>
                    </div>
                </div>
            </div>
        );
    }

    private onItemClick(e: any): void {
        e.preventDefault();
        window.alert('You clicked ' + this.props.item.href);
    }
}
