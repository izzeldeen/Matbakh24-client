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
          height: 280,
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
                show: true
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
      <div className="donut">
        <Chart options={this.state.options} series={this.state.series} type="radialBar"/>
      </div>
    );
  }
}

export default OrderStatusChart;
