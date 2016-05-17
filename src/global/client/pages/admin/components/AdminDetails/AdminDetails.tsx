/// <reference path='../../../../../../../typings/main.d.ts' />

/*
    Maps to components/admins/Details.jsx
*/

// Core Imports
import * as React from 'react';
import {connect} from 'react-redux';
import {PermissionsForm} from '../PermissionsForm';
import {NameDetailsForm} from '../NameDetailsForm'; 
import {UserLinkForm} from '../UserLinkForm';
import {DeleteForm} from '../DeleteForm';
import {get} from './actions';
// Styles
import './_AdminDetails.scss';

interface BaseProps {
    
}

interface StateProps extends BaseProps {
    loading: boolean,
    params: any,
    onLoadDetails: (id: string) => any
}

const mapStateToProps = (state) => {
    return {
        loading: false
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
export class AdminDetails extends React.Component<BaseProps, any> {

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

    public render(): React.ReactElement<{}> {
        const {
            loading
        } = this.props as StateProps;
        
        return (
            <section className='section-home container'>
                <div className='row'>
                    <div className='col-sm-7'>
                        <h1 className='page-header'>
                            Admin Details
                        </h1>
                        <NameDetailsForm />
                        <UserLinkForm />
                        <PermissionsForm />
                        <DeleteForm />
                    </div>
                </div>
            </section>
        );
    }
}
