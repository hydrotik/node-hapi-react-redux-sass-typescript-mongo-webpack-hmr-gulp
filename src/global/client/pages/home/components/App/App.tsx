/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
import { connect } from 'react-redux';

// Styles
import './_App.scss';

// Page Components
import { Header } from '../Header/Header';
import { Footer } from '../../../../components/Footer/Footer';
import { Carousel } from '../Carousel/Carousel';
import { Strip } from '../Strip/Strip';
import { TextControl } from 'components/BaseUIKitSamples/TextControl/TextControl'
import { Button } from 'components/BaseUIKitSamples/Button/Button'

// Behaviors and Actions
import { fetchContentIfNeeded, EDITORIAL, IEditorialAction} from '../../actions';

// Interfaces
interface IAppProps {
    dispatch?: (func: any) => void;
    isFetching?: boolean;
    lastUpdated?: number;
    editorial?: any;
    store?: any;
}
interface IAppState {
    editorial?: any;
    isFetching?: boolean;
    lastUpdated?: number;
}

// Decorators
function select(state: { editorialContent: IEditorialAction; }): IAppState {
    const { editorialContent }: { editorialContent: IEditorialAction; } = state;
    const {
        isFetching,
        lastUpdated,
        editorial
    }: IEditorialAction = editorialContent;

    return {
        editorial,
        isFetching,
        lastUpdated
    };
}

@connect(select)
export class App extends React.Component<IAppProps, IAppState> {

    public constructor(props: any) {
        super(props);
    }

    public componentDidMount(): void {
        const {dispatch}: IAppProps = this.props;
        dispatch(fetchContentIfNeeded(EDITORIAL));
    }

    public render(): React.ReactElement<{}> {
        return (
            <div className = 'app'>
                <form className={"centered grid__column--6"}>
                    <legend>Some Poly UI Kit Examples</legend>
                    <TextControl name={"someText"} placeholder={"Put something here..."} disabled={false} label={"Type stuff"} />
                    <Button type={"button"} name={"someBtn"}>Click ME</Button>
                </form>
            </div>
        );
    }
}
