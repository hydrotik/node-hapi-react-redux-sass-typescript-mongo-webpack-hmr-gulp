/// <reference path='../../../../../../../typings/main.d.ts' />

/*
    Maps to components/statuses/Search.jsx
*/

// Core Imports
import * as React from 'react';
import * as _ from 'lodash';
import {connect} from 'react-redux';

import {Button} from '../../../../components/Button/Button';
import {TextControl} from '../../../../components/TextControl/TextControl';
import {Overlay, Modal, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import {FilterFormRow} from './components/FilterFormRow/FilterFormRow';
import { Results } from '../Results/Results';
import {FilterForm} from '../FilterForm/FilterForm';
import {ResultsHead} from './components/ResultsHead/ResultsHead';
import {ResultsRow} from './components/ResultsRow/ResultsRow';
import {CreateNewStatusForm} from './components/CreateNewStatusForm';

import {REDUCER_NAME} from './reducers';
import {showAddNew, hideAddNew, create, list} from './actions';

// Styles
import './_StatusSearch.scss';

interface BaseProps {
    
}

interface StateProps extends BaseProps {
    loading: boolean
    
    addNew: {visible: boolean}
    onFiltersChange: () => any
    onHideModal: (e: any) => any
    onShowModal: (e: any) => any
    onCreateNewSubmit: (name: {lastName: string, firstName: string, middleName?: string}) => any
    onLoadAdminGroups: () => any
    
    location: any
    data: [{
        _id: string
        name: string
    }]
}

const mapStateToProps = (state): any => {
    return {
        addNew: _.get(state, REDUCER_NAME+'.addNew', {visible: false}), 
        data: _.get(state, REDUCER_NAME+'.results.data', []),
        loading: _.get(state, REDUCER_NAME+'.loading', false)
    }
}

const mapDispatchToProps = (dispatch): any => {
    return {
        onHideModal: function(e: any) {
            return dispatch(hideAddNew());
        },
        
        onShowModal: function(e: any) {
            return dispatch(showAddNew());
        },
        
        onCreateNewSubmit: function(data: { name: string, pivot: string } ) {
            return dispatch(create(data.name, data.pivot))
            .then(
                (result) => {
                    dispatch(hideAddNew());
                    return dispatch(list());
                }
            )
        },
        
        onFiltersChange: function() {
            
        },
        
        onLoadAdminGroups: function() {
            return dispatch(list());
        }
    }
}


class Container extends React.Component<BaseProps, any> {

    public constructor(props?: BaseProps) {
        super(props);
    }
    
    componentWillMount(): any {
        (this.props as StateProps).onLoadAdminGroups();
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
                    <Modal.Body>
                    <CreateNewStatusForm 
                        ref={"createnewform"}
                        onCancel={onHideModal}
                        onSubmit={onCreateNewSubmit.bind(this)}
                    />
                    </Modal.Body>
                </Modal>
            
                <div className='row'>
                    
                    <h1 className='page-header'>
                        Admin Search
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
                    <ResultsRow linkTo='admin/statuses' data={this.getData()}/>
                </Results>
                
            </section>
        );
    }
}
export const StatusSearch = connect(mapStateToProps, mapDispatchToProps)(Container);
