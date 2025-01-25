import { useSetSettings, useSigma } from "@react-sigma/core";
import { Attributes } from "graphology-types";
import { FC, PropsWithChildren, useEffect } from "react";

import { drawHover, drawLabel } from "../canvas-utils";
import useDebounce from "../use-debounce";

// const NODE_FADE_COLOR = "rgb(52, 59, 70, 0.5)";
const NODE_FADE_COLOR = "rgba(39, 52, 71, 0.5)";
const EDGE_FADE_COLOR = "#eee";
const GraphSettingsController: FC<PropsWithChildren<{ hoveredNode: string | null }>> = ({ children, hoveredNode }) => {
  const sigma = useSigma();
  const setSettings = useSetSettings();
  const graph = sigma.getGraph();

  // Here we debounce the value to avoid having too much highlights refresh when
  // moving the mouse over the graph:
  const debouncedHoveredNode = useDebounce(hoveredNode, 40);

  /**
   * Initialize here settings that require to know the graph and/or the sigma
   * instance:
   */
  useEffect(() => {
    const hoveredColor: string = (debouncedHoveredNode && sigma.getNodeDisplayData(debouncedHoveredNode)?.color) || "";

    setSettings({
      defaultDrawNodeLabel: drawLabel,
      defaultDrawNodeHover: drawHover,
      nodeReducer: (node: string, data: Attributes) => {
        if (debouncedHoveredNode) {
          return node === debouncedHoveredNode ||
            graph.hasEdge(node, debouncedHoveredNode) ||
            graph.hasEdge(debouncedHoveredNode, node)
            ? { ...data, zIndex: 1 }
            : { ...data, zIndex: 1, label: "111", color: NODE_FADE_COLOR, alpha: 0.1, image: null, highlighted: false };
        }
        return data;
      },
      edgeReducer: (edge: string, data: Attributes) => {
        // console.log('hasExtremity', edge, data)
        if (debouncedHoveredNode) {
          const targetEdge = graph.hasExtremity(edge, debouncedHoveredNode)
          if (targetEdge) {
            const type = edge.split('-')[0]
            if(type === 'invite'){
              return  { ...data, color: '#f00', size: 4 }
            } else {
              return  { ...data, color: hoveredColor, size: 4 }
            }
          } else {
            return { ...data, color: EDGE_FADE_COLOR, hidden: true };
          }
        }
        return data;
      },
    });
  }, [sigma, graph, debouncedHoveredNode]);

  /**
   * Update node and edge reducers when a node is hovered, to highlight its
   * neighborhood:
   */
  useEffect(() => {
    const hoveredColor: string = (debouncedHoveredNode && sigma.getNodeDisplayData(debouncedHoveredNode)?.color) || "";

    sigma.setSetting(
      "nodeReducer",
      debouncedHoveredNode
        ? (node, data) => {
          if (node === debouncedHoveredNode ||
            graph.hasEdge(node, debouncedHoveredNode) ||
            graph.hasEdge(debouncedHoveredNode, node)) {
            // console.log('nodeReducer', node, data)
            return { ...data, zIndex: 1 };
          } else {
            return { ...data, zIndex: 0, label: "", color: NODE_FADE_COLOR, image: null, highlighted: false };
          }
        } : null,
        // ? (node, data) =>
        //     node === debouncedHoveredNode ||
        //     graph.hasEdge(node, debouncedHoveredNode) ||
        //     graph.hasEdge(debouncedHoveredNode, node)
        //       ? { ...data, zIndex: 1 }
        //       : { ...data, zIndex: 0, label: "", color: NODE_FADE_COLOR, image: null, highlighted: false }
        // : null,
    );
    sigma.setSetting(
      "edgeReducer",
      debouncedHoveredNode
        ? (edge, data) => {
          const target = graph.hasExtremity(edge, debouncedHoveredNode)
          if(target){
            const type = edge.split('-')[0]
            console.log('type', type)
            if(type === 'invite'){
              return  { ...data, color: '#40c6dd', size: 2 }
            } else if (type === 'members') {
              return  { ...data, color: '#7373e4', size: 2 }
            } else {
              return  { ...data, color: hoveredColor, size: 2 }
            }
            // return { ...data, color: hoveredColor, size: 2 }
          } else {
            return { ...data, color: EDGE_FADE_COLOR, hidden: true }
          }
        } : null,
        // (edge, data) =>
        //     graph.hasExtremity(edge, debouncedHoveredNode)
        //       ? { ...data, color: hoveredColor, size: 2 }
        //       : { ...data, color: EDGE_FADE_COLOR, hidden: true }

        // : null,
    );
  }, [debouncedHoveredNode]);

  return <>{children}</>;
};

export default GraphSettingsController;
