/// <reference path='../../../../../../../typings/index.d.ts' />

import * as React from 'react';
import {reduxForm, change} from 'redux-form';
import {Alert} from 'react-bootstrap';

import {ControlGroup} from '../../../../components/ControlGroup/ControlGroup';
import {TextControl} from '../../../../components/TextControl/TextControl';
import {Spinner} from '../../../../components/Spinner/Spinner';
import {Button} from '../../../../components/Button/Button';
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
        
        // touched is a hack for deep form arrays.
        // Possibly upgrade to v6 to resolve.
        // See: https://github.com/erikras/redux-form/issues/391
        touched: any 
    }
    submitting: boolean
    invalid: boolean
    pristine: boolean
    handleSubmit: (any) => any
    touch: (any) => any
    changeFieldValue: (field, value) => any
    initializeForm: (any) => any
}

const validate = (values) => {
    let errors = {};
    let regex = /^[A-Za-z][A-Za-z0-9]*$/;
    let sanitizedField = _.trim(_.lowerCase(values.newPermission));
    
    if (sanitizedField.length === 0) {
        return errors;
    }
    
    if (!regex.test(_.trim(values.newPermission))) {
        errors['newPermission'] = 'Only letters and numbers are allowed';
    }
    else if (_.filter(values.permissions, (p: any) => { return p.name === sanitizedField }).length > 0) {
        errors['newPermission'] = 'Already exists';
    }
    
    
    
    return errors;
}

class Form extends React.Component<BaseProps, any> {
    constructor(props?: BaseProps) {
        super(props);
        this.state = {};
    }
    
    render() : React.ReactElement<any> {
        const {
            initializeForm,
            initialValues,
            handleSubmit,
            touch,
            changeFieldValue,
            submitting,
            pristine,
            invalid,
            fields,
            fields: {
                newPermission,
                permissions,
                touched
            }
        } = this.props as ReduxFormProps;
        
        
        return (
            <form onSubmit={
                (e) => {
                    return handleSubmit(e).
                    then((result) => {
                        this.setState({
                            message: {
                                visible: true,
                                bsStyle: "success",
                                content: (<span>Permissions updated</span>)
                            }
                        })
                        changeFieldValue('touched', false);
                        
                    })
                    .catch((err) => {
                        this.setState({
                            message: {
                                visible: true,
                                bsStyle: "danger",
                                content: (<span>{err.message}</span>)
                            }
                        })
                    })
                }
            }>
                <legend>Permissions</legend>
                        {
                            this.state.message && this.state.message.visible &&
                            <Alert bsStyle={this.state.message.bsStyle} onDismiss={(e) => {this.setState({message: {visible: false}})}}>
                                {this.state.message.content}
                            </Alert>
                        }
                                 
                        <ControlGroup
                            hasError={newPermission.touched && newPermission.error}
                            help={newPermission.touched ? newPermission.error : ""}
                            label="Add Permission">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="newPermission"
                                    disabled={submitting}
                                    {...newPermission}
                                    />
                                <span className="input-group-btn">
                                    <Button 
                                    type="button" 
                                    inputClasses={{'btn-default': true}}
                                    disabled={submitting || newPermission.pristine || (newPermission.error && newPermission.touched)}
                                    onClick={(e) => {
                                   
                                        permissions.addField({name: _.trim(_.lowerCase(newPermission.value)), active: true});
                                        changeFieldValue('newPermission', '');
                                        changeFieldValue('touched', true);
                                        

                                        
                                    }}
                                    >Add</Button>
                                </span>
                            </div>
                        </ControlGroup>

                <ControlGroup
                    label="Existing permissions">
                {!permissions.length && <div>None</div>}
                {permissions.map((p, index:number) => (
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
                                            changeFieldValue('touched', true);
                                        }
                                    }
                                >
                                    <i className={ p.active.value ? "fa fa-toggle-on" : "fa fa-toggle-off"}
                                    ></i>
                                </Button>

                                <Button 
                                    type="button"
                                    inputClasses={{"btn-warning": true}}
                                    disabled={submitting}
                                    onClick={
                                        (e) => {
                                            permissions.removeField(index);
                                            changeFieldValue('touched', true);
                                        }
                                    }
                                >Remove</Button>
                                        
                            </span>
                        </div>
                ))}
                </ControlGroup>
                <Button 
                    type="submit"
                    inputClasses={{'btn-primary': true}}
                    disabled={submitting || !touched.value}
                >
                    Save changes <Spinner show={submitting} space="left" />
                </Button>
            </form>
        )
    }
}

export const PermissionsForm = reduxForm(
    {
        form: 'permissionsForm',
        fields: ['newPermission', 'touched', 'permissions[].name', 'permissions[].active'],
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
            dispatch(change('permissionsForm', field, value))
        }
    }
    }
)(Form);