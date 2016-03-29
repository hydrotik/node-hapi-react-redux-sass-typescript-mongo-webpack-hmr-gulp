/// <reference path='../../../../../../../typings/main.d.ts' />

/*
    Maps to components/admins/Details.jsx
*/

// Core Imports
import * as React from 'react';

// Styles
import './_AdminDetails.scss';

export class AdminDetails extends React.Component<{}, {}> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
            <section className='section-home container'>
                <div className='row'>
                    <div className='col-sm-7'>
                        <h1 className='page-header'>
                            Admin Details
                        </h1>
                    </div>
                </div>
            </section>
        );
    }
}
