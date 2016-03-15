/// <reference path='../../../../../../../typings/tsd.d.ts' />

import { Link } from 'react-router';

/*
    Maps to components/[section]/Results.jsx

    Router upgrade info:
    http://stackoverflow.com/questions/30115324/pass-props-in-link-react-router
*/

// Core Imports
import * as React from 'react';

// Styles
import './_Results.scss';

interface IResultsProps {
    // children?: any;
    // routes?: any[];

    // parentSection: string;
    // data: any;

    rowComponent: React.ReactElement<{}>;
    headComponent: React.ReactElement<{}>;
}

interface IResultsState {
}

export class Results extends React.Component<IResultsProps, IResultsState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        let linkTo: string;
        
        let head: React.ReactElement<{}> = this.props.headComponent;

        let rows: React.ReactElement<{}> = this.props.rowComponent;

        return (
            <div className="table-responsive">
                <table className="table table-striped table-results">
                    {head}
                    {rows}
                </table>
            </div>
        );
    }
}
