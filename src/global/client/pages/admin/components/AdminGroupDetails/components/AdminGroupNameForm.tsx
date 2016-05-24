/// <reference path='../../../../../../../../typings/main.d.ts' />

import * as React from 'react';
import {reduxForm} from 'redux-form';
import {Alert} from 'react-bootstrap';
import {TextControl} from '../../../../../components/TextControl/TextControl';
import {Spinner} from '../../../../../components/Spinner/Spinner';
import {Button} from '../../../../../components/Button/Button';
import * as _ from 'lodash';

interface BaseProps {
    onSubmit?: (any) => any
    initialValues?: {
        name: string
    }
}

interface ReduxFormProps extends BaseProps {
    fields: {
        name: any
    }
    pristine: boolean
    invalid: boolean
    submitting: boolean
    handleSubmit: (any) => any
}

const validate = (values) => {
    return {};
}

class Form extends React.Component<BaseProps, any> {
    constructor(props?: BaseProps) {
        super(props);
        this.state = {};
    }
    
    render() : React.ReactElement<any> {
        const {
            handleSubmit,
            submitting,
            pristine,
            invalid,
            fields: {
                name
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
                                content: (<span>Details updated</span>)
                            }
                        })
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
                <legend>Details</legend>
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
                    value={name.value}
                    hasError={name.touched && name.error}
                    {...name}
                />
                <Button 
                    type="submit"
                    inputClasses={{'btn-primary': true}}
                    disabled={submitting || invalid || pristine}
                >
                    Save changes <Spinner show={submitting} space="left" />
                </Button>
            </form>
        )
    }
}

export const AdminGroupNameForm = reduxForm({
    form: 'adminGroupNameForm',
    fields: ['name'],
    validate,
    returnRejectedSubmitPromise: true
})(Form);