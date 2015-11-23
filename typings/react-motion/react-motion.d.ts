// Type definitions for React Motion v0.3.1
// Project: https://github.com/chenglou/react-motion
// Definitions by: Donovan Adams <https://github.com/hydrotik>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="./../react/react.d.ts" />

declare module ReactMotion {
	export var Spring: any;
	export var TransitionSpring: any;
	export var Motion: any;
	export var StaggeredMotion: any;
	export var TransitionMotion: any;

	export var spring: any;
	export var presets: any;
	export const utils: any;
}

declare module "react-motion" {
    export = ReactMotion;
}
