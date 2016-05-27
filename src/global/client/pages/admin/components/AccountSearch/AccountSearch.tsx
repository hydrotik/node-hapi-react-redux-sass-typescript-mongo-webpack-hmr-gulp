/// <reference path='../../../../../../../typings/index.d.ts' />

/*
    Maps to components/accounts/Search.jsx
*/

// Core Imports
import * as React from 'react';
import {connect, Provider} from 'react-redux';
import * as _ from 'lodash';

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
import {CreateNewAccountForm} from '../../components/CreateNewAccountForm';
import {Overlay, Modal, ButtonToolbar, ButtonGroup} from 'react-bootstrap';

// Actions
import {showAddNew, hideAddNew, list, create, setSortFilter} from './actions';

import {REDUCER_NAME} from './reducers';

// Interfaces
interface IAccountSearchProps {
    dispatch?: (func: any) => void;
    store?: any;
    children?: any;
    routes?: any[];
    data?: any;
    sortFilter: string;
    results?: any;
    addNew?: any;
    location?: any;
    loading?: boolean;
    submitting?: boolean;
    onLoadAccounts?: () => any
    onHideModal?: (any) => any
    onShowModal?: (any) => any
    onCreateNewSubmit?: (any) => any
    onFiltersChange?: (any) => any
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
        addNew: _.get(state, REDUCER_NAME+'.addNew', {visible: false}), 
        sortFilter: _.get(state, REDUCER_NAME+'.sortFilter', ""),
        data: _.get(state, REDUCER_NAME+'.data', []),
        loading: _.get(state, REDUCER_NAME+'.loading', false),
    }
}

const mapDispatchToProps = (dispatch) : any => {
    return {
        onHideModal: function(e: any) {
            return dispatch(hideAddNew());
        },
        
        onShowModal: function(e: any) {
            return dispatch(showAddNew());
        },
        
        onCreateNewSubmit: function(data: { name: { lastName: string, middleName: string, firstName: string } } ) {
            return dispatch(create(data.name))
            .then(
                (result) => {
                    dispatch(hideAddNew());
                    return dispatch(list());
                }
            )
        },
        
        onFiltersChange: function(e) {
            dispatch(setSortFilter(e.target.value));
        },
        
        onLoadAccounts: function() {
            return dispatch(list());
        }
    }
}

class Container extends React.Component<IAccountSearchProps, IAccountSearchState> {
    
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
        const {onLoadAccounts} : IAccountSearchProps = this.props
        onLoadAccounts();
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
    
    public render(): React.ReactElement<{}> {

        const {
            addNew,
            location,
            onHideModal,
            onShowModal,
            onCreateNewSubmit,
            onFiltersChange
        } = this.props;

        let loading: boolean = false;

        return (
            <section className='section-accounts container'>
            
                
                <Modal show={addNew && addNew.visible} onHide={onHideModal.bind(this)}>
                         <Modal.Header>
                             <Modal.Title>Create new</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                            <CreateNewAccountForm 
                                ref={"createnewform"}
                                onCancel={onHideModal}
                                onSubmit={onCreateNewSubmit.bind(this)}
                            />
                         </Modal.Body>
                     </Modal>
                    
                <div className='page-header'>
                    <h1>Accounts</h1>
                    <button
                        ref='createNew'
                        className='btn btn-default pull-right'
                        onClick={onShowModal.bind(this)}>
                        Create new
                    </button>
                    
                </div>
                <FilterForm
                    ref='filters'
                    query={location.query}
                    loading={loading}
                    onChange={onFiltersChange.bind(this)}>
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

export const AccountSearch = connect(mapStateToProps, mapDispatchToProps)(Container);

