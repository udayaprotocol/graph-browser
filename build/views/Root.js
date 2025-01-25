"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@react-sigma/core");
const edge_curve_1 = require("@sigma/edge-curve");
const graphology_1 = require("graphology");
const react_1 = require("react");
const bi_1 = require("react-icons/bi");
const bs_1 = require("react-icons/bs");
const gr_1 = require("react-icons/gr");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const canvas_utils_1 = require("../canvas-utils");
const GraphEventsController_1 = tslib_1.__importDefault(require("./GraphEventsController"));
const GraphSettingsController_1 = tslib_1.__importDefault(require("./GraphSettingsController"));
const SideBar_1 = tslib_1.__importDefault(require("../components/SideBar"));
const DataTable_1 = tslib_1.__importDefault(require("../components/DataTable"));
const ProjectColor = 'rgba(194, 160, 190, 0.7)';
const Root = () => {
    const graph = (0, react_1.useMemo)(() => new graphology_1.MultiGraph(), []);
    const [showContents, setShowContents] = (0, react_1.useState)(false);
    const [dataReady, setDataReady] = (0, react_1.useState)(false);
    const [dataset, setDataset] = (0, react_1.useState)(null);
    const [isFold, setIsFold] = (0, react_1.useState)(null);
    const [filtersState, setFiltersState] = (0, react_1.useState)({
        clusters: {},
        tags: {},
    });
    const [hoveredNode, setHoveredNode] = (0, react_1.useState)(null);
    const [isShow, setIsShow] = (0, react_1.useState)(false);
    const [curCategory, setCurCategory] = (0, react_1.useState)(null);
    const [tableData, setTableData] = (0, react_1.useState)([]);
    const edges = (0, react_1.useRef)([]);
    const sigmaSettings = (0, react_1.useMemo)(() => ({
        edgeProgramClasses: { curvedArrow: edge_curve_1.EdgeCurvedArrowProgram, },
        defaultDrawNodeLabel: canvas_utils_1.drawLabel,
        defaultDrawNodeHover: canvas_utils_1.drawHover,
        defaultNodeType: "circle",
        defaultEdgeType: "curvedArrow",
        labelDensity: 0.07,
        labelGridCellSize: 60,
        labelRenderedSizeThreshold: 15,
        labelFont: "Lato, sans-serif",
        zIndex: true,
    }), []);
    const onToggleTable = (isOpened, data, type) => {
        setIsShow(isOpened);
        setTableData(data);
        setCurCategory(type);
    };
    (0, react_1.useEffect)(() => {
        try {
            fetch('/api/all_data')
                .then((res) => res.json())
                .then((dataset) => {
                const newNodes = dataset.nodes.map((node) => {
                    const min = Math.random() * 1500;
                    const max = Math.random() * 1000;
                    return Object.assign(Object.assign({}, node), { x: min, y: max });
                });
                newNodes.forEach((node) => {
                    graph.addNode(node.uid, Object.assign({}, node));
                });
                dataset.edges.forEach(({ source, target, category, uid }) => {
                    const edgeItem = graph.addEdgeWithKey(`${category}-${source}-${target}`, source, target, { size: 1, color: 'rgba(123, 155, 212, 0.7)' });
                    edges.current.push(edgeItem);
                });
                graph.forEachNode((node, attrs) => {
                    graph.setNodeAttribute(node, "size", 10);
                    if (attrs.category === 'User') {
                        graph.setNodeAttribute(node, "color", 'rgba(73, 94, 152, 0.7)');
                    }
                    else {
                        graph.setNodeAttribute(node, "color", ProjectColor);
                    }
                });
                setDataset(dataset);
                requestAnimationFrame(() => setDataReady(true));
            });
        }
        catch (error) {
            console.log('fetching data', error);
        }
    }, []);
    const toggleSideBar = () => {
        if (isFold === null) {
            setIsFold(true);
        }
        else {
            setIsFold(!isFold);
        }
    };
    if (!dataset)
        return ((0, jsx_runtime_1.jsx)("div", { className: "app-container", children: (0, jsx_runtime_1.jsx)(antd_1.Flex, { align: "center", gap: "middle", children: (0, jsx_runtime_1.jsx)(antd_1.Spin, { indicator: (0, jsx_runtime_1.jsx)(icons_1.LoadingOutlined, { style: { fontSize: 48, color: '#eee' }, spin: true }) }) }) }));
    return ((0, jsx_runtime_1.jsx)("div", { id: "app-root", className: showContents ? "show-contents" : "", children: (0, jsx_runtime_1.jsxs)(core_1.SigmaContainer, { graph: graph, settings: sigmaSettings, className: isFold ? 'fold-sider-bar' : '', children: [(0, jsx_runtime_1.jsx)(GraphSettingsController_1.default, { hoveredNode: hoveredNode }), (0, jsx_runtime_1.jsx)(GraphEventsController_1.default, { setHoveredNode: setHoveredNode }), dataReady && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "pages", children: (0, jsx_runtime_1.jsx)("span", { children: "Page 1" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "wallet", children: [(0, jsx_runtime_1.jsx)(bs_1.BsWallet, {}), (0, jsx_runtime_1.jsx)("button", { className: "btn", children: "Connect Wallet" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "controls", children: [(0, jsx_runtime_1.jsx)("div", { className: "react-sigma-control ico", children: (0, jsx_runtime_1.jsx)("button", { type: "button", className: "show-contents", onClick: () => setShowContents(true), title: "Show caption and description", children: (0, jsx_runtime_1.jsx)(bi_1.BiBookContent, {}) }) }), (0, jsx_runtime_1.jsx)("div", { className: "ico fold-btn", children: (0, jsx_runtime_1.jsx)("button", { onClick: () => toggleSideBar(), children: (0, jsx_runtime_1.jsx)(bs_1.BsChevronLeft, { className: "icon-fold" }) }) }), (0, jsx_runtime_1.jsxs)(core_1.ZoomControl, { className: "ico", children: [(0, jsx_runtime_1.jsx)(bs_1.BsZoomIn, {}), (0, jsx_runtime_1.jsx)(bs_1.BsZoomOut, {}), (0, jsx_runtime_1.jsx)(bs_1.BsArrowsFullscreen, {})] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "node-list", children: [(0, jsx_runtime_1.jsxs)("div", { className: "dot", children: [(0, jsx_runtime_1.jsx)("div", { className: "dott project" }), (0, jsx_runtime_1.jsx)("span", { children: "project node" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "dot", children: [(0, jsx_runtime_1.jsx)("div", { className: "dott user" }), (0, jsx_runtime_1.jsx)("span", { children: "user node" })] })] }), hoveredNode ? ((0, jsx_runtime_1.jsxs)("div", { className: "line-list", children: [(0, jsx_runtime_1.jsxs)("div", { className: "line", children: [(0, jsx_runtime_1.jsx)("div", { className: "line-item invite" }), (0, jsx_runtime_1.jsx)("span", { children: "invite event" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "line", children: [(0, jsx_runtime_1.jsx)("div", { className: "line-item members" }), (0, jsx_runtime_1.jsx)("span", { children: "members event" })] })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "sigma-contents", children: [(0, jsx_runtime_1.jsx)("div", { className: "ico", children: (0, jsx_runtime_1.jsx)("button", { type: "button", className: "ico hide-contents", onClick: () => setShowContents(false), title: "Show caption and description", children: (0, jsx_runtime_1.jsx)(gr_1.GrClose, {}) }) }), (0, jsx_runtime_1.jsx)(SideBar_1.default, { isFold: isFold, node: hoveredNode, onToggleTable: (flag, data, type) => onToggleTable(flag, data, type) }), (0, jsx_runtime_1.jsx)(DataTable_1.default, { isShow: isShow, data: tableData, type: curCategory })] })] }))] }) }));
};
exports.default = Root;
//# sourceMappingURL=Root.js.map