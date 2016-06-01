/// <reference path='../../../../../../../../../typings/index.d.ts' />

// Ported from
// Bezier Tool Canvas Commands Generator
//
// history:
// - 04/03/2011: born!
//
// @author Victoria Kirst

// Core Imports
import * as React from 'react';

// Styles
import './_BezierEditor.scss';

// Page Components


// Interfaces
interface IBezierEditorProps {
    // rotation?: number;
}

interface IBezierEditorState {
    width?: number;
    height?: number;
}


let width: number = 0;
let height: number = 0;

// TODO Properly Type!
let canvas: any;
// TODO Properly Type!
let c: any;

// http://www.victoriakirst.com/beziertool/script.js

export class BezierEditor extends React.Component<IBezierEditorProps, IBezierEditorState> {

    public constructor(props: any = {}) {
        super(props);

        this.state = {
            width: width,
            height: height
        };
    }

    refs: {
        [key: string]: (Element);
        canv: Element;
        wrapper: Element;
    }

    public componentDidMount(): void {

        canvas = this.refs.canv;
        c = canvas.getContext('2d');

        window.addEventListener('resize', this.updateSize);

        setTimeout(this.updateSize, 100);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('resize', this.updateSize);
    }

    public componentDidUpdate(): void {

    }

    public updateSize: any = (e: any): void => {
        width = this.refs.wrapper.clientWidth;
        height = this.refs.wrapper.clientHeight;
        this.setState({ width: width, height: height });

        // this.update();
    };


    public render(): React.ReactElement<{}> {

        return (
            <div ref="wrapper" className="bezier-editor">
            </div>
        );
    }
}
