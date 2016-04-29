/// <reference path='../../../../../../../typings/main.d.ts' />

import * as React from "react";

interface IModalProps {
    children?: any;
}

interface IModalState {
}

export class Modal extends React.Component<IModalProps, IModalState> {
	constructor(props:any) {
		super(props);
	}

	render() {
		return (
			<div className="modal">
				<span className="modal__close-btn"/>
				{this.props.children}
			</div>		
		);
	}
}