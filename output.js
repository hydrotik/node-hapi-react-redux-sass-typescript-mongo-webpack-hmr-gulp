var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("layouts/Default", ["require", "exports", 'react'], function (require, exports, React) {
    "use strict";
    var Layout = (function (_super) {
        __extends(Layout, _super);
        function Layout() {
            _super.apply(this, arguments);
        }
        Layout.prototype.render = function () {
            return (React.createElement("html", null, React.createElement("head", null, React.createElement("title", null, "TEST ", this.props.title), React.createElement("meta", {charSet: "utf-8"}), React.createElement("meta", {name: "viewport", content: "width=device-width, initial-scale=1.0"}), React.createElement("link", {href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css", rel: "stylesheet"}), React.createElement("link", {href: 'https://fonts.googleapis.com/css?family=Varela+Round', rel: 'stylesheet', type: 'text/css'}), React.createElement("link", {rel: "shortcut icon", href: "favicon.ico"})), React.createElement("body", null, React.createElement("div", {className: "page"}, React.createElement("div", {className: "container"}, this.props.children)), React.createElement("div", {className: "footer"}, React.createElement("div", {className: "container"}, React.createElement("span", {className: "copyright pull-right"}, "© 2014 Acme, Inc."), React.createElement("ul", {className: "links"}, React.createElement("li", null, React.createElement("a", {href: "/"}, "Home")), React.createElement("li", null, React.createElement("a", {href: "/contact"}, "Contact"))), React.createElement("div", {className: "clearfix"}))), this.props.script, this.props.feet)));
        };
        return Layout;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Layout;
});
define("home/IndexView", ["require", "exports", 'react', "layouts/Default"], function (require, exports, React, Default_1) {
    "use strict";
    var Index = (function (_super) {
        __extends(Index, _super);
        function Index() {
            _super.apply(this, arguments);
        }
        Index.prototype.render = function () {
            var script = React.createElement("script", {src: this.props.js});
            return (React.createElement(Default_1.default, {title: "Home", script: script, activeTab: "home"}, React.createElement("div", {id: "app"}), React.createElement("div", {className: "jumbotron"}, React.createElement("h1", null, "Success"), React.createElement("div", {className: "lead"}, "Your Node.js website and user system is running.May" + ' ' + "the force be with you.", React.createElement("div", null, React.createElement("a", {className: "btn btn-primary btn-lg", href: "/signup"}, "Create an account"), "  or  ", React.createElement("a", {className: "btn btn-warning btn-lg", href: "/login/forgot"}, "Reset your password")))), React.createElement("div", {className: "row"}, React.createElement("div", {className: "col-sm-4"}, React.createElement("div", {className: "panel panel-default"}, React.createElement("div", {className: "panel-body"}, React.createElement("h3", null, "About us"), React.createElement("p", null, "At vero eos et accusamus et iusto odio" + ' ' + "dignissimos ducimus qui blanditiis" + ' ' + "praesentium voluptatum deleniti atque" + ' ' + "corrupti."), React.createElement("a", {href: "/about", className: "btn btn-default btn-block"}, "Learn more")))), React.createElement("div", {className: "col-sm-4"}, React.createElement("div", {className: "panel panel-default"}, React.createElement("div", {className: "panel-body"}, React.createElement("h3", null, "Sign up"), React.createElement("p", null, "At vero eos et accusamus et iusto odio" + ' ' + "dignissimos ducimus qui blanditiis" + ' ' + "praesentium voluptatum deleniti atque" + ' ' + "corrupti."), React.createElement("a", {href: "/signup", className: "btn btn-default btn-block"}, "Learn more")))), React.createElement("div", {className: "col-sm-4"}, React.createElement("div", {className: "panel panel-default"}, React.createElement("div", {className: "panel-body"}, React.createElement("h3", null, "Contact us"), React.createElement("p", null, "At vero eos et accusamus et iusto odio" + ' ' + "dignissimos ducimus qui blanditiis" + ' ' + "praesentium voluptatum deleniti atque" + ' ' + "corrupti."), React.createElement("a", {href: "/contact", className: "btn btn-default btn-block"}, "Learn more")))))));
        };
        return Index;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Index;
});
