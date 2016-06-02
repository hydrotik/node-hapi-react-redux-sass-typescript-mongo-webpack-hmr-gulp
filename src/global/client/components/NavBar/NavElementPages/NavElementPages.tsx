/// <reference path='../../../../../../typings/index.d.ts' />

import * as React from 'react';
import { map } from 'lodash';
import * as ClassNames from 'classnames';

import * as activeComponent from 'react-router-active-component';

let ac: any = activeComponent;
const NavLink: any = ac('li');

interface INavElementPages {
    pages?: any
    navBarOpen?: boolean
}

export class NavElementPages extends React.Component<INavElementPages, {}> {
    constructor(props: INavElementPages) {
        super(props);

    }

    public createNavItem(object: any, i: number): any {
        if( object.hasOwnProperty('onlyActiveOnIndex') && object.onlyActiveOnIndex ){
            return <NavLink onlyActiveOnIndex to={object.path} key={i}>{object.title}</NavLink>;
        }else{
            return <NavLink to={object.path} key={i}>{object.title}</NavLink>;
        }
    }

    public render() : React.ReactElement<{}> {
        let {navBarOpen} = this.props;

        let navBarCollapse: any = ClassNames({
            'navbar-collapse': !navBarOpen,
            collapse: !navBarOpen
        });

        return (
            <ul className="nav navbar-nav">
                { map(this.props.pages, this.createNavItem) }
            </ul>
        )
    }
}

