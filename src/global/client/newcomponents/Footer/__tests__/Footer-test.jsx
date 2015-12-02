import React from 'react/addons';
import Footer from '../Footer.jsx';
import { expect } from 'chai';

const { TestUtils } = React.addons;

describe('Footer', () => {
    it('Should have the correct footer element', () => {
        const footer = TestUtils.renderIntoDocument(
            <Footer />
        );
        const footerElem = React.findDOMNode(footer);
        expect(footerElem.tagName.toLowerCase()).to.equal('footer');
    });
});
