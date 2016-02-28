/// <reference path="../../../../../../typings/tsd.d.ts" />

import Fetch from '../../../api/jsonfetch';
// import fetch from 'isomorphic-fetch';

export const SEND_REQUEST: string = 'SEND_REQUEST';
export const RECEIVE_RESPONSE: string = 'RECEIVE_RESPONSE';

/* **************** Form Send Action Interface ****************** */
export interface IFormSendRequestAction {
    type: string;
    data?: any;
}

/* **************** Form Send Action Event ********************** */
export function sendRequest(data: any): IFormSendRequestAction {
    return { type: SEND_REQUEST, data: data };
}

/* **************** Form Recieve Action Interface ****************** */
export interface IRecieveResponseAction {
    type: string;
    response?: any;
}

/* **************** Form Recieve Action Event ********************** */
export function recieveResponse(response: any): IRecieveResponseAction {
    return { type: RECEIVE_RESPONSE, response: response };
}


/*
function fetchPosts(subreddit) {
    return dispatch => {
        dispatch(requestPosts(subreddit))
        return fetch(`http://www.reddit.com/r/${subreddit}.json`)
            .then(req => req.json())
            .then(json => dispatch(receivePosts(subreddit, json)))
    }
}

function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit]
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(subreddit) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit))
        }
    }
}
*/

// Interface for Data
export function handleRequest(data: any): void {

    // dispatch(VIEW_ACTION, Types.SEND_REQUEST, data);

    // Link to Action Interface!
    let request: any = {
        method: 'POST',
        url: '/api/signup',
        data: data
    };

    /*
    fetch('//offline-news-api.herokuapp.com/stories')
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
        console.log(stories);
    });
    */

    Fetch(request, function(err: Error, response: any): void {

        // if (!err) {
        //     window.location.href = '/account';
        //     response.success = true;
        // }
        console.warn('request reponse:');
        console.warn(response);
        // dispatch(RECEIVE_RESPONSE, response);
    });
}
