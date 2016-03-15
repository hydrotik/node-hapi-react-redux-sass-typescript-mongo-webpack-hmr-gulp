/// <reference path='../../../../../../../../../typings/tsd.d.ts' />
import { Link } from 'react-router';

/*
    Head include for admin/components/Results/Results.jsx
*/

// Core Imports
import * as React from 'react';

// Styles
import './_ResultsHead.scss';

interface IResultsHeadProps {
}

interface IResultsHeadState {
}

export class ResultsHead extends React.Component<IResultsHeadProps, IResultsHeadState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
            <thead>
                <tr>
                    <th></th>
                    <th>username</th>
                    <th className="stretch">email</th>
                    <th>active</th>
                    <th>id</th>
                </tr>
            </thead>
        );
    }
}
