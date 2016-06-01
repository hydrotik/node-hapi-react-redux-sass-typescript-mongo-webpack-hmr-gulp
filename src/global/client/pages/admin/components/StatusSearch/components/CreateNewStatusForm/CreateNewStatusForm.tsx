/// <reference path='../../../../../../../../../typings/index.d.ts' />

import * as React from 'react';
import {reduxForm} from 'redux-form';
import {ControlGroup} from '../../../../../../components/ControlGroup/ControlGroup';
import {Alert} from 'react-bootstrap';
import * as _ from 'lodash';

interface BaseProps {
    onCancel?: (any) => any
    onSubmit?: (any) => any
}

interface ReduxFormProps extends BaseProps {
    fields: {
        pivot: any
        name: any
    }
    submitting: boolean
    handleSubmit: (any) => any
    
}

const validate = (values) => {
    let errors = {};
    
    if (_.isEmpty(_.trim(values.name))) {
        errors['name'] = 'Required';
    }
    
    if (_.isEmpty(_.trim(values.pivot))) {
        errors['pivot'] = 'Required';
    }
    
    return errors;
}

class Form extends React.Component<BaseProps, any> {
    constructor(props?: BaseProps) {
        super(props);
        this.state = {};
    }
    
    render(): React.ReactElement<any> {
        const {
            fields: {
                pivot,
                name
            },
            submitting,
            handleSubmit,
            onCancel
        } = this.props as ReduxFormProps
        return (
            <form onSubmit={
                (e) => {
                    return handleSubmit(e)
                    .then((result) => {
                        this.setState({
                            message: {
                                visible: true,
                                bsStyle: 'success',
                                content: (<span>Status created</span>)
                            }
                        })
                    })
                    .catch((err) =>{
                        this.setState({
                            message: {
                                visible: true,
                                bsStyle: 'danger',
                                content: (<span>{err.message || "Could not create status"}</span>)
                            }
                        })
                    })
                }
            }>
                <legend>Create Status</legend>
                {
                    this.state.message && this.state.message.visible &&
                    <Alert bsStyle={this.state.message.bsStyle} onDismiss={(e) => {this.setState({message: {visible: false}})}}>
                        {this.state.message.content}
                    </Alert>
                }
                <ControlGroup
                    help={pivot.touched ? pivot.error : ""}
                    hasError={pivot.touched && pivot.error}
                    label="Pivot"
                >
                    <input
                        type="text"
                        className="form-control"
                        disabled={submitting}
                        {...pivot}
                    >
                    </input>
                </ControlGroup>
                
                <ControlGroup
                    help={name.touched ? name.error : ""}
                    hasError={name.touched && name.error}
                    label="Name"
                >
                    <input
                        type="name"
                        className="form-control"
                        disabled={submitting}
                        {...name}
                    >
                    </input>
                </ControlGroup>
            
                <ControlGroup>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                    >
                        Create new
                    </button>
                    <span>&nbsp;</span>
                    {
                        onCancel &&
                        <button
                            type="button"
                            className="btn btn-default"
                            disabled={submitting}
                            onClick={onCancel}
                        >
                        Cancel
                        </button>
                    }
                </ControlGroup>
            </form>
        )
    }
}

export const CreateNewStatusForm = reduxForm({
    form: 'createNewStatusForm',
    fields: ['name', 'pivot'],
    validate,
    returnRejectedSubmitPromise: true,
    initialValues: {
        name: '',
        pivot: ''
    }
})(Form);
