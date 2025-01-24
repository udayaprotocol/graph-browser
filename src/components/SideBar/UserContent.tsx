import { useSigma } from "@react-sigma/core";
import { FC, useEffect, useState } from "react";
import './userContent.less'
import { BsCopy } from "react-icons/bs";
import { useCopyToClipboard } from 'react-use'


// import { FiltersState } from "../../types";

const UserContent :FC<{ nodeData: any }> = ({  nodeData }) => {

    const sigma = useSigma();
    const graph = sigma.getGraph();
    // const [visibleItems, setVisibleItems] = useState<{ nodes: number; edges: number }>({ nodes: 0, edges: 0 });
    const [inputLinks, setInputLinks] = useState<number>(0);
    const [outputLinks, setOutputLinks] = useState<number>(0)
    const [detail, setDetail] = useState<any>(null);
    const [text, setText] = useState('');
    const [state, copyToClipboard] = useCopyToClipboard();

    console.log('node-data', nodeData)
    useEffect(() => {
      // To ensure the graphology instance has up to data "hidden" values for
      // nodes, we wait for next frame before reindexing. This won't matter in the
      // UX, because of the visible nodes bar width transition.
      setDetail(nodeData.detail);
      const neighbors = graph.neighbors(nodeData.uid);
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
          <div className="node-info">
          <div className="item">
            <label className="label">Invite</label>
            {detail && detail?.invite && detail?.invite.map((item: any, index: number) => {
              // 判断是否为最后一个元素
              const shouldAppendSlash = index < detail.invite.length - 1;
              return (
                <span key={index} className="value">
                  {item.lamport_id}
                  {shouldAppendSlash && '、'}
                </span>
              );
            })}
            { detail && !detail.invite && '-'}
          </div>
            {/* <div className="item">
              <label className="label">Points</label>
              <span className="value">{nodeData.points}</span>
            </div> */}
            <div className="item">
              <label className="label">ETH</label>
              <div className="value flex">
                <div className="address" title={detail?.eth_address}>
                  {detail && detail.eth_address}
                </div>
                { detail?.eth_address ? <BsCopy onClick={() => copyToClipboard(detail.eth_address)} /> : '-' }
              </div>
            </div>
            <div className="item">
              <label className="label">Public Key</label>
              <div className="value flex">
                <div className="address" title={detail?.pubkey}>
                  {detail && detail.pubkey}
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
              <span className="value">{detail && detail.event_type.length}</span>
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
          <div className="event">
            <div className="title">Application</div>
            <div className="content">
              {
                detail && detail?.participates_in && detail?.participates_in.map((item: any, index: number) => {
                  return (
                    <div key={index} className="e-tag">{item.project_name}</div>
                  )
                })
              } 
            </div>
          </div>
        </>
    )
}

export default UserContent;