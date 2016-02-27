/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
// import { connect } from 'react-redux';

// Styles
import './_Form.scss';

// Page Components
import { ControlGroup } from './components/ControlGroup/ControlGroup';
import { TextControl } from './components/TextControl/TextControl';
import { Button } from './components/Button/Button';
import { Spinner } from './components/Spinner/Spinner';

// Behaviors and Actions
import {
    // SEND_REQUEST,
    // RECEIVE_RESPONSE,
    handleRequest
} from '../../actions';

// Interfaces
interface IFormProps {
    // dispatch?: (func: any) => void;
    // store?: any;
}
interface IFormState {
    success?: boolean;
    error?: boolean;
    hasError?: any;
    help?: any;
    loading?: boolean;

    name?: string;
    username?: string;
    password?: string;
    email?: string;
}

// Decorators
/*
function select(state: { editorialContent: IEditorialAction; }): IFormState {
    const { editorialContent }: { editorialContent: IEditorialAction; } = state;
    const {
        isFetching,
        lastUpdated,
        editorial
    }: IEditorialAction = editorialContent;

    return {

    };

}

@connect(select)
*/
export class Form extends React.Component<{}, IFormState> {

    public constructor(props: any = {}) {
        super(props);

        this.state = {
            success : false,
            hasError : {
                name : ''
            },
            help: {
                name: ''
            },
            loading: false,
            error: false
        };
    }

    public componentDidMount(): void {
        // const {dispatch}: IFormProps = this.props;
        // dispatch(fetchContentIfNeeded(EDITORIAL));
        handleRequest({
            name: 'John Smith',
            username: 'johnsmith1234',
            password: 'test1234',
            email: 'jsmith@gmail.com'
        });
    }

    public handleSubmit(event: any): void {

        event.preventDefault();
        event.stopPropagation();

        /*
        Actions.sendRequest({
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        });
        */
    }

    public linkState(value: string): any {
        return {
            value: this.state[value],
            requestChange: function(newValue: string): void {
                this.state[value] = newValue;
            }
        };
    }

    public render(): React.ReactElement<{}> {

        let alerts: any[] = [];

        if (this.state.success) {
            alerts.push(<div key='success' className='alert alert-success'>
                Success.Redirecting...
                </div>);
        }else if (this.state.error) {
            alerts.push(<div key='danger' className='alert alert-danger'>
                {this.state.error}
                </div>);
        }

        let formElements: React.ReactElement<{}>;
        if (!this.state.success) {
            formElements = <fieldset>
                <TextControl
                    name='name'
                    label='Name'
                    ref='nameControl'
                    hasError={this.state.hasError.name}
                    valueLink={this.linkState('name') }
                    help={this.state.help.name}
                    disabled={this.state.loading}
                    />
                <TextControl
                    name='email'
                    label='Email'
                    hasError={this.state.hasError.email}
                    valueLink={this.linkState('email') }
                    help={this.state.help.email}
                    disabled={this.state.loading}
                    />
                <TextControl
                    name='username'
                    label='Username'
                    hasError={this.state.hasError.username}
                    valueLink={this.linkState('username') }
                    help={this.state.help.username}
                    disabled={this.state.loading}
                    />
                <TextControl
                    name='password'
                    label='Password'
                    type='password'
                    hasError={this.state.hasError.password}
                    valueLink={this.linkState('password') }
                    help={this.state.help.password}
                    disabled={this.state.loading}
                    />
                <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type='submit'
                        inputClasses={{ 'btn-primary': true }}
                        disabled={this.state.loading}>

                        Create my account
                        <Spinner space='left' show={this.state.loading} />
                    </Button>
                </ControlGroup>
            </fieldset>;
        }
        return (
            <section>
                <h1 className='page-header'>Sign up</h1>
                <form onSubmit={this.handleSubmit}>
                    {alerts}
                    {formElements}
                </form>
            </section>
        );
    }
}








/*
var React = require('react/addons');
var ControlGroup = require('../../components/form/ControlGroup');
var TextControl = require('../../components/form/TextControl');
var Button = require('../../components/form/Button');
var Spinner = require('../../components/form/Spinner');
var Actions = require('./Actions');
var Store = require('./Store');


var Component = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {

        Store.reset();
        return Store.getState();
    },
    componentDidMount: function() {

        Store.addChangeListener(this.onStoreChange);
        this.refs.nameControl.refs.inputField.getDOMNode().focus();
    },
    componentWillUnmount: function() {

        Store.removeChangeListener(this.onStoreChange);
    },
    onStoreChange: function() {

        this.setState(Store.getState());
    },
    handleSubmit: function(event) {

        event.preventDefault();
        event.stopPropagation();

        Actions.sendRequest({
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        });
    },
    render: function() {

        var alerts = [];
        if (this.state.success) {
            alerts.push(<div key='success' className='alert alert-success'>
                Success.Redirecting...
                </div>);
        }
        else if (this.state.error) {
            alerts.push(<div key='danger' className='alert alert-danger'>
                {this.state.error}
                </div>);
        }

        var formElements;
        if (!this.state.success) {
            formElements = <fieldset>
                <TextControl
                    name='name'
                    label='Name'
                    ref='nameControl'
                    hasError={this.state.hasError.name}
                    valueLink={this.linkState('name') }
                    help={this.state.help.name}
                    disabled={this.state.loading}
                    />
                <TextControl
                    name='email'
                    label='Email'
                    hasError={this.state.hasError.email}
                    valueLink={this.linkState('email') }
                    help={this.state.help.email}
                    disabled={this.state.loading}
                    />
                <TextControl
                    name='username'
                    label='Username'
                    hasError={this.state.hasError.username}
                    valueLink={this.linkState('username') }
                    help={this.state.help.username}
                    disabled={this.state.loading}
                    />
                <TextControl
                    name='password'
                    label='Password'
                    type='password'
                    hasError={this.state.hasError.password}
                    valueLink={this.linkState('password') }
                    help={this.state.help.password}
                    disabled={this.state.loading}
                    />
                <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type='submit'
                        inputClasses={{ 'btn-primary': true }}
                        disabled={this.state.loading}>

                        Create my account
                        <Spinner space='left' show={this.state.loading} />
                        </Button>
                    </ControlGroup>
                </fieldset>;
        }

        return (
            <section>
                <h1 className='page-header'>Sign up</h1>
                <form onSubmit={this.handleSubmit}>
                    {alerts}
                    {formElements}
                    </form>
                </section>
        );
    }
});


module.exports = Component;

*/

