import React from 'react';

const TreeView = require('react-treeview');

class PatientElement extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<TreeView
				key={this.props.name}
				nodeLabel={this.props.name}>
				{["a","v"].map(entry => <div className="info" key={entry}>{entry}</div>)}
			</TreeView>
		);
	}
}

class Lists extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
		value: props.dataSource,
		collapsedBookkeeping: props.dataSource.map(() => false),
	};
  }

  handleClick(i) {
    let [...collapsedBookkeeping] = this.state.collapsedBookkeeping;
    collapsedBookkeeping[i] = !collapsedBookkeeping[i];
    this.setState({collapsedBookkeeping: collapsedBookkeeping});
  }

  collapseAll() {
    this.setState({
      collapsedBookkeeping: this.state.collapsedBookkeeping.map(() => true),
    });
  }

  render() {
    const collapsedBookkeeping = this.state.collapsedBookkeeping;
    return (
      <div>
        <button onClick={this.collapseAll}>Collapse all</button>
		{this.props.dataSource.map((node, i) => {
			const label =
				<span className="node" onClick={this.handleClick.bind(null, i)}>
					Type {i}
				</span>;
			return (
				<PatientElement name={i}></PatientElement>
			);
		})}
      </div>
    );
  }
}

export default Lists;




