/// <reference path='../../../../../../../typings/main.d.ts' />

/*
    Maps to components/users/Search.jsx
*/

// Core Imports
import * as React from 'react';

// Styles
import './_UserSearch.scss';

export class UserSearch extends React.Component<{}, {}> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
            <section className='section-home container'>
                <div className='row'>
                    <div className='col-sm-7'>
                        <h1 className='page-header'>
                            User Search
                        </h1>
                    </div>
                </div>
            </section>
        );
    }
}
