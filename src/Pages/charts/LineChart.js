import React, { Component } from "react";
import Chart from "react-apexcharts";

class LineChart extends Component {

  filterData = (data) => {
    var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < data.driversByMonth.length; i++) {
      const item = data.driversByMonth[i]
      arr[item.key.month-1] = item.value
    }
    return arr
  };

  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
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
        }
      },
      series: [
        {
          name: "عدد المناديب",
          data: this.filterData(this.props.data),
        }
      ]
    };
  }

  render() {
    return (
  
          <Chart
    options={this.state.options}
    series={this.state.series}
    type="line"
    width={'100%'}
    height={'350px'}
  />
       
    );
  }
}

export default LineChart;
