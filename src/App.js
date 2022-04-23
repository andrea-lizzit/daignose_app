import logo from './logo.svg';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Dataviz from './dataviz.js'
import PatientView from './patientview.js'
import React from 'react';

const ipcRenderer  = window.require('electron').ipcRenderer;


class App extends React.Component {
  constructor() {
    super();
    this.state = {dashboard_info: {prob: [], classes: []}}
  }
  handleDiag(files) {
    const img = files[0];
    ipcRenderer.invoke('app:diagnose-img', img).then( (diag) => {
      this.setState({dashboard_info: diag});
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Tabs>
            <TabList>
              <Tab>Database</Tab>
              <Tab>Diagnosis details</Tab>
            </TabList>
            <TabPanel>
              <PatientView onDiag={(files) => this.handleDiag(files)} className="patientview"></PatientView>
            </TabPanel>
            <TabPanel>
              <Dataviz dashboard_info={this.state.dashboard_info}></Dataviz>
            </TabPanel>
          </Tabs>
        </header>
      </div>
    );
  }
}

export default App;
