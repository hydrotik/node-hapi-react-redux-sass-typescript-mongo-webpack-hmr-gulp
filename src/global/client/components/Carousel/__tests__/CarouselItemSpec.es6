import React, { findDOMNode } from 'react/addons';
import { hasClass } from '../../../../../scripts/utilities/DomUtils.es6';
import CarouselItem from '../CarouselItem.jsx';
import { clone } from 'lodash';

import MockResponse from '../../../__tests__/fixtures/EditorialTemplateTest.json';

const { renderIntoDocument } = React.addons.TestUtils;

describe('CarouselItem', () => {
    let item, component, fixture;

    before(() => {
        fixture = clone(MockResponse);
        item = fixture.slides[0];
    });

    it('should render with `carouselitem` class names by default', () => {
        component = renderIntoDocument(<CarouselItem item={item} />);
        const element = findDOMNode(component);
        expect(hasClass(element, 'carouselitem')).to.be.true;
    });

});
