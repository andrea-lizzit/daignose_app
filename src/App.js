import logo from './logo.svg';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Lists from './controlled.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Tabs>
          <TabList>
            <Tab>Database</Tab>
            <Tab>Diagnosis details</Tab>
            <Tab>Messaging and Network</Tab>
            <Tab>Lorem</Tab>
          </TabList>
          <TabPanel>
            <button onClick={ () => window.updateFiles()}></button>
            <div id='filelist' class='app__files'></div>
          </TabPanel>
          <TabPanel>
            <Lists dataSource={[['A', 'B'], ['C', 'D']]}></Lists>
          </TabPanel>
          <TabPanel>
            lorem3
          </TabPanel>
          <TabPanel>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </TabPanel>
        </Tabs>
      </header>
    </div>
  );
}

export default App;
