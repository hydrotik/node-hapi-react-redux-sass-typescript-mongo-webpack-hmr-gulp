/// <reference path="../../../../typings/tsd.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export const defaultRect: any = { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
const identity: any = ( x: any ) => x;




interface ITrackProps {
    ref?: any;
    children?: any;
    formulas?: any[];
}

interface ITrackState {
    formulas?: any[];
    component?: string;
    rect?: any;
    node?: any;
}

@DecoratedComponent
export class Track extends React.Component<ITrackProps, ITrackState> {

    public constructor(props: ITrackProps) {
        super(props);

        this.state = { formulas: [identity] };
    }

    public componentWillReceiveProps(): void {
        const node: any = ReactDOM.findDOMNode(this.props.ref);
        const rect: any = node.getBoundingClientRect();
        this.setState({ rect, node });
    }

    public render(): React.ReactElement<{}> {

        const { rect = defaultRect, node }: ITrackState = this.state;

        return (
            this.props.children(DecoratedComponent, ...this.props.formulas.map((formula: any) => formula(rect, node)))
        );
    }

}

interface IDecoratedComponentProps {
    ref?: any;
    component?: any;
}

class DecoratedComponent extends React.Component<IDecoratedComponentProps, {}> {

    public render(): React.ReactElement<{}> {
        const { ref = this.props.ref || identity }: IDecoratedComponentProps = this.props;

        const props: IDecoratedComponentProps = this.props;

        console.log(props);

        return (<props.component
                      {... this.props }
            {...this.props }
            ref = { (r: any) => ref(this.props.ref = r) } />);
    }
}

interface ITrackDocumentProps {
    children?: any;
    formulas?: any[];
}

interface ITrackDocumentState {
    rect?: any;
}

export class TrackDocument extends React.Component<ITrackDocumentProps, ITrackDocumentState> {

    public constructor(props: ITrackDocumentProps) {
        super(props);

        this.state = {};
    }

    public componentDidMount(): void {
        window.addEventListener('scroll', (event: any) => {
            this.setState({ rect: document.documentElement.getBoundingClientRect() });
        });
    }

    public render(): React.ReactElement<{}> {

        let { rect }: ITrackDocumentState = this.state;

        let element: any = typeof document !== 'undefined' && document.documentElement;

        if (!rect) {
            if (element) {
                rect = element.getBoundingClientRect();
            } else {
                rect = defaultRect;
                element = null;
            }
        }
        return (<div>
             { this.props.children(... this.props.formulas.map((formula: any) => formula(rect, element))) }
             </div>
        );
    }

}

/*



export class Track extends React.Component<{}, {}> {
  static propTypes = { ref: React.PropTypes.func,
                       children: React.PropTypes.func.isRequired, 
                       formulas: React.PropTypes.array }
                       
  static defaultProps = { formulas: [identity], component: 'div' }
  
  constructor(props) {
    super(props);
    
    const self = this;
    
    this.DecoratedComponent = class extends Component {
      static propTypes = { ref: React.PropTypes.func }
      
      render() {
        const {ref = props.ref || identity} = this.props;
        
        return <props.component 
                  {...props} 
                  {...this.props} 
                  ref={r => ref(self.nodeRef = r)} />
      }
    }
    this.state = {};
  }
  
  componentWillReceiveProps() {
    const node = React.findDOMNode(this.nodeRef);
    const rect = node.getBoundingClientRect();
    this.setState({rect, node});
  }

  render() {
    const {rect=defaultRect, node={}} = this.state;
    return this.props.children(this.DecoratedComponent, 
      ...this.props.formulas.map(formula => formula(rect, node)));
  }
}

export class TrackDocument extends React.Component<{}, {}> {
  static propTypes = { children: React.PropTypes.func.isRequired, 
                       formulas: React.PropTypes.array }
                       
  static defaultProps = { formulas: [identity] }

  constructor(props) {
    super(props);
    this.state = { rect: null };
  }
  
  componentDidMount() {
    window.addEventListener('scroll', event => {
      this.setState({ rect: document.documentElement.getBoundingClientRect() });
    });
  }

  render() {
    let {rect} = this.state;
    let element = typeof document !== 'undefined' && document.documentElement;
    if (!rect) {
      if (element) {
        rect = element.getBoundingClientRect();
      } else {
        rect = defaultRect;
        element = {}; // bah
      }
    }
    return this.props.children(...this.props.formulas.map(formula => formula(rect, element)))
  }
}

export class TrackedDiv extends React.Component<{}, {}> { {
  static propTypes = { children: React.PropTypes.func.isRequired,
                       formulas: React.PropTypes.array,
                       component: React.PropTypes.oneOfType([React.PropTypes.element, 
                                                             React.PropTypes.string]) }
                       
  static defaultProps = { formulas: [identity], component: 'div' }
  
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentWillReceiveProps() {
    const node = React.findDOMNode(this.div);
    const rect = node.getBoundingClientRect();
    this.setState({rect, node});
  }

  render() {
    const {rect=defaultRect, node={}} = this.state;
    const {component:Comp} = this.props;
    return <Comp ref={r => this.div = r} {...this.props}>
      {this.props.children(...this.props.formulas.map(formula => formula(rect, node)))}
    </Comp>;
  }
}

*/
