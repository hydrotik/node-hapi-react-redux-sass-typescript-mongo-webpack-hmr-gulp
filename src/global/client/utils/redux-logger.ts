/// <reference path='../../../../typings/tsd.d.ts' />

let repeat: (str: string, times: number) => string = function repeat(str: string, times: number): string {
  return new Array(times + 1).join(str);
};

let pad: (num: number, maxLength: number) => string = function pad(num: number, maxLength: number): string {
  return repeat('0', maxLength - num.toString().length) + num;
};

// use the new performance api to get better precision if available
let timer: any = typeof performance !== 'undefined' && typeof performance.now === 'function' ? performance : Date;

export function createLogger(): any {
  let options: any = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return function (_ref: any): any {

    let getState: any = _ref.getState;

    return function (next: any): any {
      return function (action: any): any {
        let level: any = options.level;
        let logger: any = options.logger;
        let collapsed: any = options.collapsed;
        let predicate: any = options.predicate;
        let _options$duration: any = options.duration;
        let duration: boolean = _options$duration === undefined ? false : _options$duration;
        let _options$timestamp: any = options.timestamp;
        let timestamp: boolean = _options$timestamp === undefined ? true : _options$timestamp;
        let _options$transformer: any = options.transformer;
        let transformer: (state: any) => any = _options$transformer === undefined ? function(state: any): any {
          return state;
        } : _options$transformer;
        let _options$actionTransformer: any = options.actionTransformer;
        let actionTransformer: (actn: any) => any = _options$actionTransformer === undefined ? function(actn: any): any {
          return actn;
        } : _options$actionTransformer;

        let console: any = logger || window.console;

        // exit if console undefined
        if (typeof console === 'undefined') {
          return next(action);
        }

        // exit early if predicate function returns false
        if (typeof predicate === 'function' && !predicate(getState, action)) {
          return next(action);
        }

        let started: any = timer.now();
        let prevState: any = transformer(getState());

        let returnValue: any = next(action);
        let took: any = timer.now() - started;

        let nextState: any = transformer(getState());

        // formatters
        let time: any = new Date();
        let isCollapsed: any = typeof collapsed === 'function' ? collapsed(getState, action) : collapsed;

        let formattedTime: any = timestamp ? ' @ ' +
          pad(time.getHours(), 2) + ':' +
          pad(time.getMinutes(), 2) + ':' +
          pad(time.getSeconds(), 2) + '.' +
          pad(time.getMilliseconds(), 3) : '';

        let formattedDuration: any = duration ? ' in ' + took.toFixed(2) + ' ms' : '';
        let formattedAction: any = actionTransformer(action);
        let message: string = 'action ' + formattedAction.type + formattedTime + formattedDuration;
        let startMessage: any = isCollapsed ? console.groupCollapsed : console.group;

        // render
        try {
          startMessage.call(console, message);
        } catch (e) {
          console.log(message);
        }

        if (level) {
          console[level]('%c prev state', 'color: #9E9E9E; font-weight: bold', prevState);
          console[level]('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          console[level]('%c next state', 'color: #4CAF50; font-weight: bold', nextState);
        } else {
          console.log('%c prev state', 'color: #9E9E9E; font-weight: bold', prevState);
          console.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          console.log('%c next state', 'color: #4CAF50; font-weight: bold', nextState);
        }

        try {
          console.groupEnd();
        } catch (e) {
          console.log('—— log end ——');
        }

        return returnValue;
      };
    };
  };
}
