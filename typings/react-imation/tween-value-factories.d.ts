// Type definitions for React Track v0.5.3
// Project: https://github.com/gilbox/react-imation
// Definitions by: Donovan Adams <https://github.com/hydrotik>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../react/react.d.ts" />



declare module "react-imation/tween-value-factories" {

    export function rgb(...value: number[]): string;
    export function rgba(...value: number[]): string;
    export function scale(...value: number[]): string;
    export function deg(value?: any): string;
    export function grad(value?: any): string;
    export function rad(value?: any): string;
    export function turn(value?: any): string;
    export function rotate(value?: any): string;
    export function rotateX(value?: any): string;
    export function rotateY(value?: any): string;
    export function rotateZ(value?: any): string;
    export function skewX(value?: any): string;
    export function skewY(value?: any): string;
    export function px(value?: any): string;
    export function em(value?: any): string;
    export function vw(value?: any): string;
    export function vh(value?: any): string;
    export function percent(value?: any): string;
    export function translateX(value?: any): string;
    export function translateY(value?: any): string;
    export function translate(...value: number[]): string;
    export function translate3d(...value: number[]): string;
}