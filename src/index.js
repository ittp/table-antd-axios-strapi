import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Table } from "antd";

var axios = require("axios");
var data = "";

var config = {
  method: "get",
  url: "https://api.samodelkin.email/yookassa/list",
  headers: {},
  data: data
};

const columns = [
  {
    title: "UUID",
    dataIndex: "id"
  }
];

class App extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false
  };

  componentDidMount() {
    //this.fetch();

    let td = this.fetch();

    console.log(td);
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };

  fetch = (params = {}) => {
    console.log("params:", params);
    this.setState({ loading: true });
    const pagination = { ...this.state.pagination };
    axios(config)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
      .then((data) => this.setState({ loading: false, pagination, data }));

    // reqwest({
    //   url: "https://api.samodelkin.email/yookassa/list",
    //   method: "get",
    //   data: {
    //     results: 10,
    //     ...params
    //   },
    //   type: "json"
    // }).then((data) => {
    //
    //   // Read total count from server
    //   // pagination.total = data.totalCount;
    //   pagination.total = 200;
    //   this.setState({
    //     loading: false,
    //     data: data.items,
    //     pagination
    //   });
    // });
  };

  render() {
    return (
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
