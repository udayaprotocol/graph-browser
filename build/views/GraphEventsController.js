"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@react-sigma/core");
const react_1 = require("react");
const GraphEventsController = ({ setHoveredNode, children, }) => {
    const registerEvents = (0, core_1.useRegisterEvents)();
    (0, react_1.useEffect)(() => {
        registerEvents({
            clickNode(target) {
                const { node } = target;
                console.log("clickNode", target, node);
                setHoveredNode(node);
            },
            clickStage(target) {
                console.log("clickStage", target);
                setHoveredNode(null);
            },
        });
    }, []);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
exports.default = GraphEventsController;
//# sourceMappingURL=GraphEventsController.js.map