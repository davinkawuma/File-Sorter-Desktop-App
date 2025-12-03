import './Body_GUI.css'
import { useActionState, useState } from 'react';
import fileIcon from 'C:/users/dave8/file-sorter-app/pixel_assets/Folder_Icon2.png';

import StartButtonIcon from 'C:/users/dave8/file-sorter-app/pixel_assets/Start Button icon.png'


function Body_GUI({sourceFolder, setSourceFolder, setFolderContents, setProcessedCount, folderContents, folderNameTypeDict, setFolderNameTypeDict, runPython}){

    const [foldersAndFilesDict, setFolderAndFilesDict] = useState({});

    const [folderContentsTypes, setFolderContentsTypes] = useState([]);

    const [folderCount, setFolderCount] = useState(1);

    const [inputtedFolderNums, setInputtedFolderNums] = useState(new Set());

    const [inputtedFolderNames, setInputtedFolderNames] = useState([]);

    const [currentFileNum, setCurrentFileNum] = useState(Number(1));

    const [currentFolderName, setCurrentFolderName] = useState('');

    const [currentFileType, setCurrentFileType] = useState('');

    const runSorter = () => {
        
        window.electronAPI.runSorter({
            sourceFolder,
            folderNameTypeDict,
            foldersAndFilesDict
        });
        
        handleReadFolder(sourceFolder);
       
    };

    const handleSelectFolder = async () => {
        var folderPath = await window.electronAPI.selectFolder();
        folderPath = String(folderPath);

        if (folderPath) {
            console.log('folder path: ', typeof folderPath, folderPath);

            setSourceFolder(folderPath);
            handleReadFolder(folderPath);
        }
        else{
            console.log("This stupid else was triggered ");
        }
        return String(folderPath); 
    }
    const handleReadFolder = async (path) => {
        
        var finalFolderContents = [];
        var finalArrTypes = []; 

        const result = await window.electronAPI.readFolder(path);
        setFolderAndFilesDict(result); 
    
        
        Object.values(result).forEach(val => {
            //console.warn('val: ', val);
            
            finalFolderContents.push({
                name : val.name,
                isDirectory: val.isDirectory
            });

            console.log('finalFolderContents: ', finalFolderContents);

            if(!finalArrTypes.includes(val.type)){
                console.log('already contains this type', val.type);
                finalArrTypes.push(val.type);
            }
    
        });
        
        setFolderContents(finalFolderContents);

        
        if( folderContentsTypes.length == 0 && inputtedFolderNames.length == 0){
            setFolderContentsTypes(finalArrTypes); 
            console.log('content types length is 0');
        }
        

        console.warn('finalFolderContents: ', folderContents);
        console.warn('fileTypesArr: ', folderContentsTypes);
    };

    const simulateProgress = (totalFiles = 20) => {
            setProcessedCount(0);
            let count = 0;

            const interval = setInterval(() => {
                count++;
                setProcessedCount(count);

                if (count >= totalFiles) {
                clearInterval(interval);
                }
            }, 100); // 100ms per file = 2 seconds total
    };

    const handleFileChange = (e) => {

        //const files = e.target.files;
        //console.log('folderContents: ', folderContents);
       
        handleSelectFolder(e);

        simulateProgress(20);
    }

    const handleFolderTypesInput = (e) => {

        setCurrentFileType(e.target.value);

    }

    const handleNumFile = (e) => {

        var tempSet = new Set();

        setFolderCount(e.target.value);

        for(let x = 1; x <= folderCount; x++ ){
            tempSet.add(x);
        }

        setInputtedFolderNums(tempSet);

    }

    const handleFinalNameFiles = (e) => {
        
        if(!( currentFileNum != NaN ) || currentFileNum >= 1){

            console.warn('it contains: ', currentFileNum);
        

            if(inputtedFolderNums.size == 0){

                console.warn('ran out of folders to name. Its reached 0 dude');
                
            }
            else{
                console.warn('current inputtedFolderNums', {inputtedFolderNums}, {})
                if(currentFolderName != ""){

                    if(!(inputtedFolderNames.includes(currentFolderName))){

                        const updatedNames = [...inputtedFolderNames, currentFolderName];
                        const updatedNums = new Set(inputtedFolderNums);
                        updatedNums.delete(currentFileNum);

                        setInputtedFolderNames(updatedNames);
                        setInputtedFolderNums(updatedNums);
                    }
                    else{
                        console.warn('you have inputted a file with that name already');
                    }
                }
                else{
                    console.warn("Input a folder name for folder {", {currentFileNum} , "}");
                }
                setCurrentFileNum(NaN);
                }
        }
        else{

            console.warn('the else was triggered');
        }


    }

    const fileNameSubmission = (e) => {

        //setCurrentFileNum_toFileName(e.target.value);
        var fileVal = Number(e.target.value);
        console.log(fileVal); 

        console.log("Current file num: ", fileVal);

    }

    const handleNames_Types = (e) => {

        handleFinalNameFiles(e);

        handleFolderTypesInput(e);
    }

    const handleFileType_andName = (e) => {


        var tempFolderName = new String(currentFolderName);

         if(!folderNameTypeDict[tempFolderName]){

            folderNameTypeDict[tempFolderName] = new Array();

            folderNameTypeDict[tempFolderName].push(currentFileType);

        }
        else{
            console.warn('This else was triggered: ', tempSet);


            folderNameTypeDict[tempFolderName].push(currentFileType);

        }

        var tempSet = new Set(folderContentsTypes);

        tempSet.delete(currentFileType);

        setFolderContentsTypes(Array.from(tempSet));
        setFolderNameTypeDict(folderNameTypeDict);

        console.warn('This is tempSet types: ', tempSet);
        console.warn('Currentf folder key ', currentFolderName);
        console.warn('This is folderNameTypeDict full Dict: ', folderNameTypeDict);



    }





    return(

        <div className='Source_Folder'>

                <h1>  Make Your Selection </h1>
                <div>
                <label htmlFor = "Source-Folder-input"> Source Folder Selection:   </label>
                <button 
                    onClick={handleFileChange} 
                >       Select a Folder</button>
                </div>

                <div>
                    <label htmlFor="folderCountRange">How many new folders would you like to make?</label>
                    <input
                        className="folderCountRange"
                        type="range"
                        min="1"
                        max="10"
                        value={folderCount}
                        onChange = {(e)=> {
                            setFolderCount(Number(e.target.value));
                            setCurrentFileNum(Number(NaN));
                            setInputtedFolderNums(new Set()); 
                            setInputtedFolderNames(new Array());
                            setFolderNameTypeDict({});
                        }}
                    />
                    <span>{folderCount}</span>

                    <button  type = 'submit' value = {folderCount} onClick={handleNumFile}> Submit </button>
                </div>

                <div>
                    <label> Please specify the name <input type = 'text' value = {currentFolderName} onChange={(e) => {setCurrentFolderName(e.target.value)}}/> you would like for folder:  </label>

                        <select  onChange = {(e) => {

                                setCurrentFileNum(Number(e.target.value));
                                } 
                                
                            }>

                            <option onChange={console.log('current file num ', currentFileNum)}> Select a folder number</option>
                        
                            {[...inputtedFolderNums].map((typeVal) => (
                                    
                                <option key = {typeVal} value = {typeVal}> {typeVal} </option>

                            ))}

                            
                        </select>
                   
                    <button  type = 'submit' onClick = { handleNames_Types} > Submit </button>


                </div>

                <div>
                    
                    <label> </label>
                    
                </div>

                <div>
                    
                    <label htmlFor='fileTypesOptions'> Select which type of files you would like in each folder

                        <select onChange = { (e)=>(setCurrentFolderName(e.target.value)) }>

                            <option > Select a Folder Name</option>

                            {inputtedFolderNames.map((typeVal) => (
                                
                            <option key = {typeVal} value = {typeVal} >{typeVal} </option>

                        ))}
                        </select>
                        
                    </label>
                    
                    <select className='fileTypesOptions' onChange={handleFolderTypesInput}>

                        <option>Select Folder Type(s)</option>

                        {folderContentsTypes.map((typeVal) => (
                                
                            <option key = {typeVal} value = {typeVal} > {typeVal} </option>

                        ))}

                    </select>

                    <button type = 'submit' className='SubmitButtons' onClick = {handleFileType_andName}>
                        Submit
                    </button>
                
                
                </div>
                <div>

                    <label htmlFor = 'begin_processButton'> Click The Green Button to Begin the Process!  </label>
                    
                    <div className='folderContainer-beginButton'>

                        <div className='FolderName-container'>
                            {inputtedFolderNames.map((namesOfFolders) => (

                                <div className = 'FolderNames-divs'>
                                    {<img src = {fileIcon} className='folderIcons'/>} 
                                    {namesOfFolders}
                                </div>
                            )

                            
                            )}
                        </div>
                        <button className = 'begin_processButton' onClick = {runSorter}> Click Here! </button>
                       
                    </div>


                </div>
 


                
        


        </div>

    )

}
export default Body_GUI;         