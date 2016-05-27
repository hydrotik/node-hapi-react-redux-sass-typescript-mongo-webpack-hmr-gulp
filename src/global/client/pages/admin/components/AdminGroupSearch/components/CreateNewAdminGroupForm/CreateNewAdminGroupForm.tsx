/// <reference path='../../../../../../../../../typings/main.d.ts' />
import * as React from 'react';
import {reduxForm} from 'redux-form';
import {Promise} from 'es6-promise';

import {Spinner} from '../../../../../../components/Spinner/Spinner';
import {TextControl} from '../../../../../../components/TextControl/TextControl';
import {Button} from '../../../../../../components/Button/Button';

import {Alert} from 'react-bootstrap';

interface BaseProps {
    onCancel?: (e: any) => any
    onSubmit?: (data: any) => any
}

interface ReduxFormProps extends BaseProps {
    fields: {
        name: any
    }
    onSubmit: (data: any) => any
    handleSubmit: (any) => any
    initializeForm: (any) => any
    submitting: boolean
    invalid: boolean
    pristine: boolean
}

const validate = (values) => {
    const nameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    const errors:any = {  };
    
    const runValidations = (name: string, value?: string, isRequired: boolean = true) => {
        
        if (!value && !isRequired) {
            return;
        }
        
        if (!value) {
            errors[name] = 'Required';
        }
        else if (value.length > 32) {
            errors[name] = "Must be less than 32 characters";
        }
        else if (!nameRegex.test(value)) {
            errors[name] = 'Invalid characters';
        }
    }
    runValidations('name', values.name)
    
    return errors;
}

class Form extends React.Component<BaseProps,any> {
    constructor(props?: BaseProps) {
        super(props);
        this.state = {};
    }
    
    render(): React.ReactElement<any> {
        const {
            fields: {
                name
            },
            invalid,
            pristine,
            handleSubmit,
            submitting,
            initializeForm,
            onCancel
        } = this.props as ReduxFormProps
        return (
            <form onSubmit={(e) => {
                return handleSubmit(e)
                .then(
                    (result) => {
                        this.setState({
                            message: {
                                visible: true,
                                bsStyle: "success",
                                content: (<span>Admin group created</span>)
                            }
                        })
                        initializeForm({
                            name: ""
                        })
                        
                        return Promise.resolve(result);
                    })
                    .catch((err) => {
                        this.setState({
                            message: {
                                visible: true,
                                bsStyle: "danger",
                                content: (<span>{err.message}</span>)
                            }
                        })
                    }
                )
            }}>
                <legend>Create new admin-group</legend>
                {
                    this.state.message && this.state.message.visible &&
                    <Alert bsStyle={this.state.message.bsStyle} onDismiss={(e) => {this.setState({message: {visible: false}})}}>
                        {this.state.message.content}
                    </Alert>
                    }
                <TextControl
                    label="Name"
                    name="name"
                    disabled={submitting}
                    help={name.touched ? name.error : ""}
                    hasError={name.touched && name.error}
                    value={name.value}
                    {...name}
                />

                
                <div>
                    <Button 
                            type="submit"
                            inputClasses={{'btn-primary': true}}
                            disabled={submitting || invalid || pristine}
                    >
                        Create new <Spinner show={submitting} space="left" />
                    </Button>
                    &nbsp;
                    {
                        onCancel &&
                        <Button
                            type="button"
                            inputClasses={{'btn-default': true}}
                            onClick={onCancel}
                            disabled={submitting}
                        >
                            Cancel
                        </Button>
                    }
                </div>
            </form>
        )
    }
}

export const CreateNewAdminGroupForm = reduxForm({
    form: 'createNewAdminGroupForm',
    fields: ['name'],
    validate,
    initialValues: {
        name: ""
    },
    returnRejectedSubmitPromise: true
})(Form);
