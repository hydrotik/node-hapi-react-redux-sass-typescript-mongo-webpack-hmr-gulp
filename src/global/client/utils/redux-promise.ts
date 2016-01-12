/// <reference path="../../../../typings/tsd.d.ts" />

import * as lodash from 'lodash';
var _fluxStandardAction = require('flux-standard-action');

function isPromise(val) {
  return val && typeof val.then === 'function';
}

export function promiseMiddleware(_ref) {
  var dispatch = _ref.dispatch;

  return function (next) {
    return function (action) {
      if (!_fluxStandardAction.isFSA(action)) {
        return isPromise(action) ? action.then(dispatch) : next(action);
      }

      return isPromise(action.payload) ? action.payload.then(function (result) {
        return dispatch(lodash.assign(action, { payload: result }));
      }, function (error) {
        return dispatch(lodash.assign(action, { payload: error, error: true }));
      }) : next(action);
    };
  };
}