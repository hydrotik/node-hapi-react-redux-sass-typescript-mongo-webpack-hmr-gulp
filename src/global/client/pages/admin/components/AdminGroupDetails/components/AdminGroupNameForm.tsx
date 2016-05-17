/// <reference path='../../../../../../../../typings/main.d.ts' />

import * as React from 'react';
import {reduxForm} from 'redux-form';

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
    submitting: boolean
    handleSubmit: (any) => any
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
            submitting,
            fields: {
                name
            }
        } = this.props as ReduxFormProps;
        return (
            <form onSubmit={handleSubmit}>
                <legend>Details</legend>
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