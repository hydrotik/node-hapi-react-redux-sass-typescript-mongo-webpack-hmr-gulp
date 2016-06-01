/// <reference path='../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';
import * as ReactDOM from'react-dom';
import * as ClassNames from 'classnames';
import * as lodash from 'lodash';


// Styles
import './_Knob.scss';

// Interfaces

interface IKnob {
    refs: {
        knobInput?: any;
    }
}

interface IKnobProps {
    value?: any;
    onChangeValue?: any;
    readOnly?: boolean;
    className?: any;
}

interface IKnobState {
  value?: number;
  degree?: number;
}

export class Knob extends React.Component<IKnobProps, IKnobState> implements IKnob {

    public constructor(props: any) {
        super(props);

        this.state = {
          value: this.props.value,
          degree: this.valueToRadian(this.props.value)
        }
    }

    ctrls: {
        knobInput?: HTMLElement;
    } = {};

    public shouldComponentUpdate(nextProps: any, nextState: any): any {
      return nextState.value !== this.state.value
    }

    public handleChange(target: EventTarget): void {
      let value:number = (target as any).value;

      this.setState({
        value: value,
        degree: this.valueToRadian(value)
      }, () => {
        if (this.props.onChangeValue) {
          this.props.onChangeValue(this.state.value)
        }
      })
    }

    public valueToRadian(value: number): number {
      return Math.round((value / 100) * 270)
    }

    public getInput(): React.ReactElement<{}> {
      if(this.props.readOnly){
        return (<input
                  type="number"
                  min={0}
                  max={100}
                  ref={(knobInput) => this.ctrls.knobInput = knobInput}
                  className="Knob-value"
                  defaultValue={this.props.value}
                />);
      }else{
        return (<input
                  type="number"
                  min={0}
                  max={100}
                  ref={(knobInput) => this.ctrls.knobInput = knobInput}
                  className="Knob-value"
                  defaultValue={this.props.value}
                  value={this.state.value}
                  onChange={ evt => this.handleChange(evt.target)}
                  onWheel={ () => (ReactDOM.findDOMNode(this.ctrls.knobInput) as HTMLElement).focus()}
                />);
      }
      
    }

    public getFill(percent:number): React.ReactElement<{}> {
      return ( percent > 50 ? <div className="pie fill"></div> : null);
    }

    public render(): React.ReactElement<{}> {

      // https://jsfiddle.net/rastrano/r53gQ/

        let deg = 360/100 * this.state.value;

        let sliceStyle: any = ClassNames({
            'slice' : true,
            'gt50' : (this.state.value > 50)
        });

        return (
            <div className="Knob">
              <div className="Knob-label">
                { this.getInput() }
              </div>
              {/*<div
                className="Knob-spinner"
                style={{
                  transform: `rotate(${-45 + this.state.degree}deg)`
                }}
              >
              </div>*/}
              <div className="timer">

                <div className={sliceStyle}>
                    <div className="pie" style={{
                      transform: `rotate(${deg}deg)`
                    }}></div>
                    { this.getFill(this.state.value) }
                 </div>

              </div>
            </div>
        );
    }
}
