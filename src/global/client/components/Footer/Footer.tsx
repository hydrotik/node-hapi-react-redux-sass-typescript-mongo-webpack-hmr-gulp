/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react';

import './_Footer.scss';

export class Footer extends React.Component<{}, {}> {

    public render(): React.ReactElement<{}> {
        const year: number = (new Date()).getFullYear();
        return (
            <footer className='footer'>
                &copy; Your Company&nbsp;{year}
            </footer>
        );
    }
}
