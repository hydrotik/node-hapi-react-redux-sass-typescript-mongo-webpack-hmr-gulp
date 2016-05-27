/// <reference path="../../../../typings/index.d.ts" />

export interface IValidation {
    error: string;
    hasError: any;
    help: any;
}

export default function parseValidation(validation: any, message: string): IValidation {

    let response: IValidation = {
        error: '',
        hasError: {},
        help: {}
    };

    if (validation && validation.keys) {
        let forField: string = validation.keys.pop();
        let regexBecause: RegExp = /because \[(.*?)\]/;

        if (regexBecause.test(message)) {
            message = regexBecause.exec(message)[1];
        }

        response.hasError[forField] = true;
        response.help[forField] = message;
    }else if (message) {
        response.error = message;

    }

    return response;

}
