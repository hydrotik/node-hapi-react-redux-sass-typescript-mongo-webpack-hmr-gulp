/// <reference path='../../../../../../../typings/main.d.ts' />

/*
    Maps to components/accounts/Search.jsx
*/

// Core Imports
import * as React from 'react';
import {connect, Provider} from 'react-redux';

// Styles
import './_AccountSearch.scss';

// Components
import { Results } from '../Results/Results';
import { FilterForm } from '../FilterForm/FilterForm';

import { ResultsHead } from './components/ResultsHead/ResultsHead';
import { ResultsRow } from './components/ResultsRow/ResultsRow';
import { FilterFormRow } from './components/FilterFormRow/FilterFormRow';

// Actions
import {IAccountsRequest, IAccountsResponse, getResults, setSortFilter} from '../../actions'


// Interfaces
interface IAccountSearchProps {
    dispatch?: (func: any) => void;
    store?: any;
    children?: any;
    routes?: any[];
    data?: any;
    sortFilter: string;
    results?: any;

    location?: any;
}

interface IAccountSearchState {
    data?: any[];
}

interface IRouter {
    getCurrentQuery(): any;
}

interface IRouterContext {
    router: IRouter;
}

const MockData: any[] = [
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

function mapStateToProps(state : any) : IAccountSearchProps {
    return {
        sortFilter: state.accounts['sortFilter'],
        data: state.accounts['data']
    }
}

@connect(mapStateToProps)
export class AccountSearch extends React.Component<IAccountSearchProps, IAccountSearchState> {

    public constructor(props: IAccountSearchProps) {
        super(props);
        this.state = {
            data: MockData
        };
    }

    static contextTypes: React.ValidationMap<any> = {
      router: React.PropTypes.func.isRequired
    };

    public componentDidMount(): void {
        const {dispatch} : IAccountSearchProps = this.props
        dispatch(getResults({}))
    }

    public getData(): any {
        switch(this.props.sortFilter) {
            case "username":
                return this.props.data.sort(this.sortHelper(this.props.sortFilter, false, function(a){return a.toUpperCase()}))
            case "_id":
                return this.props.data.sort(this.sortHelper(this.props.sortFilter, false, parseInt))
            
            case "-username":
                return this.props.data.sort(this.sortHelper(this.props.sortFilter, true, function(a){return a.toUpperCase()}))
            case "-_id":
                return this.props.data.sort(this.sortHelper(this.props.sortFilter, true, parseInt))
        }
        return this.props.data
    }
    
    public context: IRouterContext;

    public onFiltersChange: any = (event: any): void => {
        const {dispatch} : IAccountSearchProps = this.props
        dispatch(setSortFilter(event.target.value))
        console.warn('AccountSearch :: onFiltersChange()');
        console.warn(event.target.name + ': ' + event.target.value);
        
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        let delta;

        switch(event.target.value){
            case '_id':
                delta = this.state.data.sort(this.sortHelper('_id', false, parseInt));
                break;
            case '-_id':
                delta = this.state.data.sort(this.sortHelper('_id', true, parseInt));
                break;
            case 'username':
                delta = this.state.data.sort(this.sortHelper('username', false, function(a){return a.toUpperCase()}));
                break;
            case '-username':
                delta = this.state.data.sort(this.sortHelper('username', true, function(a){return a.toUpperCase()}));
                break;
        } 

        console.warn(delta);

        this.setState({data : delta});

        // this.context.router.transitionTo('accounts', {}, this.refs.filters.state);
        window.scrollTo(0, 0);
    }

    public onNewClick(): void {
        // Actions.showCreateNew();
    }

    public sortHelper(field, reverse, primer) {
       let key = primer ? function(x) {return primer(x[field])} : function(x) {return x[field]};
       reverse = !reverse ? 1 : -1;
       return function (a, b) {
           return a = key(a), b = key(b), reverse * (+(a > b) - +(b > a));
         } 
    }

    public render(): React.ReactElement<{}> {

        let { query } = this.props.location;

        let loading: boolean = false;

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
                    <ResultsRow linkTo='accounts' data={this.getData()}/>
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
AccountSearch.contextTypes = {
    store: React.PropTypes.object
}


