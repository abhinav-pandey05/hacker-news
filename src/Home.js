import React, { Component } from "react";
import DataTable from "./DataTable";
import Chart from "./Chart";
import ReactPaginate from "react-paginate";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currentPage: 0,
    };
  }
  componentDidMount() {
    this.receivedData();
  }
  receivedData() {
    let URL =
      "https://hn.algolia.com/api/v1/search?page=" + this.state.currentPage;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => this.setState({ data: data.hits }));
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;

    this.setState(
      {
        currentPage: selectedPage,
      },
      () => {
        this.receivedData();
      }
    );
  };
  render() {
    return (
      <div className="home-container">
        <DataTable items={this.state.data}></DataTable>
        <div className="pagination-container">
          {this.state.postData}
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakClassName={"break-me"}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
        {/* <div className="chart"></div> */}
        <Chart dataSet = {this.state.data}/>
      </div>
    );
  }
}

export default Home;
