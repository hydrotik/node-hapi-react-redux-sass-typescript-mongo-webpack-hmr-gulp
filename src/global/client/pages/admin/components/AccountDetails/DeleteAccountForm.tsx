import * as React from 'react';
import * as _ from 'lodash';

import {ButtonToolbar, ButtonGroup, Button, Glyphicon, Label, Input, Well} from 'react-bootstrap';
import {TextControl} from '../../../../components/TextControl/TextControl';
import { reduxForm }  from 'redux-form';

interface IDeleteAccountFormProps {
    submitting?: boolean,
    handleSubmit?: any,
    onSubmit?: (data) => any
}

class DeleteAccountForm extends React.Component<IDeleteAccountFormProps, {}> {
    constructor(props: IDeleteAccountFormProps) {
        super(props);
    }
    
    public render(): React.ReactElement<{}> {
        const {
            handleSubmit,
            onSubmit,
            submitting
        } = this.props;
        
        return (
            <form onSubmit={handleSubmit}> 
                <legend>Danger zone</legend>
                <div className="row">
                    <Label bsStyle="danger">Warning</Label>This cannot be undone and could result in orphaned document relationships.
                </div>
                <div className="row">
                    <Button
                        bsStyle={null}
                        className="btn btn-danger"
                        disabled={submitting}
                        type={"submit"}
                    >
                        Delete {submitting? <Glyphicon className="rotate-forever" glyph="glyphicon-refresh" /> : null}
                    </Button>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: "deleteAccountForm",
    fields: []
})(DeleteAccountForm);
