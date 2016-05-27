/// <reference path='../../../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {StatusDetailsForm} from './components/StatusDetailsForm';
import {DeleteForm} from '../../components/DeleteForm';

import {get, updateDetails, deleteStatus} from './actions';
import {REDUCER_NAME} from './reducers';

import {Alert} from 'react-bootstrap';
import * as _ from 'lodash';

// Styles
import './_StatusDetails.scss';

interface BaseProps {
    
}

interface StateProps extends BaseProps{
    name: string
    pivot: string
    loading: boolean
    loadFailed: boolean
    location: string
    onLoadDetails: (string) => any
    onUpdateSubmit: (id: string, data: any) => any
    onDeleteSubmit: (id: string, data: any) => any
    params: any
}

const mapStateToProps = (state): any => {
    return {
        loading: _.get(state, REDUCER_NAME+'.loading', false),
        loadFailed: _.get(state, REDUCER_NAME+'.loadFailed', false),
        name: _.get(state, REDUCER_NAME+'.data.name', undefined),
        pivot: _.get(state, REDUCER_NAME+'.data.pivot', undefined)
    }
}

const mapDispatchToProps = (dispatch): any => {
    return {
        onLoadDetails: function(id: string) {
            return dispatch(get(id));
        },
        onUpdateSubmit: function(id: string, data: {name: string}){
            return dispatch(updateDetails(id, data.name));
        },
        onDeleteSubmit: function(id: string, router: any, location: any) {
            dispatch(deleteStatus(id, router, location));
        }
    }
}


class Container extends React.Component<BaseProps, any> {

    static contextTypes: React.ValidationMap<any> = {
        router: React.PropTypes.object
    }
    context: {
        router: any
    }
    
    public constructor(props?: BaseProps) {
        super(props);
    }
    
    componentWillMount(): any {
        const {
            params,
            onLoadDetails
        } = this.props as StateProps;
        onLoadDetails(params.id)
    }

    public render(): React.ReactElement<any> {
        const {
            loading,
            loadFailed,
            name,
            pivot,
            params,
            onUpdateSubmit,
            onDeleteSubmit
        } = this.props as StateProps;
        
        return (
            <section className='section-home container'>
                <div className='row'>
                    <div className='col-sm-7'>
                        <h1 className='page-header'>
                            Status Details
                        </h1>
                        
                        {
                            loadFailed && 
                            <Alert bsStyle="danger">
                                <h4>Could not load {params.id}</h4>
                                <Link
                                    className='btn btn-default btn-sm'
                                    to={_.join(_.dropRight(_.split(location.pathname, '/'), 1), '/')}>
                                    Back to Search
                                </Link>
                            </Alert>
                        }
                        {
                            !loading && !loadFailed &&
                        <StatusDetailsForm
                            initialValues={{
                                name,
                                pivot
                            }}
                            
                            onSubmit={onUpdateSubmit.bind(undefined, params.id)}
                        />
                        }
                        {
                            !loading && !loadFailed &&
                        <DeleteForm 
                            onSubmit={onDeleteSubmit.bind(undefined, params.id, this.context.router, location)}
                        />
                        }

                    </div>
                </div>
            </section>
        );
    }
}

export const StatusDetails = connect(mapStateToProps, mapDispatchToProps)(Container);
