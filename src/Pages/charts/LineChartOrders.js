import React, { Component } from "react";
import Chart from "react-apexcharts";

class LineChartOrders extends Component {
 colors = ["#4834d4","#6ab04c",]
  filterData = (data) => {
    var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < data.sales.length; i++) {
      const item = data.sales[i]
      arr[item.month-1] = parseInt(item.salesValue.toString())
    }
    return arr
  };

  filterEarningData = (data) => {
    var arrr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < data.sales.length; i++) {
      const item = data.sales[i]
      arrr[item.month-1] =parseInt(((parseInt(item.salesValue)-0.25*parseInt(item.salesValue))*0.10).toString())
    }
    return arrr
  };



  

  constructor(props) {
    super(props);

    this.state = {
      options  :{
        chart: {
          height: '100%',
          type: "line",
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        colors: this.colors,
       
        stroke: {
          width: [4, 4]
        },
        plotOptions: {
          bar: {
            columnWidth: "20%"
          }
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
          ]
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#dff9fb"
            },
            labels: {
              style: {
                colors: this.colors[0]
              }
            },
            title: {
              text: "إجمالي المبيعات",
              style: {
                color: this.colors[0]
              }
            }
          },
          {
            opposite: true,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#dff9fb"
            },
            labels: {
              style: {
                colors: this.colors[1]
              }
            },
            title: {
              text: "إجمالي الأرباح",
              style: {
                color: this.colors[1]
              }
            }
          }
        ],
        tooltip: {
          shared: false,
          intersect: true,
          x: {
            show: false
          }
        },
        legend: {
          horizontalAlign: "left",
          offsetX: 40
        }
      },

      series: [
        {
          name: "إجمالي المبيعات",
          data: this.filterData(this.props.data)
        },
        {
          name: "إجمالي الأرباح",
          data: this.filterEarningData(this.props.data)
        }
      ],
   
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

export default LineChartOrders;
