
import { FC } from "react";
import { BsSearch } from "react-icons/bs";
import './projectContent.less'
import Search from "./Search";

const ProjectContent :FC = () => {
    return (
        <div className="panel-content">
        <div className="border-bottom"></div>
        <div className="project">
          <div className="title">Project Name</div>
          <div className="selected">
            <div className="title">Selected node</div>
            <div className="input">
              <div className="node-number">18M</div>
              <div className="node-label">User nodes</div>
            </div>
            <div className="input">
              <div className="node-number">31M</div>
              <div className="node-label">Events</div>
            </div>
          </div>
        </div>
        <div className="border-bottom"></div>
        <div className="content">
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
        </div>
        <div className="event">
          <div className="title">Event Type</div>
          <div className="content">
            <div className="e-tag">Invited</div>
            <div className="e-tag">Address</div>
            <div className="e-tag">Others</div>
          </div>
        </div>
        <Search />
      </div>
    )
}

export default ProjectContent;