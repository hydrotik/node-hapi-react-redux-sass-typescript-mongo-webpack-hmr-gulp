/// <reference path='../../../../../../../typings/main.d.ts' />

/*
    Maps to components/users/Search.jsx
*/

// Core Imports
import * as React from 'react';
import * as _ from 'lodash';
import {connect} from 'react-redux';

import {Button} from '../../../../components/Button/Button';
import {TextControl} from '../../../../components/TextControl/TextControl';
import {CreateNewUserForm} from './components/CreateNewUserForm';
import {Overlay, Modal, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import {FilterFormRow} from './components/FilterFormRow/FilterFormRow';
import { Results } from '../Results/Results';
import {FilterForm} from '../FilterForm/FilterForm';
import {ResultsHead} from './components/ResultsHead/ResultsHead';
import {ResultsRow} from './components/ResultsRow/ResultsRow';

import {showAddNew, hideAddNew, create, list} from './actions';

import {REDUCER_NAME} from './reducers';

// Styles
import './_UserSearch.scss';

interface BaseProps {
    
}

interface StateProps extends BaseProps {
    loading: boolean
    
    addNew: {visible: boolean}
    onFiltersChange: () => any
    onHideModal: (e: any) => any
    onShowModal: (e: any) => any
    onCreateNewSubmit: (data: {username: string, email: string, password: string}) => any
    onLoadUsers: () => any
    
    location: any
    data: [{
        _id: string
        username: string
        email: string
        isActive: boolean
    }]
}

const mapStateToProps = (state) => {
    return {
        addNew: _.get(state, REDUCER_NAME+'.addNew', {visible: false}), 
        data: _.get(state, REDUCER_NAME+'.results.data', []),
        loading: _.get(state, REDUCER_NAME+'.loading', false)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHideModal: function(e: any) {
            return dispatch(hideAddNew());
        },
        
        onShowModal: function(e: any) {
            return dispatch(showAddNew());
        },
        
        onCreateNewSubmit: function(data: { username: string, email: string, password: string } ) {
            return dispatch(create(data.username, data.email, data.password))
            .then((result) => {
                dispatch(hideAddNew());
                dispatch(list());
            })
        },
        
        onFiltersChange: function() {
            
        },
        
        onLoadUsers: function() {
            return dispatch(list());
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class UserSearch extends React.Component<BaseProps, any> {

    public constructor(props?: BaseProps) {
        super(props);
    }
    
    componentWillMount(): any {
        (this.props as StateProps).onLoadUsers();
    }
    getData(): any {
        return (this.props as StateProps).data;
    }

    public render(): React.ReactElement<any> {
        const {
            addNew,
            onHideModal,
            onShowModal,
            onCreateNewSubmit,
            onFiltersChange,
            loading,
            location
        } = this.props as StateProps;
        
        return (
            <section className='section-home container'>
                <Modal show={addNew && addNew.visible} onHide={undefined}>
                    <Modal.Header>
                        <Modal.Title>Create new</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <CreateNewUserForm 
                        ref={"createnewform"}
                        onCancel={onHideModal}
                        onSubmit={onCreateNewSubmit.bind(this)}
                    />
                    </Modal.Body>
                </Modal>
            
                <div className='row'>
                    
                    <h1 className='page-header'>
                        User Search
                    </h1>
                    <button
                        ref='createNew'
                        className='btn btn-default pull-right'
                        onClick={onShowModal.bind(this)}>
                        Create new
                    </button>
                </div>
                <FilterForm
                    ref='filters'
                    query={location}
                    loading={loading}
                    onChange={onFiltersChange.bind(this)}>
                        <FilterFormRow />
                </FilterForm>
                <Results waiting={loading}>
                    <ResultsHead />
                    <ResultsRow linkTo='admin/users' data={this.getData()}/>
                </Results>
                
            </section>
        );
    }
}
