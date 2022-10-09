import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class DriversRateChart extends Component {
  filterData = (data) => {
    var arr = [0,0,0,0];

    arr[0]=data.driversByCity.filter(e=>e.key.city=="الدمام")[0]?.value ?? 0
    arr[1]=data.driversByCity.filter(e=>e.key.city=="الخبر")[0]?.value ?? 0
    arr[2]=data.driversByCity.filter(e=>e.key.city=="الرياض")[0]?.value ?? 0
    arr[3]=data.driversByCity.filter(e=>e.key.city=="الجبيل")[0]?.value ?? 0

    console.log(arr);

    return arr
  };


  constructor(props) {
    super(props);
    this.state = {
      series: this.filterData(this.props.data),
      options: {
        chart: {
          width: 500,
          type: 'donut',
        },
        labels: ["الدمام", "الخبر", "الرياض", "الجبيل"],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 500
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    
    
    };
  }

  render() {

    return (
      <div className="donut">
        <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
      </div>
    );
  }
}

export default DriversRateChart;
