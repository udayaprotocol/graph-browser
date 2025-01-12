"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@react-sigma/core");
const edge_curve_1 = tslib_1.__importDefault(require("@sigma/edge-curve"));
const graphology_1 = require("graphology");
const lodash_1 = require("lodash");
const react_1 = require("react");
const bi_1 = require("react-icons/bi");
const bs_1 = require("react-icons/bs");
const gr_1 = require("react-icons/gr");
const canvas_utils_1 = require("../canvas-utils");
const GraphDataController_1 = tslib_1.__importDefault(require("./GraphDataController"));
const GraphEventsController_1 = tslib_1.__importDefault(require("./GraphEventsController"));
const GraphSettingsController_1 = tslib_1.__importDefault(require("./GraphSettingsController"));
const SideBar_1 = tslib_1.__importDefault(require("../components/SideBar"));
const ProjectColor = 'rgba(194, 160, 190, 0.7)';
const Root = () => {
    const graph = (0, react_1.useMemo)(() => new graphology_1.DirectedGraph(), []);
    const [showContents, setShowContents] = (0, react_1.useState)(false);
    const [dataReady, setDataReady] = (0, react_1.useState)(false);
    const [dataset, setDataset] = (0, react_1.useState)(null);
    const [filtersState, setFiltersState] = (0, react_1.useState)({
        clusters: {},
        tags: {},
    });
    const [hoveredNode, setHoveredNode] = (0, react_1.useState)(null);
    const sigmaSettings = (0, react_1.useMemo)(() => ({
        edgeProgramClasses: { curve: edge_curve_1.default, },
        defaultDrawNodeLabel: canvas_utils_1.drawLabel,
        defaultDrawNodeHover: canvas_utils_1.drawHover,
        defaultNodeType: "circle",
        defaultEdgeType: "curve",
        labelDensity: 0.07,
        labelGridCellSize: 60,
        labelRenderedSizeThreshold: 15,
        labelFont: "Lato, sans-serif",
        zIndex: true,
    }), []);
    (0, react_1.useEffect)(() => {
        try {
            fetch(`./dataset.json`)
                .then((res) => res.json())
                .then((dataset) => {
                const clusters = (0, lodash_1.keyBy)(dataset.clusters, "key");
                const tags = (0, lodash_1.keyBy)(dataset.tags, "key");
                dataset.nodes.forEach((node) => {
                    try {
                        graph.addNode(node.key, Object.assign(Object.assign(Object.assign({}, node), (0, lodash_1.omit)(clusters[node.cluster], "key")), { image: `./images/${tags[node.tag].image}` }));
                    }
                    catch (error) {
                    }
                });
                dataset.edges.forEach(([source, target]) => {
                    graph.addEdge(source, target, { size: 1, color: 'rgba(123, 155, 212, 0.7)' });
                });
                graph.forEachNode((node, attrs) => {
                    graph.setNodeAttribute(node, "size", 10);
                    graph.setNodeAttribute(node, "color", 'rgba(73, 94, 152, 0.7)');
                    const isProject = ['Organization', 'Person', 'Technology', 'Tool', 'Event', 'Concept'];
                    if (isProject.includes(attrs.tag)) {
                        graph.setNodeAttribute(node, "color", ProjectColor);
                    }
                });
                setFiltersState({
                    clusters: (0, lodash_1.mapValues)((0, lodash_1.keyBy)(dataset.clusters, "key"), (0, lodash_1.constant)(true)),
                    tags: (0, lodash_1.mapValues)((0, lodash_1.keyBy)(dataset.tags, "key"), (0, lodash_1.constant)(true)),
                });
                setDataset(dataset);
                requestAnimationFrame(() => setDataReady(true));
            });
        }
        catch (error) {
            console.log('fetching data', error);
        }
    }, []);
    if (!dataset)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { id: "app-root", className: showContents ? "show-contents" : "", children: (0, jsx_runtime_1.jsxs)(core_1.SigmaContainer, { graph: graph, settings: sigmaSettings, className: "react-sigma", children: [(0, jsx_runtime_1.jsx)(GraphSettingsController_1.default, { hoveredNode: hoveredNode }), (0, jsx_runtime_1.jsx)(GraphEventsController_1.default, { setHoveredNode: setHoveredNode }), (0, jsx_runtime_1.jsx)(GraphDataController_1.default, { filters: filtersState }), dataReady && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "controls", children: [(0, jsx_runtime_1.jsx)("div", { className: "react-sigma-control ico", children: (0, jsx_runtime_1.jsx)("button", { type: "button", className: "show-contents", onClick: () => setShowContents(true), title: "Show caption and description", children: (0, jsx_runtime_1.jsx)(bi_1.BiBookContent, {}) }) }), (0, jsx_runtime_1.jsxs)(core_1.FullScreenControl, { className: "ico", children: [(0, jsx_runtime_1.jsx)(bs_1.BsArrowsFullscreen, {}), (0, jsx_runtime_1.jsx)(bs_1.BsFullscreenExit, {})] }), (0, jsx_runtime_1.jsxs)(core_1.ZoomControl, { className: "ico", children: [(0, jsx_runtime_1.jsx)(bs_1.BsZoomIn, {}), (0, jsx_runtime_1.jsx)(bs_1.BsZoomOut, {}), (0, jsx_runtime_1.jsx)(bi_1.BiRadioCircleMarked, {})] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "contents", children: [(0, jsx_runtime_1.jsx)("div", { className: "ico", children: (0, jsx_runtime_1.jsx)("button", { type: "button", className: "ico hide-contents", onClick: () => setShowContents(false), title: "Show caption and description", children: (0, jsx_runtime_1.jsx)(gr_1.GrClose, {}) }) }), (0, jsx_runtime_1.jsx)(SideBar_1.default, { node: hoveredNode })] })] }))] }) }));
};
exports.default = Root;
//# sourceMappingURL=Root.js.map