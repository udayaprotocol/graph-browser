

import { FC } from "react";
import Logo from '../../assets/nostr.svg'

import './index.less'

const SideBar : FC = () => {
  return (
    <div className="panels">
      <div className="panel-header">
        <img className="logo" src={Logo}  alt="logo" />
        <span className="info">Info</span>
      </div>
      <div className="panel-content">
        <div className="border-bottom"></div>
      </div>
    </div>
  )
}

export default SideBar