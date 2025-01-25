import { SigmaContainer, ZoomControl } from "@react-sigma/core";
// import { createNodeImageProgram } from "@sigma/node-image";
import { EdgeCurvedArrowProgram }  from '@sigma/edge-curve'
import { DirectedGraph, MultiGraph } from "graphology";
import { constant, keyBy, mapValues, omit } from "lodash";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { BiBookContent } from "react-icons/bi";
import { BsArrowsFullscreen, BsZoomIn, BsZoomOut, BsChevronLeft, BsWallet } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { Settings } from "sigma/settings";
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'

import { drawHover, drawLabel } from "../canvas-utils";
import { Dataset, FiltersState } from "../types";
import GraphEventsController from "./GraphEventsController";
import GraphSettingsController from "./GraphSettingsController";
import SideBar from "../components/SideBar"
import DataTable from "../components/DataTable"

const ProjectColor = 'rgba(194, 160, 190, 0.7)'


const Root: FC = () => {
  const graph = useMemo(() => new MultiGraph(), []);
  const [showContents, setShowContents] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [isFold, setIsFold] = useState<boolean | null>(null);
  const [filtersState, setFiltersState] = useState<FiltersState>({
    clusters: {},
    tags: {},
  });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  // user || project
  const [curCategory, setCurCategory] = useState<string | null>(null)
  const [tableData, setTableData] = useState([]);
  const edges = useRef<any[]>([])
  const sigmaSettings: Partial<Settings> = useMemo(
    () => ({
      edgeProgramClasses: { curvedArrow: EdgeCurvedArrowProgram, },
      // edgeProgramClasses: { curve: EdgeCurveProgram, },
      defaultDrawNodeLabel: drawLabel,
      defaultDrawNodeHover: drawHover,
      defaultNodeType: "circle", // image 
      defaultEdgeType: "curvedArrow", // arrow、curve
      labelDensity: 0.07,
      labelGridCellSize: 60,
      labelRenderedSizeThreshold: 15,
      labelFont: "Lato, sans-serif",
      zIndex: true,
    }),
    [],
  );

  const onToggleTable = (isOpened: boolean, data: any, type: string | null) => {
    setIsShow(isOpened)
    setTableData(data)
    setCurCategory(type)
  }

  // Load data on mount:
  useEffect(() => {
    try {
      // fetch('/api/all_data')
      fetch('./all_data.json')
      .then((res) => res.json())
      .then((dataset: Dataset) => {
        // console.log('nodes', dataset.nodes)
        // console.log('edges', dataset.edges)

        const newNodes = dataset.nodes.map((node) => {
          const min = Math.random() * 1500
          const max = Math.random() * 1000
          return {...node, x: min , y: max}
        })

        newNodes.forEach((node) => {
            graph.addNode(node.uid, {
              ...node
            })
        });

        dataset.edges.forEach(({source, target, category, uid}) => {
          // if(category === 'invite') {
          //   graph.addEdge(source, target, { size: 1, color: '#5ad0dd' })
          // } else {
            const edgeItem = graph.addEdgeWithKey(`${category}-${source}-${target}`,source, target, { size: 1, color: 'rgba(123, 155, 212, 0.7)' })
            edges.current.push(edgeItem)
            console.log('edgeItem', edgeItem)
          // }
        });

        graph.forEachNode((node, attrs) => {
          graph.setNodeAttribute(node,"size",10);
          if (attrs.category === 'User') {
            graph.setNodeAttribute(node,"color",'rgba(73, 94, 152, 0.7)');
          } else {
            graph.setNodeAttribute(node,"color",ProjectColor);
          }
        });

        setDataset(dataset);
        requestAnimationFrame(() => setDataReady(true));
      });
    } catch (error) {
      console.log('fetching data', error)
    }
  }, []);

  const toggleSideBar = () => {
    if(isFold === null) {
      setIsFold(true)
    } else {
      setIsFold(!isFold)
    }
  }

  if (!dataset) return (
    <div className="app-container">
      <Flex align="center" gap="middle">
        <Spin indicator={<LoadingOutlined  style={{ fontSize: 48, color: '#eee' }} spin />} />
      </Flex>
    </div>
  );

  return (
    <div id="app-root" className={showContents ? "show-contents" : ""}>
      <SigmaContainer graph={graph} settings={sigmaSettings} className={ isFold ? 'fold-sider-bar' : '' }>
        <GraphSettingsController hoveredNode={hoveredNode} />
        <GraphEventsController setHoveredNode={setHoveredNode} />

        {dataReady && (
          <>
            <div className="pages">
              <span>Page 1</span>
            </div>
            <div className="wallet">
              <BsWallet />
              <button className="btn">Connect Wallet</button>
            </div>
            <div className="controls">
              <div className="react-sigma-control ico">
                <button
                  type="button"
                  className="show-contents"
                  onClick={() => setShowContents(true)}
                  title="Show caption and description"
                >
                  <BiBookContent />
                </button>
              </div>
              <div className="ico fold-btn">
                <button onClick={() => toggleSideBar()}>
                  <BsChevronLeft className="icon-fold" />
                </button>
              </div>

              <ZoomControl className="ico">
                <BsZoomIn />
                <BsZoomOut />
                <BsArrowsFullscreen />
              </ZoomControl>
            </div>
            <div className="node-list">
              <div className="dot">
                <div className="dott project"></div>
                <span>project node</span>
              </div>
              <div className="dot">
                <div className="dott user"></div>
                <span>user node</span>
              </div>
            </div>
            {
              hoveredNode ? (
                <div className="line-list">
                  <div className="line">
                    <div className="line-item invite"></div>
                    <span>invite event</span>
                  </div>
                  <div className="line">
                    <div className="line-item members"></div>
                    <span>members event</span>
                  </div>
                </div>
              ) : null
            }
            
            <div className="sigma-contents">
              <div className="ico">
                <button
                  type="button"
                  className="ico hide-contents"
                  onClick={() => setShowContents(false)}
                  title="Show caption and description"
                >
                  <GrClose />
                </button>
              </div>
              <SideBar isFold={isFold} node={hoveredNode} onToggleTable={(flag, data, type) => onToggleTable(flag, data, type)} />
              <DataTable isShow={isShow} data={tableData} type={curCategory} />
            </div>
          </>
        )}
      </SigmaContainer>
    </div>
  );
};

export default Root;
