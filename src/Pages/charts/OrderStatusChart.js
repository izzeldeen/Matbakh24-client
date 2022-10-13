import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class OrderStatusChart extends Component {

  filterData = (data) => {
    var arr =   [(data.completedOrders*100/(data.currentOrders+data.completedOrders)) ?? 0]
    return arr
  };
  
  constructor(props) {
    super(props);
    this.state = {
      series: this.filterData(this.props.data) ,
      options: {
        chart: {
          type: "radialBar"
        },
 
        series: [67],
        
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: "70%"
            },
           
            dataLabels: {
              showOn: "always",
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "13px"
              },
              value: {
                color: "#111",
                fontSize: "30px",
                show: true,
                formatter: (value) => {
                  return value.toFixed(3)
                },
              }
            }
          }
        },
      
        stroke: {
          lineCap: "round",
        },
        labels: ["الطلبات المكتملة"]
      },
    
    
    };
  }

  render() {

    return (
     
        <Chart options={this.state.options} series={this.state.series} type="radialBar" width={'100%'}
        height={'350px'} />
     
    );
  }
}

export default OrderStatusChart;
