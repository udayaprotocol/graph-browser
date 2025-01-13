import { FC, PropsWithChildren, useEffect, useState } from "react";
import {  useSigma } from "@react-sigma/core";
import Logo from '../../assets/nostr.svg'
import UserContent from "./UserContent";
import ProjectContent from "./ProjectContent";
import Search from "./Search";
import { isUser, isProject } from '../../utils'

import './index.less'
// import { TextField } from "@mui/material";

const SideBar : FC<PropsWithChildren<{ node: string | null, isFold: boolean | null }>> = ({ node: selectedNode, isFold: fold }) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();
  const [nodeType, setNodeType] = useState<string | null>(null)
  const [nodeData, setNodeData] = useState<any>(null)
  const [animateCss, setAnimateCss] = useState('')

  useEffect(() => {
    if(selectedNode){
      const attrs = graph.getNodeAttributes(selectedNode)
      setNodeType(isUser(attrs.tag) ? 'User' : isProject(attrs.tag) ? 'Event' : null)
      setNodeData(attrs)
      // console.log('nodeType', nodeType)
    }
  }, [selectedNode])

  useEffect(() => {
    if(fold !== null) {
      setAnimateCss(fold ? 'slideLeftOut' : 'slideLeftIn')
    }
  }, [fold])

  return (
    <div className={`panels ${animateCss}`}>
      <div className="panel-header">
        <img className="logo" src={Logo}  alt="logo" />
        <span className="info">Info</span>
      </div>
      
      <div className="panel-content">
        <div className="border-bottom"></div>
        {
          selectedNode ? (
            nodeType === 'User' ? <UserContent nodeData={nodeData} /> : 
            nodeType === 'Event' ? <ProjectContent nodeData={nodeData} /> : null
          ) :
          <div className="empty">Select or find a node to show information</div>
        }
        <Search />
      </div>
    </div>

  )
}

export default SideBar