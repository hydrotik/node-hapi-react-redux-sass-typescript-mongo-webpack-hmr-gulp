import './_App.scss';

import React, { Component } from 'react';
//import AppActions from '../../actions/AppActions';
//import SlidesStore from '../../stores/SlidesStore';
import ReactPicture from 'react-picture';


/* App Components */
import Header from '../Header/Header';
import CallToAction from '../CallToAction/CallToAction';
import Carousel from '../Carousel/Carousel';
import ColumnContainer from '../ColumnContainer/ColumnContainer';
import ImageContainer from '../ImageContainer/ImageContainer';
//import ParallaxContainer from '../ParallaxContainer/ParallaxContainer';
import ContentRow from '../ContentRow/ContentRow';
import Footer from '../Footer/Footer';
import RowContainer from '../RowContainer/RowContainer';
import SectionContainer from '../SectionContainer/SectionContainer';

const Img = ReactPicture.BaseImage;

//import { Provider } from 'react-redux';

import configureStore from '../../stores/configureStore.es6';

const store = configureStore();

const displayName = 'App';

class App extends Component {

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {

        let gutter = 20;

        return (
            <div className = "app">
            <Header />
            <Carousel store={store} />
            <SectionContainer
        { ... {
            fullWidth: true,
                gutter:20
        } }>
    <RowContainer>
        <ColumnContainer>
        <ImageContainer { ... {
            width: 6,
                height: 2,
                url: 'http://s7d9.scene7.com/is/image/LordandTaylor/lt-edtrl-beauty-082615-0.0.1-model-hero?scl=1&fmt=png-alpha'
        } } />
    <CallToAction
        description='A full width section with a message related to the content.'
        clickAreaAll={false}
        href='http://www.google.com'
        label='Explore the Collection'
        target='_blank' />
            </ColumnContainer>
            </RowContainer>
            </SectionContainer>

            <SectionContainer>
            <RowContainer>
            <ColumnContainer>
            <ImageContainer { ... {
            width: 1,
                height: 1,
                url: 'http://unsplash.it/2000/3000?random=5'
        } } />
    <CallToAction
        position='left middle'
        href='http://www.google.com'
        target='_blank'
        description='A message related to the content.'/>
            </ColumnContainer>
            <ColumnContainer>
            <ImageContainer { ... {
            width: 1,
                height: 1,
                url: 'http://unsplash.it/2000/3000?random=6'
        } } />
    <CallToAction
        label='Shop'
        position='right middle'
        href='http://www.google.com'
        target='_blank'
        description='A message related to the content.'/>
            </ColumnContainer>
            </RowContainer>
            </SectionContainer>

            <SectionContainer { ... {
            gutter: gutter
        } } >
    <RowContainer>
        <ColumnContainer>
        <ImageContainer { ... {
            width: 1,
                height: 1,
                gutter:gutter,
                url: 'http://unsplash.it/2000/3000?random=2'
        } } />
    <CallToAction
        label='Shop Now'
        position='bottom center'
        href='http://www.google.com'
        target='_blank'
        description='A message related to the content.'/>
            </ColumnContainer>
            <ColumnContainer>
            <ImageContainer { ... {
            width: 1,
                height: 1,
                gutter:gutter,
                url: 'http://unsplash.it/2000/3000?random=3'
        } } />
    <CallToAction
        label='Shop Now'
        position='bottom center'
        href='http://www.google.com'
        target='_blank'
        description='A message related to the content.'/>
            </ColumnContainer>
            <ColumnContainer>
            <ImageContainer { ... {
            width: 1,
                height: 1,
                gutter:gutter,
                url: 'http://unsplash.it/2000/3000?random=4'
        } } />
    <CallToAction
        llabel='Shop Now'
        position='bottom center'
        href='http://www.google.com'
        target='_blank'
        description='A message related to the content.'/>
            </ColumnContainer>
            </RowContainer>
            </SectionContainer>

            <SectionContainer { ... {
            gutterBottom: gutter
        } } >
    <RowContainer>

        <ColumnContainer>
        <RowContainer>
        <ColumnContainer>
        <ImageContainer { ... {
            width: 2,
                height: 1,
                url: 'http://unsplash.it/2000/3000?random=7'
        } } />
    <CallToAction
        label='Shop Now'
        position='bottom left'
        href='http://www.google.com'
        target='_blank'
        description='A message related to the content.'/>
            </ColumnContainer>
            </RowContainer>


            <RowContainer>
            <ColumnContainer>
            <ImageContainer { ... {
            width: 1,
                height: 1,
                url: 'http://unsplash.it/2000/3000?random=8'
        } } />
    <CallToAction
        label='Shop Now'
        position='bottom left'
        href='http://www.google.com'
        target='_blank'
        description='A message related to the content.'/>
            </ColumnContainer>
            </RowContainer>

            </ColumnContainer>

            <ColumnContainer>
            <ImageContainer { ... {
            width: 2,
                height: 3,
                url: 'http://unsplash.it/2000/3000?random=1'
        } } />
    <CallToAction
        label='Shop Now'
        position='right middle'
        href='http://www.google.com'
        target='_blank'
        description='A message related to the content.'/>
            </ColumnContainer>

            </RowContainer>
            </SectionContainer>

            <SectionContainer>
            <RowContainer>

            <ColumnContainer>
            <ImageContainer { ... {
            width: 2,
                height: 3,
                url: 'http://unsplash.it/2000/3000?random=19'
        } } />
    <CallToAction
        label='Shop Now'
        position='right middle'
        href='http://www.google.com'
        target='_blank'
        description='A message related to the content.'/>
            </ColumnContainer>

            <ColumnContainer>
            <RowContainer>
            <ColumnContainer>
            <ImageContainer { ... {
            width: 4,
                height: 2,
                url: 'http://unsplash.it/2000/3000?random=10'
        } } />
    <CallToAction
        label='Shop Now'
        position='bottom'
        href='http://www.google.com'
        target='_blank'
        description='A message related to the content.'/>
            </ColumnContainer>
            </RowContainer>


            <RowContainer>
            <ColumnContainer>
            <ImageContainer { ... {
            width: 4,
                height: 2,
                url: 'http://unsplash.it/2000/3000?random=11'
        } } />
    <CallToAction
        label='Shop Now'
        position='bottom'
        href='http://www.google.com'
        target='_blank'
        description='A message related to the content.'/>
            </ColumnContainer>
            </RowContainer>

            <RowContainer>
            <ColumnContainer>
            <ImageContainer { ... {
            width: 4,
                height: 2,
                url: 'http://unsplash.it/2000/3000?random=12'
        } } />
    <CallToAction
        label='Shop Now'
        position='bottom'
        href='http://www.google.com'
        target='_blank'
        description='A message related to the content.'/>
            </ColumnContainer>
            </RowContainer>

            </ColumnContainer>

            </RowContainer>
            </SectionContainer>


            <SectionContainer { ... {
            gutter:gutter,
        } }>
    <RowContainer>
        <ColumnContainer>
        <ImageContainer { ... {
            width: 1,
                height: 1,
                gutter:gutter,
                url: 'http://unsplash.it/2000/3000?random=13'
        } } />
    <CallToAction
        label='Shop Now'
        href='http://www.google.com'
        target='_blank'
        description='A message related to the content.'/>
            </ColumnContainer>
            <ColumnContainer>
            <ImageContainer { ... {
            width: 1,
                height: 1,
                gutter:gutter,
                url: 'http://unsplash.it/2000/3000?random=14'
        } } />
    <CallToAction
        label='Shop Now'
        href='http://www.google.com'
        target='_blank'
        description='A message related to the content.'/>
            </ColumnContainer>
            <ColumnContainer>
            <ImageContainer { ... {
            width: 1,
                height: 1,
                gutter:gutter,
                url: 'http://unsplash.it/2000/3000?random=15'
        } } />
    <CallToAction
        label='Shop Now'
        href='http://www.google.com'
        target='_blank'
        description='A message related to the content.'/>
            </ColumnContainer>
            <ColumnContainer>
            <ImageContainer { ... {
            width: 1,
                height: 1,
                gutter:gutter,
                url: 'http://unsplash.it/2000/3000?random=16'
        } } />
    <CallToAction
        label='Shop Now'
        href='http://www.google.com'
        target='_blank'
        description='A message related to the content.'/>
            </ColumnContainer>
            </RowContainer>
            </SectionContainer> <Footer />
            </div>
    );
    }
}

App.displayName = displayName;

export default App;
