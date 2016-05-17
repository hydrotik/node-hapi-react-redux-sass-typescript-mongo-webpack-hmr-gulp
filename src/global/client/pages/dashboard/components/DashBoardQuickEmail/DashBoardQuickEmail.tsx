/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_DashBoardQuickEmail.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';


// Interfaces
interface IDashBoardQuickEmailProps {

}

interface IDashBoardQuickEmailState {

}

export class DashBoardQuickEmail extends React.Component<IDashBoardQuickEmailProps, IDashBoardQuickEmailState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
        <form className="form">
            <h3 className="form__title">
            <span className="font-awesome font-awesome--envelope font-awesome--left"/>
            Quick Email
            </h3>
            <label className="form__label--hidden" htmlFor="name">Name:</label>
            <input className="form__input" type="text" id="name" placeholder="Name"/>

            <label className="form__label--hidden" htmlFor="email">Email:</label>
            <input className="form__input" type="email" id="email" placeholder="email@website.com"/>

            <label className="form__label--hidden" htmlFor="msg">Message:</label>
            <textarea className="form__input" id="msg" placeholder="Message..." rows="7"></textarea>

            <input className="btn--default" type="submit" value="Submit"/>
            <input className="btn--reset" type="reset" value="Reset"/>
        </form>
        );
    }
}
  