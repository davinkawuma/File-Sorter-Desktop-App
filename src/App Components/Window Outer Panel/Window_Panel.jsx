import './Window_Panel.css'


function Window_Panel() {


    const handleWindow = (action) => {
        if (window.electron?.windowControl) {
        window.electron.windowControl(action);
        } else {
        console.warn('windowControl API not available');
        }
    };

    return (


        <div className="Frame_For_Window">


            <div className="window-controls">
                <button className = 'minimizeButton' onClick={() => handleWindow('minimize')}>—</button>

                <button className = 'maximizeButton' onClick={() => handleWindow('maximize')}>▢</button>

                <button className = 'closeButton' onClick={() => handleWindow('close')}>x</button>
            </div>
        </div>
    );

}


export default Window_Panel;
