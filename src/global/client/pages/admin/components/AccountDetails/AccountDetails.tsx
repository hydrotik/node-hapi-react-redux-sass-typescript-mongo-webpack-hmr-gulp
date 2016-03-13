/// <reference path='../../../../../../../typings/tsd.d.ts' />

/*
    Maps to components/accounts/Details.jsx
*/

// Core Imports
import * as React from 'react';

// Styles
import './_AccountDetails.scss';

export class AccountDetails extends React.Component<{}, {}> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
            <section className='section-home container'>
                <div className='row'>
                    <div className='col-sm-7'>
                        <h1 className='page-header'>
                            Account Details
                        </h1>
                    </div>
                </div>
            </section>
        );
    }
}
