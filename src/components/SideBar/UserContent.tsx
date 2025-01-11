
import { FC } from "react";
import './userContent.less'
import Search from "./Search";

const UserContent :FC = () => {
    return (
        <div className="panel-content">
        <div className="border-bottom"></div>
        <div className="project">
          <div className="title">Nostr UserName</div>
          <div className="selected">
            <div className="title">Selected user</div>
            <div className="input">
              <div className="node-number">6</div>
              <div className="node-label">Input links</div>
            </div>
            <div className="input">
              <div className="node-number">0</div>
              <div className="node-label">Output links</div>
            </div>
          </div>
        </div>
        <div className="border-bottom"></div>
        <div className="node-info">
          <div className="item">
            <label className="label">Points</label>
            <span className="value">1089.2K</span>
          </div>
          <div className="item">
            <label className="label">ID</label>
            <span className="value">OX2434...656</span>
          </div>
          <div className="item">
            <label className="label">Event Number</label>
            <span className="value">18</span>
          </div>
        </div>
        <div className="event">
          <div className="title">Application</div>
          <div className="content">
            <div className="e-tag">Project1</div>
            <div className="e-tag">Project2</div>
            <div className="e-tag">Project3</div>
          </div>
        </div>
        <Search />
      </div>
    )
}

export default UserContent;