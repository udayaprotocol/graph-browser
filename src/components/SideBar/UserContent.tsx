import { useSigma } from "@react-sigma/core";
import { FC, useEffect, useState } from "react";
import './userContent.less'
// import { FiltersState } from "../../types";

const UserContent :FC<{ nodeData: any }> = ({  nodeData}) => {

    const sigma = useSigma();
    const graph = sigma.getGraph();
    // const [visibleItems, setVisibleItems] = useState<{ nodes: number; edges: number }>({ nodes: 0, edges: 0 });
    const [inputLinks, setInputLinks] = useState<number>(0);
    const [outputLinks, setOutputLinks] = useState<number>(0)

    useEffect(() => {
      // To ensure the graphology instance has up to data "hidden" values for
      // nodes, we wait for next frame before reindexing. This won't matter in the
      // UX, because of the visible nodes bar width transition.
      const neighbors = graph.neighbors(nodeData.key);
      setInputLinks(neighbors.length);
      setOutputLinks(graph.degree(nodeData.key));
      requestAnimationFrame(() => {
        const index = { nodes: 0, edges: 0 };
        graph.forEachNode((_, { hidden }) => !hidden && index.nodes++);
        graph.forEachEdge((_, _2, _3, _4, source, target) => !source.hidden && !target.hidden && index.edges++);
        // setVisibleItems(index);
      });
      console.log(nodeData);
    }, [nodeData]);

    return (
        <>
          <div className="project">
            <div className="title">{nodeData.label}</div>
            <div className="selected">
              <div className="title">Selected user</div>
              <div className="input">
                <div className="node-number">{inputLinks}</div>
                <div className="node-label">Input links</div>
              </div>
              <div className="input">
                <div className="node-number">{outputLinks}</div>
                <div className="node-label">Output links</div>
              </div>
            </div>
          </div>
          <div className="border-bottom"></div>
          <div className="node-info">
            <div className="item">
              <label className="label">Points</label>
              <span className="value">{nodeData.points}</span>
            </div>
            <div className="item">
              <label className="label">ID</label>
              <span className="value">{nodeData.id}</span>
            </div>
            <div className="item">
              <label className="label">Event Number</label>
              <span className="value">{nodeData.eventNumber}</span>
            </div>
          </div>
          <div className="event">
            <div className="title">Application</div>
            <div className="content">
              <div className="e-tag">Project1</div>
              <div className="e-tag">Project2</div>
              <div className="e-tag">Project3</div>
            </div>
          </div>
          {/* <Search /> */}
        </>
    )
}

export default UserContent;