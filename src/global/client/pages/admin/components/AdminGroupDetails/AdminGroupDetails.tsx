/// <reference path='../../../../../../../typings/main.d.ts' />

/*
    Maps to components/admins-groups/Details.jsx
*/

// Core Imports
import * as React from 'react';

// Styles
import './_AdminGroupDetails.scss';

export class AdminGroupDetails extends React.Component<{}, {}> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
            <section className='section-home container'>
                <div className='row'>
                    <div className='col-sm-7'>
                        <h1 className='page-header'>
                            Admin Group Details
                        </h1>
                    </div>
                </div>
            </section>
        );
    }
}
