import * as React from 'react';
import {connect} from 'react-redux';
import {Alert} from 'react-bootstrap';
import * as actions from './actions';

export {ReduxAlertType} from './actions';

interface IReduxAlert {
    id: string
    visible?: boolean
    options?: {
        alertType?: actions.ReduxAlertType,
        messageText?: string,
        custom?: any
    }
    onDismissHandler?: (data: any) => any
}

function mapStateToProps(state, ownProps) {
    let reduxAlertState: actions.IReduxAlertState = _.get(state, 'reduxAlertReducer.ids.'+ownProps.id, undefined);
    return {
        visible: _.get(reduxAlertState, 'visible', false),
        options: _.get(reduxAlertState, 'options', {})
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onDismissHandler: function(e: any) {
            return dispatch(actions.reduxAlertDismiss(this.props.id));
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class ReduxAlert extends React.Component<IReduxAlert, {}> {
    static defaultProps = {
        type: actions.ReduxAlertType.Info,
        visible: false
    }
    
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

    
    constructor(props: IReduxAlert) {
        super(props);
        
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
    
    public render(): React.ReactElement<{}> {
        const {
            visible,
            options,
            onDismissHandler,
            children
        } = this.props;
        
        return (
            <div className="reduxAlert">
                {
                    visible ? 
             
                        <Alert bsStyle={this.bsStyleMap(options.alertType)} onDismiss={onDismissHandler.bind(this)}>
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