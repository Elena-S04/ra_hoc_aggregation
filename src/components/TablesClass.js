import React from "react";
import MonthTable from "./MonthTableFunc";
import YearTable from "./YearTableFunc";
import SortTable from "./SortTableFunc";
import getList from "./FetchApiFunc";

export default class Tables extends React.Component {
  state = {
    url: "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json",
    list: [],
  };

  async componentDidMount() {
    console.log(this.state.list);
    this.setState({ list: (await getList(this.state.url)).list });
  }

  expectedData(type) {
    const sortList = this.state.list.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    switch (type) {
      case "month":
        return sortList.map((item) => {
          const date = new Date(item.date);
          return {
            month: date.toLocaleString("en-US", { month: "short" }),
            amount: item.amount,
          };
        });
      case "sort":
        return sortList;
      case "year":
        return sortList.map((item) => {
          const date = new Date(item.date);
          return {
            year: date.getFullYear(),
            amount: item.amount,
          };
        });
      default:
        return;
    }
  }

  render() {
    return (
      <div id="app">
        <MonthTable list={this.expectedData("month")} />
        <YearTable list={this.expectedData("year")} />
        <SortTable list={this.expectedData("sort")} />
      </div>
    );
  }
}
