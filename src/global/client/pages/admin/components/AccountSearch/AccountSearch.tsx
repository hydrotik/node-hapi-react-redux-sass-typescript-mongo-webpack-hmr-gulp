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
import { FilterForm } from '../FilterForm/FilterForm';

import { ResultsHead } from './components/ResultsHead/ResultsHead';
import { ResultsRow } from './components/ResultsRow/ResultsRow';

// Interfaces
interface IAccountSearchProps {
    children?: any;
    routes?: any[];

    results?: any;

    location?: any;
}

interface IAccountSearchState {
}

interface IRouter {
    getCurrentQuery(): any;
}

interface IRouterContext {
    router: IRouter;
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

    public constructor(props: IAccountSearchProps) {
        super(props);
    }

    public context: IRouterContext;

    public onFiltersChange(event: any): void {

        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        // this.context.router.transitionTo('accounts', {}, this.refs.filters.state);
        window.scrollTo(0, 0);
    }

    public onNewClick(): void {
        // Actions.showCreateNew();
    }

    public render(): React.ReactElement<{}> {

        let { query } = this.props.location;

        let loading: boolean = false;

        //
        let HeadComponent: React.ReactElement<{}> = <ResultsHead />;
        let RowComponent: React.ReactElement<{}> = <ResultsRow linkTo='accounts' data={testData} />

        return (
            <section className='section-accounts container'>
                <div className='page-header'>
                    <button
                        ref='createNew'
                        className='btn btn-default pull-right'
                        onClick={(e: any) => this.onNewClick}>
                        Create new
                    </button>
                    <h1>Accounts</h1>
                </div>
                <FilterForm
                    parentSection='accounts'
                    ref='filters'
                    query={query}
                    loading={loading}
                    onChange={(e: any) => this.onFiltersChange}
                />
                <Results headComponent={HeadComponent} rowComponent={RowComponent}  />
                {/*<Paging
                    ref='paging'
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
