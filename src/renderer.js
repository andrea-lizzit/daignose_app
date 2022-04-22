const dragDrop = require( 'drag-drop' );
const { ipcRenderer } = require( 'electron' );

// local dependencies
const dom = require( './dom' );

window.updateFiles = () => {
	ipcRenderer.invoke( 'app:get-files' ).then( ( files = [] ) => {
		dom.displayFiles( files );
	} );
}

// open filesystem dialog
window.openDialog = () => {
    ipcRenderer.invoke( 'app:on-fs-dialog-open' ).then( () => {
        ipcRenderer.invoke( 'app:get-files' ).then( ( files = [] ) => {
            dom.displayFiles( files );
        } );
    } );
}