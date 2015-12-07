import React, { findDOMNode } from 'react/addons';
import { hasClass } from '../../../scripts/utilities/DomUtils.es6';
import EditorialTemplateTest from '../EditorialTemplateTest.tsx';
import { clone } from 'lodash';

import MockResponse from './fixtures/EditorialTemplateTest.json';

const { renderIntoDocument } = React.addons.TestUtils;

describe('AppTest', () => {
    let component, fixture;

    before(() => {
        fixture = clone(MockResponse);
    });

    it('should render with `editorial-template-test` class names by default', () => {
        component = renderIntoDocument(<EditorialTemplateTest {...fixture} />);
        const element = findDOMNode(component);
        expect(hasClass(element, 'editorial-template-test')).to.be.true;
    });

});
