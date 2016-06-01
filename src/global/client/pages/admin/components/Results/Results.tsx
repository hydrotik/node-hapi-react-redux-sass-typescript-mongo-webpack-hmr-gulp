/// <reference path='../../../../../../../typings/index.d.ts' />

import { Link } from 'react-router';
import { Glyphicon } from 'react-bootstrap';
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
    waiting?: boolean;
    waitingIcon?: string;
}

interface IResultsState {
}

export class Results extends React.Component<IResultsProps, IResultsState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {
        if (this.props.waiting) {
            return (
                <div className="table-responsive">
                    <Glyphicon className="waiting" glyph={this.props.waitingIcon || "cog"} />
                </div>
            )
        }
        else {
            return (

                <div className="table-responsive">
                    <table className="table table-striped table-results">
                        { this.props.children }
                    </table>
                </div>

            );
        }
        
    }
}
