import { useState} from 'react';
import Title_Bar from './App Components/Title Bar/Title_Bar.jsx';
import Window_Panel from './App Components/Window Outer Panel/Window_Panel.jsx';
import Side_Panel from './App Components/Side Panel/Side_Panel.jsx';
import Body_GUI from './App Components/Body Part of GUI/Body_GUI.jsx';
import './App.css'

function App() {

  const [sourceFolder, setSourceFolder] = useState('');
  const [folderContents, setFolderContents] = useState([]);
  const [processedCount, setProcessedCount] = useState(0);
  const [folderNameTypeDict, setFolderNameTypeDict] = useState({});

  return (
    
    <div className = "App_Layout">
      <header> <Window_Panel/> </header>

        <header> <Title_Bar folderContents = {folderContents} processedCount = {processedCount}/> </header>

        <div className='App_Body'>

          <Side_Panel folderContents = {folderContents} sourceFolder = {sourceFolder}/>
                  
          <Body_GUI sourceFolder = {sourceFolder} setSourceFolder = {setSourceFolder} setFolderContents={setFolderContents} setProcessedCount = {setProcessedCount} folderContents = {folderContents} folderNameTypeDict = {folderNameTypeDict} setFolderNameTypeDict = {setFolderNameTypeDict} />
        </div>
        
        


    </div>
  

  );
}

export default App;
