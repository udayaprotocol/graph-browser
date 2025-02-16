"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@react-sigma/core");
const react_1 = require("react");
const canvas_utils_1 = require("../canvas-utils");
const use_debounce_1 = tslib_1.__importDefault(require("../use-debounce"));
const NODE_FADE_COLOR = "rgba(39, 52, 71, 0.5)";
const EDGE_FADE_COLOR = "#eee";
const GraphSettingsController = ({ children, hoveredNode }) => {
    const sigma = (0, core_1.useSigma)();
    const setSettings = (0, core_1.useSetSettings)();
    const graph = sigma.getGraph();
    const debouncedHoveredNode = (0, use_debounce_1.default)(hoveredNode, 40);
    (0, react_1.useEffect)(() => {
        var _a;
        const hoveredColor = (debouncedHoveredNode && ((_a = sigma.getNodeDisplayData(debouncedHoveredNode)) === null || _a === void 0 ? void 0 : _a.color)) || "";
        setSettings({
            defaultDrawNodeLabel: canvas_utils_1.drawLabel,
            defaultDrawNodeHover: canvas_utils_1.drawHover,
            nodeReducer: (node, data) => {
                if (debouncedHoveredNode) {
                    return node === debouncedHoveredNode ||
                        graph.hasEdge(node, debouncedHoveredNode) ||
                        graph.hasEdge(debouncedHoveredNode, node)
                        ? Object.assign(Object.assign({}, data), { zIndex: 1 }) : Object.assign(Object.assign({}, data), { zIndex: 1, label: "111", color: NODE_FADE_COLOR, alpha: 0.1, image: null, highlighted: false });
                }
                return data;
            },
            edgeReducer: (edge, data) => {
                if (debouncedHoveredNode) {
                    const targetEdge = graph.hasExtremity(edge, debouncedHoveredNode);
                    if (targetEdge) {
                        const type = edge.split('-')[0];
                        if (type === 'invite') {
                            return Object.assign(Object.assign({}, data), { color: '#f00', size: 4 });
                        }
                        else {
                            return Object.assign(Object.assign({}, data), { color: hoveredColor, size: 4 });
                        }
                    }
                    else {
                        return Object.assign(Object.assign({}, data), { color: EDGE_FADE_COLOR, hidden: true });
                    }
                }
                return data;
            },
        });
    }, [sigma, graph, debouncedHoveredNode]);
    (0, react_1.useEffect)(() => {
        var _a;
        const hoveredColor = (debouncedHoveredNode && ((_a = sigma.getNodeDisplayData(debouncedHoveredNode)) === null || _a === void 0 ? void 0 : _a.color)) || "";
        sigma.setSetting("nodeReducer", debouncedHoveredNode
            ? (node, data) => {
                if (node === debouncedHoveredNode ||
                    graph.hasEdge(node, debouncedHoveredNode) ||
                    graph.hasEdge(debouncedHoveredNode, node)) {
                    console.log('data', data);
                    return Object.assign(Object.assign({}, data), { zIndex: 1, forceLabel: true });
                }
                else {
                    return Object.assign(Object.assign({}, data), { zIndex: 0, label: "", color: NODE_FADE_COLOR, image: null, highlighted: false });
                }
            } : null);
        sigma.setSetting("edgeReducer", debouncedHoveredNode
            ? (edge, data) => {
                const target = graph.hasExtremity(edge, debouncedHoveredNode);
                if (target) {
                    const type = edge.split('-')[0];
                    console.log('type', type);
                    if (type === 'invite') {
                        return Object.assign(Object.assign({}, data), { color: '#40c6dd', size: 2 });
                    }
                    else if (type === 'members') {
                        return Object.assign(Object.assign({}, data), { color: '#b9326f', size: 2 });
                    }
                    else {
                        return Object.assign(Object.assign({}, data), { color: hoveredColor, size: 2 });
                    }
                }
                else {
                    return Object.assign(Object.assign({}, data), { color: EDGE_FADE_COLOR, hidden: true });
                }
            } : null);
    }, [debouncedHoveredNode]);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
exports.default = GraphSettingsController;
//# sourceMappingURL=GraphSettingsController.js.map