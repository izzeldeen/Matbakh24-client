import React, { Component } from "react";
import Chart from "react-apexcharts";

class ChartView extends Component {
  filterData = (data) => {
    var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < data.marketsByMonth.length; i++) {
      const item = data.marketsByMonth[i]
      arr[item.key.month-1] = item.value
    }
    return arr
  };
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [
            "يناير",
            "فبراير",
            "مارس",
            "أبريل",
            "مايو",
            "يونيو",
            "يوليو",
            "أغسطس",
            "سبتمبر",
            "أكتوبر",
            "نوفمبر",
            "ديسمبر",
          ],
        },
      },
      series: [
        {
          name: "عدد الطباخين",
          data: this.filterData(this.props.data),
        },
      ],
    };
  }
  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        width="450"
      />
    );
  }
}

export default ChartView;
