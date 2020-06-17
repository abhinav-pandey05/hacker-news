import React, { Component } from "react";
import upvoteicon from "../src/upvoteicon.png";
import TableHeader from './TableHeader';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvote: null,
    };
  }

  upvote(event) {
    let itemId = event.target.parentElement.parentElement.className;
    let localItemVal = { upvoteCount: 1, hide: false };
    if (!localStorage.getItem(itemId)) {
      localStorage.setItem(itemId, JSON.stringify(localItemVal));
    } else {
      localItemVal = JSON.parse(localStorage.getItem(itemId));
      localItemVal.upvoteCount += 1;
      localStorage.setItem(itemId, JSON.stringify(localItemVal));
    }
  }
  hideItem(e) {
    let itemId = e.target.parentElement.parentElement.parentElement.className;
    if (!localStorage.getItem(itemId)) {
      let localItemVal = { upvoteCount: 0, hide: true };
      localStorage.setItem(itemId, JSON.stringify(localItemVal));
    } else if (localStorage.getItem(itemId)) {
      let localItemVal = JSON.parse(localStorage.getItem(itemId));
      localItemVal.hide = true;
      localStorage.setItem(itemId, JSON.stringify(localItemVal));
    }
    e.target.parentElement.parentElement.parentElement.style.display = "none";
  }

  renderTableData() {
    if (this.props.items) {
      return this.props.items.map((item) => {
        const { points, author, title, num_comments, url, objectID } = item;
        console.log(localStorage.getItem(objectID));
        if (
          JSON.parse(localStorage.getItem(objectID)) === null ||
          localStorage.getItem(objectID).hide === false
        ) {
          return (
            <tr key={objectID} className={objectID}>
              <td>{num_comments || 0}</td>
              <td>{points}</td>
              <td>
                <img
                  onClick={(e) => this.upvote(e)}
                  className="upvote-icon"
                  width="100%"
                  height="100%"
                  alt="upvote icon"
                  src={upvoteicon}
                />
              </td>
              <td>
                {title}{" "}
                <span className="item-details">
                  (<a href={url}>{url}</a>) by{" "}
                  <span className="item-author">{author}</span> |&nbsp;
                  <span
                    className="hide-item-button"
                    onClick={(e) => this.hideItem(e)}
                  >
                    hide
                  </span>
                </span>
              </td>
            </tr>
          );
        }
        return null;
      });
    }
  }
  render() {
    return (
      <div className="data-table-container">
        <table id="items">
          <tbody>
            <TableHeader/>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DataTable;
