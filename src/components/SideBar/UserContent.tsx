import { useSigma } from "@react-sigma/core";
import { FC, useEffect, useState } from "react";
import './userContent.less'
import { BsCopy, BsTable } from "react-icons/bs";
import { useCopyToClipboard } from 'react-use'
import { message } from "antd";

const UserContent :FC<{ nodeData: any, openTable: (isOpened: boolean, data: any, type: string | null) => void }> = ({  nodeData, openTable }) => {

    const sigma = useSigma();
    const graph = sigma.getGraph();
    const [inputLinks, setInputLinks] = useState<number>(0);
    const [outputLinks, setOutputLinks] = useState<number>(0)
    const [detail, setDetail] = useState<any>(null);
    const [state, copyToClipboard] = useCopyToClipboard();
    const [inviteList, setInviteList] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const onOpenTable = () => {
      setIsOpen(!isOpen)
      const list = nodeData.detail.invite.map(itm => {
        return { ...itm, ...itm.facets}
      })
      openTable(!isOpen, list, 'Invite')
    }

    useEffect(() => {
      setDetail(nodeData.detail);
      if(nodeData.detail && nodeData.detail.invite) {
        const list = nodeData.detail.invite.slice(0, 3)
        setInviteList(list)
      }
      const ineighbors = graph.inNeighbors(nodeData.uid);
      const oneighbors = graph.outNeighbors(nodeData.uid);

      setInputLinks(ineighbors.length);
      setOutputLinks(oneighbors.length);

      // const inEdges = graph.outEdges(nodeData.uid)
      // graph.updateEdgeAttribute(inEdges, 'color', () => 'red')
      // console.log('ine',inEdges)
      
      // requestAnimationFrame(() => {
      //   const index = { nodes: 0, edges: 0 };
      //   graph.forEachNode((_, { hidden }) => !hidden && index.nodes++);
      //   // graph.forEachEdge((_, _2, _3, _4, source, target) => !source.hidden && !target.hidden && index.edges++);
      //   graph.filterOutEdges((key, attrs, _3, _4, sourceAttr, targetAttr) => {
      //     console.log('_, _2, _3, _4', key, attrs, _3, _4)
      //   });
      //   // setVisibleItems(index);
      // });
    }, [nodeData]);
    
    useEffect(() => {
      if(state.value) {
        message.success({content: 'Copied Success'})
      }
    },[state])

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
                    {
                      detail.invite && (
                        <button className="btn">
                          <span title="show more data" onClick={() => onOpenTable()}>{`${isOpen ? 'Close Table' : 'Open Table'} `}</span>
                          {/* <BsTable /> */}
                        </button>
                      )
                    }
                  </div>
                  {
                    inviteList.length ? (
                      inviteList.map((item: any, index: number) => {
                        return (
                          <div className="user-list" key={index}>
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