/// <reference path='../../../../../../../../typings/index.d.ts' />

import * as React from 'react';
import {reduxForm} from 'redux-form';
import * as _ from 'lodash';

import {Alert} from 'react-bootstrap';
import {ControlGroup} from '../../../../../components/ControlGroup/ControlGroup';

interface BaseProps {
    initialValues?: {
        name: string,
        pivot: string
    }
    onSubmit?: (any) => any
}

interface ReduxFormProps extends BaseProps {
    fields: {
        pivot: any
        name: any
    }
    pristine: boolean
    invalid: boolean
    submitting: boolean
    initializeForm: (any) => any
    handleSubmit: (any) => any
    
}

const validate = (values) => {
    let errors = {};
    
    if (_.isEmpty(_.trim(values.name))) {
        errors['name'] = 'Required';
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
            invalid,
            pristine,
            submitting,
            initializeForm,
            handleSubmit
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
                                content: (<span>Status updated</span>)
                            }
                        })
                        
                        initializeForm({
                            name: result.name,
                            pivot: result.pivot
                        })
                    })
                    .catch((err) =>{
                        this.setState({
                            message: {
                                visible: true,
                                bsStyle: 'danger',
                                content: (<span>{err.message || "Could not update status"}</span>)
                            }
                        })
                    })
                }
            }>
                <legend>Status Details</legend>
                {
                    this.state.message && this.state.message.visible &&
                    <Alert bsStyle={this.state.message.bsStyle} onDismiss={(e) => {this.setState({message: {visible: false}})}}>
                        {this.state.message.content}
                    </Alert>
                }
                <ControlGroup
                    label="Pivot"
                >
                    <input
                        type="text"
                        className="form-control"
                        disabled={true}
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
                        disabled={submitting || invalid || pristine}
                    >
                        Save changes
                    </button>
                </ControlGroup>
            </form>
        )
    }
}

export const StatusDetailsForm = reduxForm({
    form: 'statusDetailsForm',
    fields: ['name', 'pivot'],
    validate,
    returnRejectedSubmitPromise: true
})(Form)

