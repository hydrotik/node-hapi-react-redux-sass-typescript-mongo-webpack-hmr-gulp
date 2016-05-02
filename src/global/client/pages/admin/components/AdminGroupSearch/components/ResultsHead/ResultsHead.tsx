/// <reference path='../../../../../../../../../typings/main.d.ts' />
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
                    <th>id</th>
                    <th className="stretch">name</th>
                </tr>
            </thead>
        );
    }
}
