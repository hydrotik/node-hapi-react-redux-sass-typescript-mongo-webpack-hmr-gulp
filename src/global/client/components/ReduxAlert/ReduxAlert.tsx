import * as React from 'react';
import {connect} from 'react-redux';
import {Alert} from 'react-bootstrap';
import * as actions from './actions';

export {ReduxAlertType} from './actions';

interface IReduxAlertProps {
    visible: boolean
    options: {
        alertType: actions.ReduxAlertType,
        messageText: string,
        custom?: any
    }
}

interface IReduxAlertDispatchProps {
    onDismissHandler: (data: any, id: string) => any
    onInitialize: (id: string) => any
    onDestroy: (id: string) => any
}

function mapStateToProps(state, ownProps): IReduxAlertProps {
    let reduxAlertState = _.get(state, 'reduxAlertReducer.ids.'+ownProps.id, {
        visible: ownProps.visible,
        options: {
            alertType: actions.ReduxAlertType.None,
            messageText: ""
        }
    });
    return reduxAlertState;
}

function mapDispatchToProps(dispatch): IReduxAlertDispatchProps {
    return {
        onDismissHandler: function(id: string, e: any) {
            return dispatch(actions.reduxAlertDismiss(id));
        },
        onInitialize: function(id: string, visible?: boolean, options?: actions.IReduxAlertOptions) {
            return dispatch(actions.reduxAlertInitialize(id, visible, options));
        },
        onDestroy: function(id: string) {
            return dispatch(actions.reduxAlertDestroy(id));
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class ReduxAlert extends React.Component<{id: string, visible?: boolean, alertType?: actions.ReduxAlertType} & any, any> {

    static childContextTypes = {
        visible: React.PropTypes.bool,
        options: React.PropTypes.object
    }
    
    getChildContext() {
        return {
            visible: this.props.visible,
            options: this.props.options
        }
    }

    
    constructor(props: {
        id: string, visible?: boolean, alertType?: actions.ReduxAlertType
    }) {
        super({
            id: props.id,
            visible: props.visible || false,
            onDismissHandler: () => {}
        });
        
    }
    
    private bsStyleMap = (type: actions.ReduxAlertType) : string => {
        switch (type) {
            case (actions.ReduxAlertType.Error):
                return 'danger';
            case (actions.ReduxAlertType.Success):
                return 'success';
            case (actions.ReduxAlertType.Warning):
                return 'warning';
            case (actions.ReduxAlertType.Info):
                return 'info';
        }
        
        return 'default';
    }
    
    public componentWillMount(): any {
        this.props.onInitialize(this.props.id, this.props.visible, {alertType: this.props.alertType, message: ""});
    }
    
    public componentWillUnmount(): any {
        this.props.onDestroy(this.props.id);
    }
    
    public render(): React.ReactElement<{}> {
        const {
            id,
            visible,
            options,
            onDismissHandler,
            children
        } = this.props;
        
        return (
            <div className="reduxAlert">
                {
                    visible ? 
             
                        <Alert bsStyle={this.bsStyleMap(options.alertType)} onDismiss={onDismissHandler.bind(undefined, id)}>
                            {
                                children || options.messageText
                            }
                        </Alert>
                    :
                    undefined
                }
            </div>
        )
    }
}

interface IMessageTextProps {
    visible?: boolean
    options?: {
        messageText?: string
        alertType?: actions.ReduxAlertType,
        custom?: any
    }
}
export class MessageText extends React.Component<IMessageTextProps, any> {
    constructor(props: IMessageTextProps = {}) {
        super(props);
    }
    
    context: {
        visible?: boolean,
        options?: {
            messageText?: string
            alertType?: actions.ReduxAlertType,
            custom?: any
        }
    }
    
    static contextTypes = {
        visible: React.PropTypes.bool,
        options: React.PropTypes.object
        
    }
    
    public render(): React.ReactElement<any> {

        return (
            <span>{_.get(this.context, 'options.messageText', '')}</span>
        )
    }
}

interface ICustomProps {
    customRender: (alertState: actions.IReduxAlertState) => React.ReactElement<any>
}
export class Custom extends React.Component<ICustomProps, any> {
    constructor(props: ICustomProps) {
        super(props);
    }
    
    context: actions.IReduxAlertState
    
    static contextTypes = {
        visible: React.PropTypes.bool,
        options: React.PropTypes.object
        
    }
    
    public render(): React.ReactElement<any> {
        return this.props.customRender(this.context);
    }
}