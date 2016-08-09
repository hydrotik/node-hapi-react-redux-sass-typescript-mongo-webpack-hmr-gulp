import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as _ from 'lodash';

import {REDUCER_NAME} from './reducers';
import * as actions from './actions';

// "Pure" stateless function
const mapStateToProps = (state) => {
    return {
        currentCount: _.get(state, REDUCER_NAME + ".count")
    }
}

// "Pure" stateless function
const mapDispatchToProps = (dispatch) => {
    return {
        buttonClickHandler: () => {
            dispatch(actions.increment())
        }
    }
}

// "Pure" stateless component
class Counter extends Component {
    constructor(props) {
        super(props)

        this.buttonClickHandler = props.buttonClickHandler.bind(this);
    }

    render() {
        const {
            currentCount
        } = this.props;

        return (
            <div>
                <button onClick={this.buttonClickHandler}>
                    Increment! { currentCount }
                </button>
            </div>
        )
    }
}

Counter.propTypes = {
    currentCount: React.PropTypes.number
}

Counter.defaultProps = {
    currentCount: 0
}

// Higher-order component usage
export default connect(mapStateToProps, mapDispatchToProps)(Counter);