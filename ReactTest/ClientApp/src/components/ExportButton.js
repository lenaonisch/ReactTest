"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ExportButton = /** @class */ (function (_super) {
    __extends(ExportButton, _super);
    function ExportButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExportButton.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("button", { type: "button" }, "Export")));
    };
    return ExportButton;
}(React.PureComponent));
;
//# sourceMappingURL=ExportButton.js.map