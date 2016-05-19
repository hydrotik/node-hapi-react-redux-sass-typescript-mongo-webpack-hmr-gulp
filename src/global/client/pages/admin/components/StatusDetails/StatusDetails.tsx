/// <reference path='../../../../../../../typings/main.d.ts' />

/*
    Maps to components/statuses/Details.jsx
*/

// Core Imports
import * as React from 'react';
import {connect} from 'react-redux';

import {StatusDetailsForm} from './components/StatusDetailsForm';
import {DeleteForm} from '../../components/DeleteForm';

import {get, updateDetails} from './actions';
import {REDUCER_NAME} from './reducers';

// Styles
import './_StatusDetails.scss';

interface BaseProps {
    
}

interface StateProps extends BaseProps{
    name: string
    pivot: string
    loading: boolean
    location: string
    onLoadDetails: (string) => any
    onUpdateSubmit: (id: string, data: any) => any
    onDeleteSubmit: (id: string, data: any) => any
    params: any
}

const mapStateToProps = (state) => {
    return {
        loading: _.get(state, REDUCER_NAME+'.loading', false),
        name: _.get(state, REDUCER_NAME+'.data.name', undefined),
        pivot: _.get(state, REDUCER_NAME+'.data.pivot', undefined)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadDetails: function(id: string) {
            return dispatch(get(id));
        },
        onUpdateSubmit: function(id: string, data: {name: string}){
            return dispatch(updateDetails(id, data.name));
        },
        onDeleteSubmit: function(id: string) {
            
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class StatusDetails extends React.Component<BaseProps, any> {

    public constructor(props?: BaseProps) {
        super(props);
    }
    
    componentWillMount(): any {
        const {
            params,
            onLoadDetails
        } = this.props as StateProps;
        onLoadDetails(params.id);
    }

    public render(): React.ReactElement<any> {
        const {
            loading,
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
                        <StatusDetailsForm
                            initialValues={{
                                name,
                                pivot
                            }}
                            
                            onSubmit={onUpdateSubmit.bind(undefined, params.id)}
                        />
                        <DeleteForm 
                            onSubmit={onDeleteSubmit.bind(undefined, params.id)}
                        />
                    </div>
                </div>
            </section>
        );
    }
}
