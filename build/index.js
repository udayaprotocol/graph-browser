"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = tslib_1.__importDefault(require("react-dom/client"));
require("animate.css");
require("./styles.less");
require("./main.less");
const Root_1 = tslib_1.__importDefault(require("./views/Root"));
const index_1 = require("./utils/index");
const root = client_1.default.createRoot(document.getElementById("root"));
const deviceType = (0, index_1.getDeviceType)();
root.render((0, jsx_runtime_1.jsx)(Root_1.default, { deviceType: deviceType }));
//# sourceMappingURL=index.js.map