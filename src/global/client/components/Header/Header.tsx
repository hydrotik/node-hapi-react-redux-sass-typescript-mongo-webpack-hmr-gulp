/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react';
import './_Header.scss';

export class Header extends React.Component<{}, {}> {

    public render(): React.ReactElement<{}> {
        return (
            <div className='header'>
                <h1>Hello World</h1>
            </div>
        );
    }
}
