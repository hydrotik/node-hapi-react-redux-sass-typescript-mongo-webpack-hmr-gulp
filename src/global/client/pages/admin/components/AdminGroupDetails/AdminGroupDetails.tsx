/// <reference path='../../../../../../../typings/main.d.ts' />

/*
    Maps to components/admins-groups/Details.jsx
*/

// Core Imports
import * as React from 'react';
import {connect} from 'react-redux';
import {Alert} from 'react-bootstrap';
import {AdminGroupNameForm} from './components/AdminGroupNameForm';
import {AdminGroupPermissionsForm} from './components/AdminGroupPermissionsForm';
import {AdminGroupDeleteForm} from './components/AdminGroupDeleteForm';
import {Spinner} from '../../../../components/Spinner/Spinner';
import {get} from './actions';
import {REDUCER_NAME} from './reducers';
// Styles
import './_AdminGroupDetails.scss';

interface BaseProps {
    
}

interface StateProps extends BaseProps {
    loading: boolean
    location: string
    onLoadDetails: (string) => any
    params: any
    
    group: {
        name: string
        permissions?: any
    }
}

const mapStateToProps = (state) => {
    return {
        loading: _.get(state, REDUCER_NAME + '.loading', false),
        group: _.get(state, REDUCER_NAME + '.data', '')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadDetails: function(id: string) {
            return dispatch(get(id));
        }
    }
}
@connect(mapStateToProps, mapDispatchToProps)
export class AdminGroupDetails extends React.Component<{}, {}> {

    public constructor(props: any = {}) {
        super(props);
    }
    
    componentWillMount(): any {
        const {
            onLoadDetails,
            params
        } = this.props as StateProps;
        (this.props as StateProps).onLoadDetails(params.id);
    
    }

    public render(): React.ReactElement<{}> {
        const {
            loading,
            group
        } = this.props as StateProps;
        if (loading) {
            return (
                <section className='section-home container'>
                    <div className='row'>
                        <div className='col-sm-7'>
                            <h1 className='page-header'>
                                Admin Group Details
                            </h1>
                            <Alert bsStyle="info">
                                <span>Loading...</span>
                                <Spinner show={true} space="left" />
                            </Alert>
                        </div>
                    </div>
                </section>
            )
        }
        
        return (
            <section className='section-home container'>
                <div className='row'>
                    <div className='col-sm-7'>
                        <h1 className='page-header'>
                            Admin Group Details
                        </h1>
                        
                        <AdminGroupNameForm initialValues={{ name: group.name }}/>
                        <AdminGroupPermissionsForm initialValues={{ permissions: undefined }} />
                        <AdminGroupDeleteForm />
                    </div>
                </div>
            </section>
        );
    }
}
