/// <reference path="../../../../../typings/tsd.d.ts" />

import './_ParallaxContainer.scss';
import Parallax from 'react-parallax';
import React from 'react';

import SparkScroll from 'react-spark-scroll';

export interface IParallaxContainerProps {
    width: number;
    height: number;
    url: string;
    gutter?: number;
}

/**
 * @class ContentRow
 * @augments {React.Component}
 */
export class ParallaxContainer extends React.Component<IParallaxContainerProps, {}> {

    public constructor(props: IParallaxContainerProps) {
        super(props);

    }

    public render(): React.ReactElement<{}> {

        const contextTypes = {
            a: React.PropTypes.string
        };

        const childContextTypes = {
            b: React.PropTypes.string
        };

        let getChildContext = function getChildContext() {
            return {
                b: this.props.b
            };
        };


        let ratioadjustment = (( this.props.height / this.props.width ) * 100);
        //let gutter = this.props.gutter ? {'margin': this.props.gutter + 'px ' + this.props.gutter / 2 + 'px'} : {};
        let gutter2 = this.props.gutter ? {
            'left': this.props.gutter / 2 + 'px',
            'right': this.props.gutter / 2 + 'px',
            'bottom': this.props.gutter / 2 + 'px',
            'top': this.props.gutter / 2 + 'px'
        } : {};
        //let gutter3 = this.props.gutterBottom;

        const containernames = 'parallax-container';

        return (
            <div className={containernames}>
                <div className='background-ratio-adjustment' style={{ 'paddingTop':ratioadjustment + '%' }}></div>
                <div className='background-image-container' style={gutter2}>
                    <div className='gutter-spacing' /*style={ gutter }*/>
                        <div className='background-image' style={{ 'backgroundImage':'url(' + this.props.url +')' }}></div>
                    </div>
                </div>
            </div>
        );
    }
}
