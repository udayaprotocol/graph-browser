

import { FC } from "react";
import Logo from '../../assets/nostr.svg'
import { BsSearch } from "react-icons/bs";

import './index.less'
// import { TextField } from "@mui/material";

const SideBar : FC = () => {
  return (
    <div className="panels">
      <div className="panel-header">
        <img className="logo" src={Logo}  alt="logo" />
        <span className="info">Info</span>
      </div>
      <div className="panel-content">
        <div className="border-bottom"></div>
        <div className="project">
          <div className="title">Project Name</div>
          <div className="content">
            <div className="project-info">
              <div className="item-number">18M</div>
              <div className="item-text">User Node</div>
            </div>
            <div className="project-info">
              <div className="item-number">30M</div>
              <div className="item-text">Event</div>
            </div>
          </div>
        </div>
        <div className="table-container">
          <div className="table-item">
            <div className="title">FOUND 10 RECORDS</div>
            <div className="btn table-btn">Open Table</div>
          </div>
          <div className="table-item">
            <div className="title">EXPORT SELECTED DATA</div>
            <div className="export">
              <div className="mid-btn btn">Records</div>
              <div className="mid-btn btn">Meta Data</div>
            </div>
          </div>
        </div>
        <div className="border-bottom"></div>
        <div className="event">
          <div className="title">Event Type</div>
          <div className="content">
            <div className="e-tag">Invited</div>
            <div className="e-tag">Address</div>
            <div className="e-tag">Others</div>
          </div>
        </div>
        <div className="search">
          <BsSearch />
          <input className="search-input" placeholder="Search..." />
          <div className="tag">address</div>
          {/* <TextField
            className="search-input"
            style={{color: 'red'}}
           id="standard-basic" label="Search" variant="standard" size="small" /> */}
        </div>
        {/* <div className="border-bottom absolute"></div> */}
      </div>
    </div>
  )
}

export default SideBar