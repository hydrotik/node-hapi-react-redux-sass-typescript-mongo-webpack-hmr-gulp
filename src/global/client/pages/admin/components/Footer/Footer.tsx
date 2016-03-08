/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_Footer.scss';

export class Footer extends React.Component<{}, {}> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
            <div className='footer'>
                <div className='container'>
                    <span className='copyright pull-right'>
                        &#169; 2014 Acme, Inc.
                    </span>
                    <ul className='links'>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/login/logout'>Sign out</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}
