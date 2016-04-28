// Core Imports
import * as React from 'react';
import * as _ from 'lodash';

import {ButtonToolbar, ButtonGroup, Button, Glyphicon, Label, Input, Well} from 'react-bootstrap';
import {TextControl} from '../../../../components/TextControl/TextControl';
import { reduxForm }  from 'redux-form';

interface IUserLinkFormProps {
    // From redux-form
    fields?: {
        username: any
    }
    submitting?: boolean
    initialValues?: any
    initialUsername?: string
    onUserLinkSubmit?: (username: string) => any
    onUserUnlinkSubmit?: () => any
    handleSubmit?: any
    onSubmit?: (data) => any
    error?: string
}

const validate = (values) => {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    const errors:any = {  };
    
    const runValidations = (name: string, value?: string, isRequired: boolean = true) => {
        
        if (!value && !isRequired) {
            return;
        }
        
        if (!value) {

        }
        else if (value.length > 32) {
            errors[name] = "Must be less than 32 characters";
        }
        else if (!usernameRegex.test(value)) {
            errors[name] = 'Invalid characters';
        }
    }
    runValidations('username', values.username)
    
    return errors;
}

class UserLinkForm extends React.Component<IUserLinkFormProps, {}> {
    constructor(props: IUserLinkFormProps) {
        super(props);
    }
    
    public render(): React.ReactElement<{}> {
        const {
            fields: {
                username
            },
            initialUsername,
            onUserUnlinkSubmit,
            onUserLinkSubmit,
            handleSubmit,
            submitting
        } = this.props;
        
        
        return (
            <form onSubmit={handleSubmit((data) => {
                if (initialUsername && onUserUnlinkSubmit) {
                    onUserUnlinkSubmit();
                }
                else if (onUserLinkSubmit) {
                    onUserLinkSubmit(username.value);
                }
            })}>
                <legend>User</legend>
                <div className="row">
                    <Input
                        type={"text"}
                        help={username.touched && username.error ? username.error : ""}
                        bsStyle={username.touched && username.error ? "error": null}
                        hasFeedBack={username.touched && username.error }
                        disabled={submitting || !_.isUndefined(_.get(username, 'initialValue', undefined))}
                        name={"username"}
                        ref="username"
                        label={"Username"}
                        value={username.value}
                        buttonAfter={
                            username ? <Button disabled={!_.get(username, 'initialValue', undefined)}>View</Button>
                            : null
                        }
                        {...username}>
                    </Input>
                </div>
                <div className="row">
                    <Button
                        bsStyle={null}
                        className={_.get(username, 'initialValue', undefined) ? "btn btn-danger" : "btn btn-primary"}
                        disabled={submitting}
                        type={"submit"}
                    >
                        {_.get(username, 'initialValue', undefined) ? 'Unlink user' : 'Link user'} {submitting? <Glyphicon className="rotate-forever" glyph="glyphicon-refresh" /> : null}
                    </Button>
                </div>
            </form>
                        
        )
    }
}

export default reduxForm({
    form: 'userLinkForm',
    fields: ['username'],
    validate
},
(state, ownProps) => ({
    initialValues: {
        username: ownProps.initialUsername
    }
})
)(UserLinkForm);
