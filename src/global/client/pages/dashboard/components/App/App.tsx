/// <reference path='../../../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_App.scss';

// Page Components
import { NavBar as NavBary } from '../../../../components/NavBar/NavBar';
import { SideNavigation } from '../SideNavigation/SideNavigation';
import { Footer } from '../../../../components/Footer/Footer';
import {NavElementCustom} from '../NavElementCustom/NavElementCustom';

// Interfaces

interface IAppProps {
    children?: any;
    routes?: any[];
}

interface IAppState {
}

export const Sections: any = {
    Home: {
        title: 'Dashboard Home',
        path: '/dashboard',
        onlyActiveOnIndex: true
    }
};

export class App extends React.Component<IAppProps, IAppState> {

    public constructor(props: any) {
        super(props);
    }


    public render(): React.ReactElement<{}> {

        return (
            <div className='wrapper'>
                <NavBary pages={Sections} navStyle='navbar-inverse'>
                    <NavElementCustom {...this.props} />
                </NavBary>
                <SideNavigation />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}
