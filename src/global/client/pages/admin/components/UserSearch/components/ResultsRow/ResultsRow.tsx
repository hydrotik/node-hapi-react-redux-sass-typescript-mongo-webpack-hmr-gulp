/// <reference path='../../../../../../../../../typings/main.d.ts' />
import { Link } from 'react-router';

/*
    Row include for admin/components/Results/Results.jsx
*/

// Core Imports
import * as React from 'react';

// Styles
import './_ResultsRow.scss';

interface IResultsRowProps {
    linkTo: string;
    data: any;
}

interface IResultsRowState {
}

export class ResultsRow extends React.Component<IResultsRowProps, IResultsRowState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        let rows: React.ReactElement<{}> = this.props.data.map((record: any) => {
                    return (
                        <tr key={record._id}>
                            <td>
                                <Link
                                    className='btn btn-default btn-sm'
                                    to={{ pathname: '/' + this.props.linkTo, query: { id: record._id } }}>
                                    Edit
                                </Link>
                            </td>
                            <td>{record.username}</td>
                            <td>{record.email}</td>
                            <td>{record.isActive.toString()}</td>
                            <td>{record._id}</td>
                        </tr>
                    );
                });

        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
}
