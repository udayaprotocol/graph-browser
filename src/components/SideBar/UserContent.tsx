import { useSigma } from "@react-sigma/core";
import { FC, useEffect, useState } from "react";
import './userContent.less'
import { BsCopy, BsTable } from "react-icons/bs";
import { useCopyToClipboard } from 'react-use'

const UserContent :FC<{ nodeData: any }> = ({  nodeData }) => {

    const sigma = useSigma();
    const graph = sigma.getGraph();
    // const [visibleItems, setVisibleItems] = useState<{ nodes: number; edges: number }>({ nodes: 0, edges: 0 });
    const [inputLinks, setInputLinks] = useState<number>(0);
    const [outputLinks, setOutputLinks] = useState<number>(0)
    const [detail, setDetail] = useState<any>(null);
    const [text, setText] = useState('');
    const [state, copyToClipboard] = useCopyToClipboard();
    useEffect(() => {
      // To ensure the graphology instance has up to data "hidden" values for
      // nodes, we wait for next frame before reindexing. This won't matter in the
      // UX, because of the visible nodes bar width transition.
      setDetail(nodeData.detail);
      const neighbors = graph.neighbors(nodeData.uid);
      console.log('nei', neighbors)
      setInputLinks(neighbors.length);
      setOutputLinks(graph.degree(nodeData.uid));
      
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
          {
            detail ? (
              <div className="node-info">
                <div className="section invite">
                  <div className="section-title">
                    <span>Invite</span>
                    <button className="btn">
                      <span title="show more data">Open Table</span>
                      {/* <BsTable /> */}
                    </button>
                  </div>
                  {
                    detail?.invite ? (
                      detail?.invite.map((item: any, index: number) => {
                        return (
                          <div className="user-list">
                            <span style={{marginRight: 10, opacity: 0.55}}>user</span>
                            <span style={{marginRight: 10}}>{item.lamport_id}</span>
                            <span style={{width: 100, marginRight: 10, flex: 1, opacity: 0.55, textAlign: 'center'}}>join in project </span>
                            <span>{item.facets.project_name}</span>
                          </div>
                        );
                      })
                    ) : '-'
                  }
                </div>
                <div className="section">
                  <div className="section-title">
                    <span>User</span>
                  </div>
                  <div className="item">
                    <label className="label">Eth</label>
                    <div className="value flex">
                      <div className="address" title={detail?.eth_address}>
                        {detail.eth_address}
                      </div>
                      { detail?.eth_address ? <BsCopy onClick={() => copyToClipboard(detail.eth_address)} /> : '-' }
                    </div>
                  </div>
                  <div className="item">
                    <label className="label">Public Key</label>
                    <div className="value flex">
                      <div className="address" title={detail?.pubkey}>
                        {detail.pubkey}
                      </div>
                      { detail?.pubkey ? <BsCopy onClick={() => copyToClipboard(detail.pubkey)}  /> : '-' }
                    </div>
                  </div>
                  <div className="item">
                    <label className="label">X</label>
                    <span className="value">{detail?.twitter_id || '-'}</span>
                  </div>
                  <div className="item">
                    <label className="label">Event Nodes</label>
                    <span className="value">{detail.event_type.length}</span>
                  </div>
                  <div className="item">
                    <label className="label">ID</label>
                    <span className="value flex">
                      <div className="address">
                        {nodeData.uid}
                      </div>
                      <BsCopy onClick={() => copyToClipboard(nodeData.uid)} />
                    </span>
                  </div>
                </div>
                <div className="section event">
                  <div className="section-title">Application</div>
                  <div className="content">
                    {
                      detail?.participates_in && detail?.participates_in.map((item: any, index: number) => {
                        return (
                          <div key={index} className="e-tag">{item.project_name}</div>
                        )
                      })
                    } 
                  </div>
                </div>
              </div>
            ) : null
          }
        </>
    )
}

export default UserContent;