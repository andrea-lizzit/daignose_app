import logo from './logo.svg';
//import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Lists from './controlled.js'
import PatientView from './patientview.js'

const ipcRenderer  = window.require('electron').ipcRenderer;

var dashboard_info = "open a new diagnosis";
function handleDiag(files) {
  const img = files[0];
  ipcRenderer.invoke('app:diagnose-img', img).then( (diag) => {
    dashboard_info = diag;
  });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Tabs>
          <TabList>
            <Tab>Database</Tab>
            <Tab>Diagnosis details</Tab>
          </TabList>
          <TabPanel>
            <PatientView onDiag={(files) => handleDiag(files)}></PatientView>
          </TabPanel>
          <TabPanel>
            <span>{dashboard_info}</span>
          </TabPanel>
        </Tabs>
      </header>
    </div>
  );
}

export default App;
