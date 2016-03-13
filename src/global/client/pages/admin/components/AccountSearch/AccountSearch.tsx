/// <reference path='../../../../../../../typings/tsd.d.ts' />

/*
    Maps to components/accounts/Search.jsx
*/

// Core Imports
import * as React from 'react';

// Styles
import './_AccountSearch.scss';

// Components
import { Results } from '../Results/Results';

// Interfaces
interface IAccountSearchProps {
    children?: any;
    routes?: any[];
}

interface IAccountSearchState {
}

const testData: any[] = [
    {
        _id : '12345001',
        name: {
            first: 'John',
            last: 'Smith'
        }
    },
    {
        _id : '12345002',
        name: {
            first: 'James',
            last: 'Doe'
        }
    },
    {
        _id : '12345003',
        name: {
            first: 'Fred',
            last: 'Allen'
        }
    }
];

export class AccountSearch extends React.Component<IAccountSearchProps, IAccountSearchState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
            <section className="section-accounts container">
                <div className="page-header">
                    {/*<button
                        ref="createNew"
                        className="btn btn-default pull-right"
                        onClick={this.onNewClick}>

                        Create new
                    </button>*/}
                    <h1>Accounts</h1>
                </div>
                {/*<FilterForm
                    ref="filters"
                    query={this.context.router.getCurrentQuery()}
                    loading={this.state.results.loading}
                    onChange={this.onFiltersChange}
                />*/}
                <Results parentSection='accounts' data={testData} />
                {/*<Paging
                    ref="paging"
                    pages={this.state.results.pages}
                    items={this.state.results.items}
                    loading={this.state.results.loading}
                    onChange={this.onPageChange}
                />
                <CreateNewForm data={this.state.createNew} />*/}
            </section>
        );
    }
}
