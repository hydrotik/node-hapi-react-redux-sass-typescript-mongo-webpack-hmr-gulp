import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

import { hasClass } from '../../../../../../test/utils/Dom.es6';
import App from '../App.tsx';
import { clone } from 'lodash';

import MockResponse from './fixtures/App.json';

const { renderIntoDocument } = ReactTestUtils;

describe('AppTest', () => {
    let component, fixture;

    before(() => {
        fixture = clone(MockResponse);
    });

    it('should render with `editorial-template-test` class names by default', () => {
        component = renderIntoDocument(<App {...fixture} />);
        const element = ReactDOM.findDOMNode(component);
        expect(hasClass(element, 'editorial-template-test')).to.be.true;
    });

});
