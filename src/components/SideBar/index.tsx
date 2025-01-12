import { FC, PropsWithChildren, useEffect, useState } from "react";
import {  useSigma } from "@react-sigma/core";
import Logo from '../../assets/nostr.svg'
import UserContent from "./UserContent";
import ProjectContent from "./ProjectContent";
import Search from "./Search";

import './index.less'
// import { TextField } from "@mui/material";

const SideBar : FC<PropsWithChildren<{ node: string | null }>> = (selectedNode) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();
  const [nodeType, setNodeType] = useState<string | null>(null)
  const [nodeData, setNodeData] = useState<any>(null)


  useEffect(() => {
    if(selectedNode.node){
      const attrs = graph.getNodeAttributes(selectedNode.node)
      const isUser = ['Company', 'Chart type', 'Field','List', 'Method', 'unknown', 'User']
      const isProject = ['Organization', 'Person', 'Technology', 'Tool', 'Event','Concept']
      setNodeType(isUser.includes(attrs.tag) ? 'User' : isProject.includes(attrs.tag) ? 'Event' : null)
      setNodeData(attrs)
      // console.log('nodeType', nodeType)
    }
  }, [selectedNode])

  return (
    <div className="panels">
      <div className="panel-header">
        <img className="logo" src={Logo}  alt="logo" />
        <span className="info">Info</span>
      </div>
      
      <div className="panel-content">
        <div className="border-bottom"></div>
        {
          selectedNode.node ? (
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