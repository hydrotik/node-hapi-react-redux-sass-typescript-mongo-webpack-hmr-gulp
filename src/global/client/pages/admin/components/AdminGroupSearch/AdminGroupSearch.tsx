/// <reference path='../../../../../../../typings/tsd.d.ts' />

/*
    Maps to components/admins-groups/Search.jsx
*/

// Core Imports
import * as React from 'react';

// Styles
import './_AdminGroupSearch.scss';

export class AdminGroupSearch extends React.Component<{}, {}> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
            <section className='section-home container'>
                <div className='row'>
                    <div className='col-sm-7'>
                        <h1 className='page-header'>
                            Admin Group Search
                        </h1>
                    </div>
                </div>
            </section>
        );
    }
}
