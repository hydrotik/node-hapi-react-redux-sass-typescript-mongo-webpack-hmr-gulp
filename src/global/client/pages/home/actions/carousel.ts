/// <reference path="../../../../../../typings/main.d.ts" />

export const CAROUSEL: string = 'CAROUSEL';

export const REQUEST_SLIDES: string = 'REQUEST_SLIDES';
export const RECEIVE_SLIDES: string = 'RECEIVE_SLIDES';

/* **************** Carousel Content ********************* */
export interface ICarouselAction {
    type: string;
    slides?: any[];
    receivedAt?: number;
    lastUpdated?: any;
    isFetching?: boolean;
}

export function requestSlides(): ICarouselAction {
    return { type: REQUEST_SLIDES };
}

export function receiveSlides(slides: any[]): ICarouselAction {
    return { type: RECEIVE_SLIDES, slides: slides, receivedAt: Date.now() };
}
