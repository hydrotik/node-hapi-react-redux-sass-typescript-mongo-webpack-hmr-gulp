/// <reference path='../../../../../../../typings/main.d.ts' />

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
    children?: any;
}

interface IResultsState {
}

export class Results extends React.Component<IResultsProps, IResultsState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
            <div className="table-responsive">
                <table className="table table-striped table-results">
                    { this.props.children }
                </table>
            </div>
        );
    }
}
