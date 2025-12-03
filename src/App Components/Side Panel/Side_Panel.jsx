import './Side_Panel.css';
import fileIcon from 'C:/users/dave8/file-sorter-app/pixel_assets/actualFileIcon_0001.png';
import folderIcon from 'C:/users/dave8/file-sorter-app/pixel_assets/Folder_Icon2.png';

function Side_Panel({ sourceFolder, folderContents }) {
  const displayName = sourceFolder.split(/[\\/]/).pop();

  return (
    <div className="Side_Panel">
      <h1>This is Your Src Folder View!</h1>

      <div className="actual_contentWindow">
        <div>
          Source Folder Name: {displayName || 'No Folder Selected Yet'}
        </div>

        <div className="file_list-container">

          <ul className="file_listSidePanel">

            {Object.values(folderContents).map((val) => (
              <li key={val.name} className="individual_file_divs">
                {val.isDirectory ? (
                  <img src={folderIcon} alt={val.name} className="folder-icon" />
                ) : (
                  <img src={fileIcon} alt={val.name} className="file-icon" />
                )}
                {val.name}
              </li>
            ))}

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Side_Panel;
