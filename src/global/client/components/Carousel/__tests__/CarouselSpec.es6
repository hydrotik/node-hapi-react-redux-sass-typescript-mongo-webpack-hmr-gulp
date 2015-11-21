import React, { findDOMNode } from 'react/addons';
import { hasClass } from '../../../../../scripts/utilities/DomUtils.es6';
import Carousel from '../Carousel.jsx';

const { renderIntoDocument } = React.addons.TestUtils;

/* TODO Add Fixture! */

describe('Carousel', () => {

    it('should render with `carousel` class names by default', () => {
        const component = renderIntoDocument(<Carousel />);
        const element = findDOMNode(component);
        expect(hasClass(element, 'carousel')).to.be.true;
    });

});
