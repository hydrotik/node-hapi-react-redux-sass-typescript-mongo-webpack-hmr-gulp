/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';

import './_Footer.scss';

export class Footer extends React.Component<{}, {}> {

    public render(): React.ReactElement<{}> {
        const year: number = (new Date()).getFullYear();
        return (
            <div className='footer'>
                <div className='container'>
                    <span className='copyright pull-right'>
                        &#169; {year} Company Name
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
