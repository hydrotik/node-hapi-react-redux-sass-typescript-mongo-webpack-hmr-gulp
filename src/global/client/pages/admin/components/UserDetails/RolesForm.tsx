/// <reference path='../../../../../../../typings/index.d.ts' />

import * as React from 'react';
import {reduxForm} from 'redux-form';
import {TextControl} from '../../../../components/TextControl/TextControl';
import {SelectControl} from '../../../../components/SelectControl/SelectControl';
import {Spinner} from '../../../../components/Spinner/Spinner';
import * as _ from 'lodash';

import {ButtonToolbar, ButtonGroup, Button, DropdownButton, Glyphicon, Input, Label, MenuItem, Alert} from 'react-bootstrap';


function validate(values) {
    let errors = {};
    
    return errors;
}



interface ReduxFormProps extends IRoleFormProps {
    submitting: boolean
    handleSubmit: (func: any) => any
    onSubmit: (data) => any
     
    fields: {
        roleAccount: any
        roleAdmin: any
        roleAccountId: any
        roleAdminId: any
    }
    
}

interface IRoleFormProps {
    
    // Required props (from redux-form)
    initialValues: {
        roleAccount: string
        roleAdmin: string
        roleAccountId: string
        roleAdminId: string
    }
    
   
}


/**
 * Displays role information in a form.
 * Currently, read-only.
 */
class RolesForm extends React.Component<IRoleFormProps, any> {
    constructor(props: IRoleFormProps) {
        super(props);
    }
    
    render() : React.ReactElement<any> {
        const {
            fields: {
                roleAccount,
                roleAdmin,
                roleAccountId,
                roleAdminId
            },
            submitting,
            handleSubmit
            
        } = this.props as ReduxFormProps;
        
        return (
            <form onSubmit={handleSubmit}>
                <legend>Roles</legend>
                    <Input
                        type="text"
                        label="Account"
                        value={roleAccount.value}
                        readOnly={true}
                        buttonAfter={!_.isEmpty(roleAccount.initialValue) ? <Button disabled={submitting} href={"/admin/accounts/"+roleAccountId.value}>View</Button>
                                : null}
                        {...roleAccount}
                    >
                    </Input>

                    <Input
                        type="text"
                        label="Admin"
                        value={roleAdmin.value}
                        readOnly={true}
                        buttonAfter={!_.isEmpty(roleAdmin.initialValue) ? <Button disabled={submitting} href={"/admin/roles/"+roleAdminId.value}>View</Button>
                                : null}
                        {...roleAdmin}
                    >
                    </Input>
            </form>
        )
    }
}

export default reduxForm({
    form: "rolesForm",
    fields: ["roleAccount", "roleAdmin", "roleAccountId", "roleAdminId"],
    validate
})(RolesForm)