/// <reference path='../../../../../../../../typings/main.d.ts' />

import * as React from 'react';
import {reduxForm, change} from 'redux-form';

import {TextControl} from '../../../../../components/TextControl/TextControl';
import {Spinner} from '../../../../../components/Spinner/Spinner';
import {Button} from '../../../../../components/Button/Button';
import * as _ from 'lodash';

interface BaseProps {
    initialValues?: {
        permissions: { name: string, active: boolean}[]

    }
    onSubmit?: (any) => any
}

interface ReduxFormProps extends BaseProps {
    fields: {
        newPermission: any
        permissions: any
    }
    submitting: boolean
    handleSubmit: (any) => any
    changeFieldValue: (field, value) => any
}

const validate = (values) => {
    return {};
}

class Form extends React.Component<BaseProps, any> {
    constructor(props?: BaseProps) {
        super(props);
    }
    
    render() : React.ReactElement<any> {
        const {
            handleSubmit,
            changeFieldValue,
            submitting,
            fields: {
                newPermission,
                permissions
            }
        } = this.props as ReduxFormProps;
        
        
        return (
            <form onSubmit={handleSubmit}>
                <legend>Permissions</legend>
               
                <strong>Add permission</strong>

                <div className="row">
                    <div className="input-group">
                        <TextControl
                            type={"text"}
                            disabled={submitting}
                            {...newPermission}>
                        </TextControl>
                        
                        <span className="input-group-btn">
                        <Button 
                            type="button" 
                            inputClasses={{'btn-default': true}}
                            disabled={submitting}
                            onClick={(e) => { 
                                permissions.addField({name: newPermission.value, active: true});
                                changeFieldValue('newPermission', '');
                            }}
                        >Add</Button>
                        </span>
                    </div>
                </div>
                <p><strong>Existing permissions</strong></p>
                {!permissions.length && <div>None</div>}
                {permissions.map((p, index:number) => (
                    <div className="row">
                        <div className="input-group">
                            <TextControl
                                key={index}
                                type={"text"}
                                disabled={true}
                                {...p.name}>
                            </TextControl>
                            <span className="input-group-btn">
                                    
                                <Button type="button" 
                                    inputClasses={{"btn-default": true}}
                                    disabled={submitting}
                                    aria-hidden="true"
                                    onClick={
                                        (e) => {
                                            changeFieldValue('permissions['+index+'].active', !p.active.value);
                                            
                                        }
                                    }
                                >
                                    <i className={ p.active.value ? "fa fa-toggle-on" : "fa fa-toggle-off"}
                                    ></i>
                                </Button>

                                <Button type="button" inputClasses={{"btn-warning": true}} disabled={submitting} onClick={(e) => {permissions.removeField(index)}}>Remove</Button>
                                        
                            </span>
                        </div>
                    </div>
                ))}
                <Button 
                    type="submit"
                    inputClasses={{'btn-primary': true}}
                >
                    Save changes <Spinner show={submitting} space="left" />
                </Button>
            </form>
        )
    }
}

export const AdminGroupPermissionsForm = reduxForm(
    {
        form: 'adminGroupPermissionsForm',
        fields: ['newPermission', 'permissions[].name', 'permissions[].active'],
        validate,
        returnRejectedSubmitPromise: true
    },
    undefined,
    (dispatch) => {
        return {
        // This will be passed as a property to the presentational component
        // Allowing us to modify the toggle button on permissions
        // See: https://github.com/erikras/redux-form/issues/369#issuecomment-216733451
        changeFieldValue: function(field, value) {
            dispatch(change('adminGroupPermissionsForm', field, value))
        }
    }
    }
)(Form);