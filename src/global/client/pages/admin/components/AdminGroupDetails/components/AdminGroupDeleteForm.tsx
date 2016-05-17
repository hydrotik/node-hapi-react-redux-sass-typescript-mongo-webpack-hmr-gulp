/// <reference path='../../../../../../../../typings/main.d.ts' />

import * as React from 'react';
import {reduxForm} from 'redux-form';
import {Label} from 'react-bootstrap';

import {TextControl} from '../../../../../components/TextControl/TextControl';
import {Spinner} from '../../../../../components/Spinner/Spinner';
import {Button} from '../../../../../components/Button/Button';
import * as _ from 'lodash';

interface BaseProps {
    onSubmit?: (data) => any
}

interface ReduxFormProps extends BaseProps {
    submitting: boolean
    handleSubmit: (data) => any
    onSubmit: (data) => any
}

class Form extends React.Component<BaseProps, any> {
    constructor(props: BaseProps = {}) {
        super(props);
    }
    
    render(): React.ReactElement<any> {
        const {
            submitting,
            handleSubmit
        } = this.props as ReduxFormProps;
        return (
            <form onSubmit={handleSubmit}>
                <legend>Danger zone</legend>
                <p>
                    <Label bsStyle="danger">Warning</Label>
                    <span>This cannot be undone and could result in orphaned document relationships.</span>
                </p>
                <Button 
                    type="submit"
                    disabled={submitting}
                    inputClasses={{'btn-danger': true}}
                >
                Delete <Spinner show={submitting} space="left" />
                </Button>
            </form>
        )
    }
}

export const AdminGroupDeleteForm = reduxForm({
    form: 'adminGroupDeleteForm',
    fields: []
})(Form)