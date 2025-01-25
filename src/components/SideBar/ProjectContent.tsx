
import { useSigma } from "@react-sigma/core";
import { FC, useEffect, useState } from "react";
import './projectContent.less'
import { BsDownload } from "react-icons/bs";
import { saveAs } from 'file-saver';
// import { FiltersState } from "../../types";

const ProjectContent :FC<{ nodeData: any, openTable: (isOpened: boolean, data: any, type: string | null) => void }> = ({ nodeData, openTable }) => {

    const sigma = useSigma();
    const graph = sigma.getGraph();
    // const [visibleItems, setVisibleItems] = useState<{ nodes: number; edges: number }>({ nodes: 0, edges: 0 });
    const [userNode, setUserNode] = useState<number>(0);
    const [eventNum, setEventNum] = useState<number>(0)
    const [isOpened, setIsOpened] = useState<boolean>(false)
    const [detail, setDetail] = useState<any>(null);

    const onToggleTable = () => {
      setIsOpened(!isOpened)
      openTable(!isOpened, detail.members, 'Project')
    }

    const exportTable = () => {
      try {
        const isFileSaverSupported = !!new Blob;
        if (isFileSaverSupported) {
          const data = [
            ['User Id', 'Lamport Id'],
          ]
          const arr = detail.members.map(itm => {
            return [itm.uid, itm.lamport_id]
          })
          data.push(...arr)
          const csvContent = data.map(row => row.join(',')).join('\n');
          // // 创建 Blob 对象
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
          // 保存为文件
          saveAs(blob, `${nodeData.label}.csv`);
        }
      } catch (err) {
        console.error(err)
      }
    }

    useEffect(() => {
      // To ensure the graphology instance has up to data "hidden" values for
      // nodes, we wait for next frame before reindexing. This won't matter in the
      // UX, because of the visible nodes bar width transition.
      setDetail(nodeData.detail);
      const neighbors = graph.neighbors(nodeData.uid);
      setUserNode(neighbors.length);
      setEventNum(graph.degree(nodeData.uid));
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
              {/* <div className="input">
                <div className="node-number">{eventNum}</div>
                <div className="node-label">Events</div>
              </div> */}
            </div>
          </div>
          <div className="border-bottom"></div>
          <div className="content">
            <div className="sidebar-table-container">
              <div className="table-item">
                <div className="title">FOUND {detail ? (detail.members ? detail.members.length : 0) : 0 } RECORDS</div>
                <div className="btn table-btn" onClick={() => onToggleTable()}>{ isOpened ? 'Close Table' : 'Open Table' }</div>
              </div>
              <div className="table-item">
                <div className="title">EXPORT SELECTED DATA</div>
                <div className="export" onClick={() => exportTable()}>
                  <span style={{marginRight: 10}}><BsDownload /></span>
                  <span>Records</span> 
                </div>
              </div>
            </div>
          </div>
          <div className="event">
            <div className="title">Event Type</div>
            <div className="content">
              {
                detail && detail.event_type.map((item: any, index: number) => {
                  return (
                    <div key={index} className="e-tag">{item}</div>
                  )
                })
              }
            </div>
          </div>
      </>
    )
}

export default ProjectContent;