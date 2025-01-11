import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useSetSettings, useSigma } from "@react-sigma/core";
import Logo from '../../assets/nostr.svg'
import UserContent from "./UserContent";
import ProjectContent from "./ProjectContent";
import Search from "./Search";

import './index.less'
// import { TextField } from "@mui/material";

const SideBar : FC<PropsWithChildren<{ node: string | null }>> = (node) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();
  const [nodeType, setNodeType] = useState<string | null>(null)
  // console.log('SideBar', graph, node)


  useEffect(() => {
    if(node.node){
      const attrs = graph.getNodeAttributes(node.node)
      console.log('attrs==>', attrs)
      setNodeType(attrs.tag)
    }
  }, [node])

  return (
    <div className="panels">
      <div className="panel-header">
        <img className="logo" src={Logo}  alt="logo" />
        <span className="info">Info</span>
      </div>
      
      <div className="panel-content">
        <div className="border-bottom"></div>
        {
          node.node && (
            nodeType === 'user' ? <UserContent /> : 
            nodeType === 'event' ? <ProjectContent /> : null
          )
        }
        <div className="empty">Select or find a node to show information</div>
        <Search />
      </div>  

    </div>

  )
}

export default SideBar