import React from "react";
const TreeView = require('react-treeview');
const ipcRenderer  = window.require('electron').ipcRenderer;

class Patient extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const name = this.props.tree[0].split('/').slice(-2);
		const desc = this.props.tree[0].split('/').slice(-1);
		const images = this.props.tree[2]
		const label =
            <span className="node" onClick={()=>{
				this.props.onClick()
				}}>
              name
            </span>;
		return (
			<div>
			<TreeView key={name} nodeLabel={label} collapsed={this.props.collapsed}>
				<TreeView key={name/images} nodeLabel={"images"} collapsed={this.props.collapsed}>
					{images.map((node, i) => {
						return (
							<div key={i}>image {i}</div>
						);
					})}
				</TreeView>
			</TreeView>
			</div>
		)
	}
}

class PatientView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tree: [],
			collapsedBookkeeping: [],
		};
	}
	componentDidMount() {
		ipcRenderer.invoke( 'app:get-files' ).then( ( files = [] ) => {
			this.setState({tree: files, collapsedBookkeeping: files.map(() => false)});
		} );
	}

	handleClick(i, files) {
	  let [...collapsedBookkeeping] = this.state.collapsedBookkeeping;
	  collapsedBookkeeping[i] = !collapsedBookkeeping[i];
	  this.setState({collapsedBookkeeping: collapsedBookkeeping});
	  console.log("clicked")
	  this.props.onDiag(files);
	}
	render() {
		return (
			<div>
				{this.state.tree.map((node, i) => {
					const desc = node[0];
					const name = desc.split('/').slice(-2);
					return (
						<Patient key={name} tree={node} collapsed={false} onClick={this.handleClick.bind(this, i, node[2])}></Patient>
					)
				})}
			</div>
		);
	}
}

export default PatientView;