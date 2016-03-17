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
import { FilterFormRow } from './components/FilterFormRow/FilterFormRow';

// Interfaces
interface IAccountSearchProps {
    children?: any;
    routes?: any[];
    data?: any;

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

let testData: any[] = [
    {
        _id : '12345004',
        username: 'superman',
        name: {
            first: 'Super',
            last: 'Man'
        }
    },
    {
        _id : '12345001',
        username: 'johnsmith',
        name: {
            first: 'John',
            last: 'Smith'
        }
    },
    {
        _id : '12345002',
        username: 'jamesdoe',
        name: {
            first: 'James',
            last: 'Doe'
        }
    },
    {
        _id : '12345003',
        username: 'fredalan',
        name: {
            first: 'Fred',
            last: 'Alan'
        }
    }
];

export class AccountSearch extends React.Component<IAccountSearchProps, IAccountSearchState> {

    public constructor(props: IAccountSearchProps) {
        super(props);
    }

    public componentDidMount(): void {

    }

    public context: IRouterContext;

    public onFiltersChange: any = (event: any): void => {

        console.warn('AccountSearch :: onFiltersChange()');
        console.warn(event.target.name + ': ' + event.target.value);

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
        // let HeadComponent: React.ReactElement<{}> = <ResultsHead />;
        // let RowComponent: React.ReactElement<{}> = <ResultsRow linkTo='accounts' data={testData} />

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
                    ref='filters'
                    query={query}
                    loading={loading}
                    onChange={this.onFiltersChange}>
                        <FilterFormRow />
                </FilterForm>
                <Results>
                    <ResultsHead />
                    <ResultsRow linkTo='accounts' data={testData} />
                </Results>
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
