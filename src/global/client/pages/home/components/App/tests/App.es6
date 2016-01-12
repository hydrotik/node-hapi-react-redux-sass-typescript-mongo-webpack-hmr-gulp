import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

import { hasClass } from '../../../../../../test/utils/Dom.es6';
import { App } from '../App.tsx';

import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';

import { rootReducer } from '../../../reducers/reducers.ts';

import { createLogger } from '../../../utils/redux-logger.ts';
import { thunkMiddleware } from '../../../utils/redux-thunk.ts';

const logger = createLogger();

const { renderIntoDocument } = ReactTestUtils;

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(createStore);

function configureStore() {
    return createStoreWithMiddleware(rootReducer);
}

const store = configureStore();

describe('AppTest', () => {
    let component;

    it('should render with `app` class names by default', () => {
        component = renderIntoDocument(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const element = ReactDOM.findDOMNode(component);
        expect(hasClass(element, 'app')).to.be.true;
    });

});
