import "./Title_Bar.css"
import progressFrame from 'C:/users/dave8/file-sorter-app/pixel_assets/top panel progress bar.png';
import progressFill from 'C:/users/dave8/file-sorter-app/pixel_assets/progress_over_fill.png';

function Title_Bar({folderContents, processedCount}){

    return(

        <div className = "Top_Panel">        
            <h1>File Wizard!!</h1>

            {folderContents.length === 0 && (
                <p className="loading-text">No folder selected</p>
            )}
            {processedCount < folderContents.length && folderContents.length > 0 && (
                <p className="loading-text">Loading files...</p>
            )}
            {processedCount >= folderContents.length && folderContents.length > 0 && (
                <p className="loading-text">Complete!</p>
                
            )}

            

            
            <div className = "Progress_Bar">

                
                


            <div
                        
            alt="Progress Fill"
            className={`progress-bar-fill ${processedCount > 0 ? 'animateFillBar' : ''}`}> 
            
            </div>

        
            
            
            <div  alt="Progress Frame" className="progress-frame" >  </div>
    


            </div>
        </div>



 
    )

    /*
    {folderContents.length === 0 && (
                <p className="loading-text">No folder selected</p>
            )}
            {processedCount < folderContents.length && folderContents.length > 0 && (
                <p className="loading-text">Loading files...</p>
            )}
            {processedCount >= folderContents.length && folderContents.length > 0 && (
                <p className="loading-text">Complete!</p>
            )}
    */
}
export default Title_Bar;