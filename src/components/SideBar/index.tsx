import { FC, PropsWithChildren, useEffect, useState } from "react";
import {  useSigma } from "@react-sigma/core";
import Logo from '../../assets/nostr.svg'
import UserContent from "./UserContent";
import ProjectContent from "./ProjectContent";
import Search from "./Search";
import { isUser, isProject } from '../../utils'

import './index.less'
// import { TextField } from "@mui/material";
const SideBar : FC<PropsWithChildren<{ node: string | null, isFold: boolean | null,  onToggleTable: (isOpened: boolean, data: any, type: string | null) => void }>> = ({ node: selectedNode, isFold: fold, onToggleTable }) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();
  const [nodeType, setNodeType] = useState<string | null>(null)
  const [nodeData, setNodeData] = useState<any>(null)
  const [animateCss, setAnimateCss] = useState('')
  // searchNode
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    // 搜索或点击时设置Active
    if(selectedNode || selected){
      const attrs = graph.getNodeAttributes(selectedNode || selected)
      console.log('attr', attrs)
      setNodeType(attrs.category)
      setNodeData(attrs)
    }
  }, [selectedNode, selected])

  useEffect(() => {
    if(fold !== null) {
      setAnimateCss(fold ? 'slideLeftOut' : 'slideLeftIn')
    }
  }, [fold])

  const onSearch = (nodeId: string | null) => {
    setSelected(nodeId)
  }

  return (
    <div className={`panels ${animateCss}`}>
      <div className="panel-header">
        <img className="logo" src={Logo}  alt="logo" />
        <span className="info">Info</span>
      </div>
      
      <div className="panel-content">
        <div className="border-bottom"></div>
        {
          (selectedNode || selected) ? (
            nodeType === 'User' ? <UserContent openTable={(flag, data, type) => onToggleTable(flag, data, type)} nodeData={nodeData} /> : 
            nodeType === 'Project' ? <ProjectContent nodeData={nodeData} openTable={(flag, data, type) => onToggleTable(flag, data, type)} /> : null
          ) :
          <div className="empty">Select or find a node to show information</div>
        }
        <Search onSearch={(node) => onSearch(node)} />
      </div>
    </div>

  )
}

export default SideBar