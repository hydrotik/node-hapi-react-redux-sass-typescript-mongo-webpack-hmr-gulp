/* tslint:disable:no-bitwise */
export const topTop: any = (containerRect: any) => (rect: any) =>
    ~~(rect.top - containerRect.top);

export const topBottom: any = (containerRect: any, container: any) => (rect: any) =>
    ~~(rect.top - containerRect.top - container.clientHeight);

export const topCenter: any = (containerRect: any, container: any) => (rect: any) =>
    ~~(rect.top - containerRect.top - container.clientHeight / 2);

export const centerTop: any = (containerRect: any) => (rect: any) =>
    ~~(rect.top + rect.height / 2 - containerRect.top);

export const centerCenter: any = (containerRect: any, container: any) => (rect: any) =>
    ~~(rect.top + rect.height / 2 - containerRect.top - container.clientHeight / 2);

export const centerBottom: any = (containerRect: any, container: any) => (rect: any) =>
    ~~(rect.top + rect.height / 2 - containerRect.top - container.clientHeight);

export const bottomBottom: any = (containerRect: any, container: any) => (rect: any) =>
    ~~(rect.bottom - containerRect.top - container.clientHeight);

export const bottomTop: any = (containerRect: any) => (rect: any) =>
    ~~(rect.bottom - containerRect.top);

export const bottomCenter: any = (containerRect: any, container: any) => (rect: any) =>
    ~~(rect.bottom - containerRect.top - container.clientHeight / 2);

export const getDocumentRect: any = (documentRect: any) => documentRect;
export const getDocumentElement: any = (_: any, documentElement: any) => documentElement;
export const calculateScrollY: any = ({top}: { top: number }) => -top;
/* tslint:enable:no-bitwise */
