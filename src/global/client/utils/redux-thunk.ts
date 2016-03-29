/// <reference path="../../../../typings/main.d.ts" />

export function thunkMiddleware(_ref: any): any {
    const dispatch: any = _ref.dispatch;
    const getState: any = _ref.getState;

    return function (next: any): any {
        return function (action: any): any {
            return typeof action === 'function' ? action(dispatch, getState) : next(action);
        };
    };
}
