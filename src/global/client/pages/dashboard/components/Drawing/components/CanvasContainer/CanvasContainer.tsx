/// <reference path='../../../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_CanvasContainer.scss';

// Page Components


// Interfaces
interface ICanvasContainerPageProps {
    rotation?: number;
}

interface ICanvasContainerPageState {

}

export class CanvasContainer extends React.Component<ICanvasContainerPageProps, ICanvasContainerPageState> {

    public constructor(props: any = {}) {
        super(props);
    }

    refs: {
        [key: string]: (Element);
        canv: any;
    }

    public componentDidMount(): void {
        let context = this.refs.canv.getContext('2d');
        this.paint(context);
    }

    public componentWillUnmount(): void {

    }

    public componentDidUpdate(): void {
        let context = this.refs.canv.getContext('2d');
        context.clearRect(0, 0, 200, 200);
        this.paint(context);
    }


    public paint(context): void {
        context.save();
        context.translate(100, 100);
        context.rotate(this.props.rotation, 100, 100);
        context.fillStyle = '#F00';
        context.fillRect(-50, -50, 100, 100);
        context.restore();
    }

    public render(): React.ReactElement<{}> {

        return (
            <canvas ref="canv" width={200} height={200} />
        );
    }
}
