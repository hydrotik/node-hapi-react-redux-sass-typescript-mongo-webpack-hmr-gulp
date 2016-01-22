var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Default_tsx_1 = require('../layouts/Default.tsx');
var Index = (function (_super) {
    __extends(Index, _super);
    function Index() {
        _super.apply(this, arguments);
    }
    Index.prototype.render = function () {
        var script = <script src={this.props.js}></script>;
        return (<Default_tsx_1.default title={this.props.title} script={script} activeTab="about">

                <div id="app"></div>

                <div className="row">
                    <div className="col-sm-6">
                        <h1 className="page-header">About us</h1>
                        <div className="media">
                            <div className="pull-left">
                                <div className="media-object">
                                    <i className="fa fa-camera-retro fa-4x"></i>
                                    </div>
                                </div>
                            <div className="media-body">
                                <h4 className="media-heading">Leo Damon</h4>
                                <p>
                                    Cras sit amet nibh libero, in gravida
                                    nulla.Nulla vel metus scelerisque ante
                                    sollicitudin commodo.Cras purus odio,
                                    vestibulum in vulputate at, tempus viverra
                                    turpis.
                                    </p>
                                </div>
                            </div>
                        <div className="media text-right">
                            <div className="pull-right">
                                <div className="media-object">
                                    <i className="fa fa-camera-retro fa-4x"></i>
                                    </div>
                                </div>
                            <div className="media-body">
                                <h4 className="media-heading">Mathew DiCaprio</h4>
                                <p>
                                    Cras sit amet nibh libero, in gravida
                                    nulla.Nulla vel metus scelerisque ante
                                    sollicitudin commodo.Cras purus odio,
                                    vestibulum in vulputate at, tempus viverra
                                    turpis.
                                    </p>
                                </div>
                            </div>
                        <div className="media">
                            <div className="pull-left">
                                <div className="media-object">
                                    <i className="fa fa-camera-retro fa-4x"></i>
                                    </div>
                                </div>
                            <div className="media-body">
                                <h4 className="media-heading">Nick Jackson</h4>
                                <p>
                                    Cras sit amet nibh libero, in gravida
                                    nulla.Nulla vel metus scelerisque ante
                                    sollicitudin commodo.Cras purus odio,
                                    vestibulum in vulputate at, tempus viverra
                                    turpis.
                                    </p>
                                </div>
                            </div>
                        </div>
                    <div className="col-sm-6 text-center">
                        <h1 className="page-header">Prestige worldwide</h1>
                        <p className="lead">
                            The first name in entertainment.
                            </p>
                        <i className="fa fa-volume-up bamf"></i>
                        </div>
                    </div>
                </Layout>);
    };
    return Index;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Index;
