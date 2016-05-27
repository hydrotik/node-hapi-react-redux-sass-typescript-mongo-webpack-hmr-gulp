/// <reference path='../../../../typings/index.d.ts' />

// Global Action Constants here...

/* **************** NavBar Action Constant ******************* */
export const NAVBAR_OPEN: string = 'NAVBAR_OPEN';

export const NAVBAR_COLLAPSE: string = 'NAVBAR_COLLAPSE';

// Global Actions here...

/* **************** NavBar Action Interface ****************** */
export interface INavBarAbstract {
    type: string;
}

export interface INavBarAction extends INavBarAbstract {
    navBarOpen: boolean;
}

/* **************** NavBar Action Event ********************** */
export function openNavBar(): INavBarAbstract {
    return { type: NAVBAR_OPEN };
}

export function collapseNavBar(): INavBarAbstract {
    return { type: NAVBAR_COLLAPSE };
}
