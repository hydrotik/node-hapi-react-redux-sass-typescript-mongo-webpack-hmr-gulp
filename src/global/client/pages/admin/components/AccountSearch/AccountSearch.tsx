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
import {Button} from '../../../../components/Button/Button';
import {TextControl} from '../../../../components/TextControl/TextControl';
import CreateNewAccountForm from './components/CreateNewAccountForm/CreateNewAccountForm';
import {Overlay, Modal, ButtonToolbar, ButtonGroup} from 'react-bootstrap';

// Actions
import {IAccountsRequest, IAccountsResponse, getResults, setSortFilter, createNewAsync, createNewShowModal, createNewHideModal} from '../../actions'


// Interfaces
interface IAccountSearchProps {
    dispatch?: (func: any) => void;
    store?: any;
    children?: any;
    routes?: any[];
    data?: any;
    sortFilter: string;
    results?: any;
    addNewAccount?: any;
    location?: any;
    loading?: boolean;
    submitting?: boolean;
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

function mapStateToProps(state : any) : IAccountSearchProps {
    return {
        sortFilter: state.accounts['sortFilter'],
        data: state.accounts['data'],
        addNewAccount: state.accounts['addNewAccount'],
        loading: _.get(state, "accounts.loading", false)
    }
}

@connect(mapStateToProps)
export class AccountSearch extends React.Component<IAccountSearchProps, IAccountSearchState> {
    
    public constructor(props: IAccountSearchProps) {
        super(props);
    }
    
    refs: {
        [key: string]: (Element);
        createnewform: (any);
    }

    static contextTypes: React.ValidationMap<any> = {
      //router: React.PropTypes.func.isRequired
    };

    public componentDidMount(): void {
        const {dispatch} : IAccountSearchProps = this.props
        dispatch(getResults({}))
    }

    public getData(): any {
        switch(this.props.sortFilter) {
            case "name":
                return this.props.data.sort(this.rowSortHelper(false, (x) => { return x.name.first + ' ' + x.name.last}))
            case "_id":
                return this.props.data.sort(this.sortHelper(this.props.sortFilter, false, parseInt))
            
            case "-name":
                return this.props.data.sort(this.rowSortHelper(true, (x) => { return x.name.first + ' ' + x.name.last}))
            case "-_id":
                return this.props.data.sort(this.sortHelper(this.props.sortFilter, true, parseInt))
        }
        return this.props.data
    }
    
    //public context: IRouterContext;

    public onFiltersChange(e): void {
        const {dispatch}: IAccountSearchProps = this.props;
        dispatch(setSortFilter(e.target.value));
    }

    public onNewClick(): void {
        const {dispatch}: IAccountSearchProps = this.props;
        dispatch(createNewShowModal())
    }
    
    public onCancelClick(): void {
        const {dispatch}: IAccountSearchProps = this.props;
        dispatch(createNewHideModal());
    }

    public sortHelper(field, reverse, primer) {
       let key = primer ? function(x) {return primer(x[field])} : function(x) {return x[field]};
       reverse = !reverse ? 1 : -1;
       return function (a, b) {
           return a = key(a), b = key(b), reverse * (+(a > b) - +(b > a));
         } 
    }
    public rowSortHelper(reverse, primer) {
       let key = function(x) {return primer(x)}
       reverse = !reverse ? 1 : -1;
       return function (a, b) {
           return a = key(a), b = key(b), reverse * (+(a > b) - +(b > a));
         } 
    }

    createNew() {
        this.refs.createnewform.submit();
    }
    
    createNewOnSubmit(values) {
        const {dispatch} : IAccountSearchProps = this.props;
        const {lastName, firstName, middleName} = values;
        
        return dispatch(createNewAsync({last: lastName, first: firstName, middle: middleName}));
    }
    
    hideModal() {
        
    }
    
    public render(): React.ReactElement<{}> {

        let { query } = this.props.location;

        let loading: boolean = false;

        return (
            <section className='section-accounts container'>
            
                
                <Modal show={this.props.addNewAccount && this.props.addNewAccount.active} onHide={this.hideModal.bind(this)}>
                         <Modal.Header>
                             <Modal.Title>Create new</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                            <CreateNewAccountForm 
                                ref={"createnewform"}
                                onSubmit={this.createNewOnSubmit.bind(this)}
                                {...this.props} />
                            <ButtonToolbar>
                            <ButtonGroup>
                            <Button
                                type={"submit"}
                                inputClasses={{"btn-primary": true}}
                                name={"create"}
                                value={"Create new"}
                                onClick={this.createNew.bind(this)}
                                disabled={this.props.submitting}>
                                Create new
                            </Button>
                            </ButtonGroup>
                            <ButtonGroup>
                            <Button
                                type={"submit"}
                                inputClasses={{"btn-default": true}}
                                name={"cancel"}
                                value={"Cancel"}
                                onClick={this.onCancelClick.bind(this)}
                                disabled={this.props.submitting}>
                                Cancel
                            </Button>
                            </ButtonGroup>
                            </ButtonToolbar>
                         </Modal.Body>
                     </Modal>
                    
                <div className='page-header'>
                    <button
                        ref='createNew'
                        className='btn btn-default pull-right'
                        onClick={this.onNewClick.bind(this)}>
                        Create new
                    </button>
                    <h1>Accounts</h1>
                </div>
                <FilterForm
                    ref='filters'
                    query={query}
                    loading={loading}
                    onChange={this.onFiltersChange.bind(this)}>
                        <FilterFormRow />
                </FilterForm>
                <Results waiting={this.props.loading}>
                    <ResultsHead />
                    <ResultsRow linkTo='admin/accounts' data={this.getData()}/>
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



