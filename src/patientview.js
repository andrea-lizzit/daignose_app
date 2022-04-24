import { TimeScale } from "chart.js";
import React, {PureComponent} from "react";
import './Patientview.css';

const {Treebeard} = require('react-treebeard');
const ipcRenderer  = window.require('electron').ipcRenderer;

//class Patient extends React.Component {
//	constructor(props) {
//		super(props);
//	}
//	
//	render() {
//		const name = this.props.tree[0].split('/').slice(-2);
//		const desc = this.props.tree[0].split('/').slice(-1);
//		const images = this.props.tree[2]
//		const label =
//            <span className="node" onClick={()=>{
//				this.props.onClick()
//				}}>
//              {name}
//            </span>;
//		return (
//			<div className="patient">
//			<TreeView key={name} nodeLabel={label} collapsed={this.props.collapsed}>
//				<TreeView key={name/images} nodeLabel={"images"} collapsed={this.props.collapsed}>
//					{images.map((node, i) => {
//						return (
//							<div key={i}>image {i}</div>
//						);
//					})}
//				</TreeView>
//			</TreeView>
//			</div>
//		)
//	}
//}

class PatientView extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			tree: [],
		};
		this.onToggle = this.onToggle.bind(this);
	}
	componentDidMount() {
		ipcRenderer.invoke( 'app:get-files' ).then( ( files = [] ) => {
			this.setState({tree: files});
		} );
	}

	handleClick(i, files) {
	  console.log("clicked");
	  console.log(files);
	  this.props.onDiag(files);
	}
    onToggle(node, toggled){
        const {cursor, data} = this.state;
        if (cursor) {
            this.setState(() => ({cursor, active: false}));
        }
        node.active = true;
        if (node.children) { 
            node.toggled = toggled; 
        }
        this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
		if (node.path.endsWith(".png"))
			this.handleClick(0, node.path);
    }
	render() {
		return (
			<Treebeard data={this.state.tree} onToggle={this.onToggle}></Treebeard>
		);
	}
}

export default PatientView;