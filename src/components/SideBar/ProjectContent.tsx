
import { useSigma } from "@react-sigma/core";
import { FC, useEffect, useState } from "react";
import './projectContent.less'
// import { FiltersState } from "../../types";

const ProjectContent :FC<{ nodeData: any }> = ({ nodeData}) => {

    const sigma = useSigma();
    const graph = sigma.getGraph();
    // const [visibleItems, setVisibleItems] = useState<{ nodes: number; edges: number }>({ nodes: 0, edges: 0 });
    const [userNode, setUserNode] = useState<number>(0);
    const [eventNum, setEventNum] = useState<number>(0)

    useEffect(() => {
      // To ensure the graphology instance has up to data "hidden" values for
      // nodes, we wait for next frame before reindexing. This won't matter in the
      // UX, because of the visible nodes bar width transition.
      const neighbors = graph.neighbors(nodeData.key);
      setUserNode(neighbors.length);
      setEventNum(graph.degree(nodeData.key));
      requestAnimationFrame(() => {
        const index = { nodes: 0, edges: 0 };
        graph.forEachNode((_, { hidden }) => !hidden && index.nodes++);
        graph.forEachEdge((_, _2, _3, _4, source, target) => !source.hidden && !target.hidden && index.edges++);
        // setVisibleItems(index);
      });
    }, [nodeData]);

    return (
        <>
          <div className="project">
            <div className="title">Project Name</div>
            <div className="selected">
              <div className="title">Selected node</div>
              <div className="input">
                <div className="node-number">{userNode}</div>
                <div className="node-label">User nodes</div>
              </div>
              <div className="input">
                <div className="node-number">{eventNum}</div>
                <div className="node-label">Events</div>
              </div>
            </div>
          </div>
          <div className="border-bottom"></div>
          <div className="content">
            <div className="table-container">
              <div className="table-item">
                <div className="title">FOUND {userNode} RECORDS</div>
                <div className="btn table-btn">Open Table</div>
              </div>
              <div className="table-item">
                <div className="title">EXPORT SELECTED DATA</div>
                <div className="export">
                  <div className="mid-btn btn">Records</div>
                  <div className="mid-btn btn">Meta Data</div>
                </div>
              </div>
            </div>
          </div>
          <div className="event">
            <div className="title">Event Type</div>
            <div className="content">
              <div className="e-tag">Invited</div>
              <div className="e-tag">Address</div>
              <div className="e-tag">Others</div>
            </div>
          </div>
          {/* <Search /> */}
      </>
    )
}

export default ProjectContent;