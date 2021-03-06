import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


class Dataviz extends React.Component {
	constructor(props) {
	  super(props);
	  var data = {
		labels: this.props.dashboard_info.classes,
		datasets: [
		  {
			label: 'Disease probability',
			data: this.props.dashboard_info.prob,
			backgroundColor: [
			  'rgba(255, 99, 132, 0.2)',
			  'rgba(54, 162, 235, 0.2)',
			  'rgba(255, 206, 86, 0.2)',
			  'rgba(75, 192, 192, 0.2)',
			  'rgba(153, 102, 255, 0.2)',
			  'rgba(255, 159, 64, 0.2)',
			  'rgba(255, 206, 86, 0.2)',
			  'rgba(75, 192, 192, 0.2)',
			  'rgba(153, 102, 255, 0.2)',
			  'rgba(255, 159, 64, 0.2)',
			],
			borderColor: [
			  'rgba(255, 99, 132, 1)',
			  'rgba(54, 162, 235, 1)',
			  'rgba(255, 206, 86, 1)',
			  'rgba(75, 192, 192, 1)',
			  'rgba(153, 102, 255, 1)',
			  'rgba(255, 159, 64, 1)',
			  'rgba(255, 206, 86, 1)',
			  'rgba(75, 192, 192, 1)',
			  'rgba(153, 102, 255, 1)',
			  'rgba(255, 159, 64, 1)',
			],
			borderWidth: 1,
		  },
		],
	  };
	  this.state = {data: data};
	}
	render() {
		if (this.props.dashboard_img) {
			return (<div className='dashboard_view'>
				<div className='graph-wrapper'>
				<Pie data={this.state.data}></Pie>
				</div>
					<img className='dashboard_img' src={`data:image/jpeg;base64,${this.props.dashboard_img}`} />
				<div className='img-wrapper'>
				</div>
				</div>);
		} else {
			return (<Pie data={this.state.data}></Pie>); 
		}
	}
  }

export default Dataviz