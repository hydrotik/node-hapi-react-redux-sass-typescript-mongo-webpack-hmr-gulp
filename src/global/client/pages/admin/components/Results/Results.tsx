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
    children?: any;
    routes?: any[];

    parentSection: string;
    data: any;
}

interface IResultsState {
}

export class Results extends React.Component<IResultsProps, IResultsState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        let linkTo: string;
        let rows: React.ReactElement<{}>;
        let head: React.ReactElement<{}>;

        switch(this.props.parentSection){
            case 'accounts':
                console.log('loading Results.tsx for accounts');
                linkTo = 'admin/accounts';
                rows = this.props.data.map(function (record) {
                    return (
                        <tr key={record._id}>
                            <td>
                                <Link
                                    className='btn btn-default btn-sm'
                                    to={{ pathname: '/' + linkTo, query: { id: record._id } }}>
                                    Edit
                                </Link>
                            </td>
                            <td>{record.name.first} {record.name.last}</td>
                            <td>{record._id}</td>
                        </tr>
                    );
                });
                head = (
                    <tr>
                        <th></th>
                        <th className="stretch">name</th>
                        <th>id</th>
                    </tr>
                );
                break;
            case 'admin-groups':
                console.log('loading Results.tsx for admin-groups');
                linkTo = 'adminGroupDetails';
                rows = this.props.data.map(function (record) {
                    return (
                        <tr key={record._id}>
                            <td>
                                <Link
                                    className='btn btn-default btn-sm'
                                    to={{ pathname: '/' + linkTo, query: { id: record._id } }}>
                                    Edit
                                </Link>
                            </td>
                            <td>{record._id}</td>
                            <td>{record.name}</td>
                        </tr>
                    );
                });
                head = (
                    <tr>
                        <th></th>
                        <th>id</th>
                        <th className="stretch">name</th>
                    </tr>
                );
                break;
            case 'admins':
                console.log('loading Results.tsx for admins');
                linkTo = 'adminDetails';
                rows = this.props.data.map(function (record) {
                    return (
                        <tr key={record._id}>
                            <td>
                                <Link
                                    className='btn btn-default btn-sm'
                                    to={{ pathname: '/' + linkTo, query: { id: record._id } }}>
                                    Edit
                                </Link>
                            </td>
                            <td>{record.name.first} {record.name.last}</td>
                            <td>{record._id}</td>
                        </tr>
                    );
                });
                head = (
                    <tr>
                        <th></th>
                        <th className="stretch">name</th>
                        <th>id</th>
                    </tr>
                );
                break;
            case 'statuses':
                console.log('loading Results.tsx for statuses');
                linkTo = 'statusDetails';
                rows = this.props.data.map(function (record) {
                    return (
                        <tr key={record._id}>
                            <td>
                                <Link
                                    className='btn btn-default btn-sm'
                                    to={{ pathname: '/' + linkTo, query: { id: record._id } }}>
                                    Edit
                                </Link>
                            </td>
                            <td>{record.pivot}</td>
                            <td>{record.name}</td>
                            <td className="nowrap">{record._id}</td>
                        </tr>
                    );
                });
                head = (
                    <tr>
                        <th></th>
                        <th>pivot</th>
                        <th className="stretch">name</th>
                        <th>id</th>
                    </tr>
                );
                break;
            case 'users':
                console.log('loading Results.tsx for users');
                linkTo = 'userDetails';
                rows = this.props.data.map(function (record) {
                    return (
                        <tr key={record._id}>
                            <td>
                                <Link
                                    className='btn btn-default btn-sm'
                                    to={{ pathname: '/' + linkTo, query: { id: record._id } }}>
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
                head = (
                    <tr>
                        <th></th>
                        <th>username</th>
                        <th className="stretch">email</th>
                        <th>active</th>
                        <th>id</th>
                    </tr>
                );
                break;
            default :
                console.warn('Results.tsx parentSection property doesn\'t match a section');
                break;
        }

        return (
            <div className="table-responsive">
                <table className="table table-striped table-results">
                    <thead>
                        {head}
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}
