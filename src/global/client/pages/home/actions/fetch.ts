import { CAROUSEL, requestSlides, receiveSlides } from './carousel';
import { EDITORIAL, requestEditorial, receiveEditorial } from './editorial';
import { editorial, carousel } from '../fixtures';

/* **************** Abstract Fetch ********************* */
function fetchContent(type: string): any {
    let mock: any;
    let req: any;
    let rec: any;

    switch (type) {
        case CAROUSEL:
            mock = carousel;
            console.warn(mock);
            req = requestSlides;
            rec = receiveSlides;
            break;
        case EDITORIAL:
            mock = editorial;
            req = requestEditorial;
            rec = receiveEditorial;
            break;
        default:
            throw new Error('fetchContent() :: event not registered in actions.ts');
    }


    return (dispatch: any) => {
        dispatch(req());
        return dispatch(rec(mock));
    };
}

function shouldFetchContent(state: any, type: string): boolean {
    let reducer: any;
    let store: any;

    console.warn('shouldFetchContent(): ' + type);

    switch (type) {
        case EDITORIAL:
            reducer = state.editorialContent;
            store = reducer.editorial;
            break;
        case CAROUSEL:
            reducer = state.carouselContent;
            store = reducer.slides;
            break;
        default:
            throw new Error('shouldFetchContent() :: event not registered in actions.ts');
    }

    if (store.length === 0) {
        return true;
    } else if (reducer.isFetching) {
        return false;
    }
}

export function fetchContentIfNeeded(type: string, invalidate: boolean = false): any {
    console.warn('fetchContentIfNeeded(): ' + type);
    return (dispatch: any, getState: any) => {
        if (shouldFetchContent(getState(), type) || invalidate) {
            return dispatch(fetchContent(type));
        }
    };
}
