// Type definitions for xhr v0.1.0

declare module Xhr {

    function createXHR(uri: string, options: any, callback: any): void;
}

declare module "xhr" {
    export = Xhr;
}
