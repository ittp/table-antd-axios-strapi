import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Table } from "antd";

var axios = require("axios");

const columns = [
  {
    key: "key",
    dataSource: "key",
    editable: false
  },
  {
    title: "name",
    dataIndex: "name",
    editable: true
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
    console.log(this.state);
    // console.log(td);
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
    var config = {
      method: "get",
      url: "https://api.github.com/meta",
      headers: {
        "User-Agent": "Mozilla",
        Accept: "application/json"
      },
      data: {
        // ...params
      }
      // params: { ...params }
    };

    // console.log("params:", params);
    this.setState({ loading: true });
    const pagination = { ...this.state.pagination };

    axios(config)
      .then((r) => r.data)
      .catch((e) => console.log(e))
      .then((data) => {
        let keys = Object.keys(data);

        let index = (data, index) => [index];

        let response = keys.map((key, index) => {
          let value = data[key];
          let o = { key, value };
          return o;
        });

        let columns = keys.map((key) => Object.create({ key, dataIndex: key }));
        this.setState({
          table: {
            columns
          },
          meta: { keys, response, data }
        });

        // let row = Object.keys(data);

        // let cell = Object.entries(data);

        // let col = (data) =>
        //   Object.create({
        //     key: "",
        //     dataIndex: "",
        //     editable: true,
        //     widget: "input"
        //   });

        // Object.keys(data).map((i, k) => {
        //   let row = data[i];
        //   let cell = Object.values(row);

        //   console.log(row, cell);
        //   // console.log(data[i]);

        //   return {
        //     key: k,
        //     dataIndex: i,
        //     editable: true,
        //     widget: "input"
        //   };
        // });

        // console.log(row);
        // console.log(data);
      });
    // .then((data) => this.setState({ loading: false, pagination, data }));

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
    // let columnss = [
    //   { key: "key", dataIndex: "key" },
    //   { key: "value", dataIndex: "value" }

    // ];

    let table = this.state.table;

    let getColumnData = (key) => {};
    let createColumnCell = (data) => {};

    return (
      <Table
        columns={this.state.columns}
        // rowKey={(record) => record.key}
        dataSource={this.state.data}
        // dataSource={[{ key: 0 }, { key: 1 }]}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        onRow={(data) => console.log(data)}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
