/// <reference path='../../../../../../../../typings/index.d.ts' />

import * as React from 'react';
import {reduxForm, change} from 'redux-form';
import * as _ from 'lodash';
import {Alert} from 'react-bootstrap';

import {ControlGroup} from '../../../../../components/ControlGroup/ControlGroup';
import {Button} from '../../../../../components/Button/Button';

interface BaseProps {
    allGroups: {id: string, name: string}[]
    initialValues?: {
        addGroup?: string
        selectedGroups: { id: string, name: string }[]
    },
    onSubmit?: (any) => any
}

interface ReduxFormProps extends BaseProps {
    invalid: boolean
    pristine: boolean
    submitting: boolean
    handleSubmit: (any) => any
    changeFieldValue: (field: any, value: any) => any
    fields: {
        addGroup: any
        selectedGroups: any
        
        // touched is a hack for deep form arrays.
        // Possibly upgrade to v6 to resolve.
        // See: https://github.com/erikras/redux-form/issues/391
        touched: any 
    }
}

const validate = (values) => {
    let errors = {};
    
    return errors;
}

class Form extends React.Component<BaseProps, any> {
    constructor(props: BaseProps = { allGroups: [] }) {
        super(props);
        this.state = {};
    }
    
    render(): React.ReactElement<any> {
        const {
            submitting,
            pristine,
            
            invalid,
            handleSubmit,
            changeFieldValue,
            allGroups,
            fields: {
                addGroup,
                selectedGroups,
                touched
            }
        } = this.props as ReduxFormProps;
        return (
            <form onSubmit={
                (e) => { 
                    return handleSubmit(e)
                    .then((result) => {
                        this.setState({
                            message: {
                                visible: true,
                                bsStyle: 'success',
                                content: (<span>Groups updated</span>)
                            }
                        });
                        
                        changeFieldValue('touched', false);
                    })
                    .catch((err) => {
                        this.setState({
                            message: {
                                visible: true,
                                bsStyle: 'danger',
                                content: (<span>{err.message}</span>)
                            }
                        });
                    })
                }
            }>
                <legend>Groups</legend>
                {
                    this.state.message && this.state.message.visible &&
                    <Alert bsStyle={this.state.message.bsStyle} onDismiss={(e) => {this.setState({message: {visible: false}})}}>
                        {this.state.message.content}
                    </Alert>
                }
                <ControlGroup
                    hasError={undefined}
                    help=""
                    label="Add group"
                >
                <div className="input-group">
                    <select className="form-control" value={ addGroup.value } {...addGroup}>
                        <option value="">--- select ---</option>
                        {
                            _.map(allGroups, (g:any, index) => (
                                <option value={g.id} key={index}>{g.name}</option>
                            )
                            )
                           
                        }
                    </select>
                    <span className="input-group-btn">
                        <Button
                            type="button"
                            inputClasses={{"btn-default": true}}
                            onClick={
                                (e) => {
                                    let group = _.first(_.filter(allGroups, (g) => {
                                        return g.id === addGroup.value;
                                    }));
                                    
                                    let alreadySelected: boolean = _.filter(selectedGroups, (g: any) => {
                                        return g.id.value === addGroup.value;
                                    }).length > 0;
                                    
                                    if (group && !alreadySelected) {
                                        selectedGroups.addField({id: group.id, name: group.name});
                                    }
                                    changeFieldValue('addGroup', '');
                                    changeFieldValue('touched', true);
                                }
                            }
                        >
                            Add
                        </Button>
                    </span>
                </div>
                </ControlGroup>
                <ControlGroup
                    label="Existing groups"
                >
                {!selectedGroups.length && <div>None</div>}
                {
                    
                    _.map(selectedGroups, (g: any, index) => (
                        <div className="input-group">
                            <input
                                className="form-control"
                                key={index}
                                type="text"
                                disabled={true}
                                value={g.name.value}
                                {...g}
                            >
                            </input>
                            <span className="input-group-btn">
                                <Button
                                    key={index}
                                    type="button"
                                    inputClasses={{"btn-warning": true}}
                                    onClick={
                                        (e) => {
                                            selectedGroups.removeField(index);
                                            changeFieldValue('touched', true);
                                        }
                                    }
                                >
                                    Remove
                                </Button>
                            </span>
                        </div>
                    ))
                }
                </ControlGroup>
                <Button
                    type="submit"
                    inputClasses={{"btn-primary": true}}
                    disabled={invalid || submitting || !touched.value}
                >
                    Save changes
                </Button>
            </form>
        )
    }
}

export const AdminGroupsForm = reduxForm({
    form: 'adminGroupsForm',
    fields: ['addGroup', 'touched', 'selectedGroups[].id', 'selectedGroups[].name'],
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
            dispatch(change('adminGroupsForm', field, value))
        }
    }
    })(Form)
