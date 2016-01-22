var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        _super.apply(this, arguments);
    }
    Default.prototype.render = function () {
        var script = <script src={this.props.js}></script>;
        return (<html>
                <head>
                    <title>{this.props.title}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet"></link>
                    <link href='https://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'></link>
                    <link rel="shortcut icon" href="favicon.ico"/>
                    </head>
                <body>
                    
                    <div className="page">
                        <div className="container">
                            {this.props.children}
                            </div>
                        </div>
                    <div className="footer">
                        <div className="container">
                            <span className="copyright pull-right">
                                &copy; 2014 Acme, Inc.
                                </span>
                            <ul className="links">
                                <li><a href="/">Home</a></li>
                                <li><a href="/contact">Contact</a></li>
                                </ul>
                            <div className="clearfix"></div>
                            </div>
                        </div>
                    {this.props.script}
                    {this.props.feet}
                    </body>
                </html>);
    };
    return Default;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Default;
