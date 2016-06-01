/// <reference path='../../../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';
import { Link } from 'react-router';

// Styles
import './_NotFound.scss';

export class NotFound extends React.Component<{}, {}> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
            <section className='section-not-found container'>
                <h1 className='page-header'>Not Found</h1>
                <p>That route didn't match any handlers.</p>
                <Link to='home'>Go to home screen</Link>
            </section>
        );
    }
}
