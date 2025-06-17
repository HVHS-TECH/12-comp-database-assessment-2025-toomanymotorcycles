//**************************************************************/
// fb_readwrite.mjs
// Read/Write firebase routines
// Written by <Your Name Here>, Term 2 202?
//
// All variables & function begin with fb_  all const with FB_
// Diagnostic code lines have a comment appended to them //DIAG
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme

console.log('%c fb_readwrite.mjs initialised',
    'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
import { ref, query, orderByChild, limitToFirst, limitToLast, get, set, update, onValue, remove} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { database } from "./init.mjs"
/**************************************************************/
// Import all the methods you want to call from the firebase modules


/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export { fb_read, fb_read_passOn, fb_readpath, fb_write, fb_update, fb_sortedread, fb_listen, fb_delete, randomInteger};


function randomInteger(digits) {
    return Math.floor(Math.random()*(10**digits))
}
//console.log("RANDOMTEST "+ randomInteger(10))

/**************************************************************/
// function fb_read(path)
// Written by Joshua Kessell-Haak, Term 1 2025
// Reads the value at {variable path} in the database.
/**************************************************************/
function fb_read(path) {
    console.log('%c fb_read(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';'
    );
    if (window.user != null) {
        console.log("Attempting to read value as user \"" + user.displayName +"\"") ;   
    } else {
        console.log("Attempting to read value as anonymous user");
    }
    const reference = ref(database, path);
    get(reference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            console.log(fb_data);
            //document.getElementById("p_fbReadRec").innerHTML = fb_data;
        } else {
            console.warn("The data at \'" + ref + "\' was not found.");
        }

    }).catch((error) => {
        console.warn(error.code + " - " + error.message);
        if (error.message = "Permission denied.") {
            console.warn("PERMISSION DENIED - you do not have permission to read the database at the queried location.")
            //document.getElementById("p_fbReadRec").innerHTML = "Permission denied.";
            //alert("PERMISSION DENIED - you do not have permission to read the database at the queried location.")
        } else {
            console.warn(error.code + " - " + error.message);
        }
    });
};

function fb_read_passOn(path,nextFunction) {
    console.log('%c fb_read(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';'
    );
    if (window.user != null) {
        console.log("Attempting to read value as user \"" + user.displayName +"\"") ;   
    } else {
        console.log("Attempting to read value as anonymous user");
    }
    const reference = ref(database, path);
    get(reference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            console.log(fb_data);
            //document.getElementById("p_fbReadRec").innerHTML = fb_data;
            nextFunction(fb_data);
        } else {
            console.warn("The data at \'" + ref + "\' was not found.");
            nextFunction(fb_data);
        }

    }).catch((error) => {
        console.warn(error.code + " - " + error.message);
        if (error.message = "Permission denied.") {
            console.warn("PERMISSION DENIED - you do not have permission to read the database at the queried location.")
            //document.getElementById("p_fbReadRec").innerHTML = "Permission denied.";
            //alert("PERMISSION DENIED - you do not have permission to read the database at the queried location.")
        } else {
            console.warn(error.code + " - " + error.message);
        }
    });
};

/**************************************************************/
// // function fb_readpath(path)
// Written by Joshua Kessell-Haak, Term 1 2025
// Exactly the same function as function fb_read(path).
/**************************************************************/
function fb_readpath(path) {
    console.log('%c fb_readpath(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';'
    );
    if (window.user != null) {
        console.log("Attempting to read path as user \"" + user.displayName +"\"") ;   
    } else {
        console.log("Attempting to read path as anonymous user");
    }
    const reference = ref(database, path);
    get(reference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            console.log(fb_data);
            //document.getElementById("p_fbReadAll").innerHTML = fb_data;
        } else {
            console.warn("The data at \'" + ref + "\' was not found.");
        }

    }).catch((error) => {
        if (error.message = "Permission denied.") {
            console.warn("PERMISSION DENIED - you do not have permission to read the database at the queried location.")
            //document.getElementById("p_fbReadAll").innerHTML = "Permission denied.";
            //alert("PERMISSION DENIED - you do not have permission to read the database at the queried location.")
        } else {
            console.warn(error.code + " - " + error.message);
        }
    });
};

/**************************************************************/
// function fb_write(path, value)
// Written by Joshua Kessell-Haak, Term 1 2025
// Writes {variable value} to the database at {variable path}. Overwrites all data at that location.
/**************************************************************/
function fb_write(path, value) {
    console.log('%c fb_write(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';'
    );
    if (window.user != null) {
        console.log("Attempting to write value as user \"" + user.displayName +"\"")  ;
    } else {
        console.log("Attempting to write value as anonymous user");
    }
    const reference = ref(database, path);
    set(reference, value).then(() => {
        console.log("Write successful.")
        //document.getElementById("p_fbWriteRec").innerHTML = "Success.";
    }).catch((error) => {
        if (error.message = "Permission denied.") {
            //document.getElementById("p_fbWriteRec").innerHTML = "Permission denied.";
            console.warn("PERMISSION DENIED - you do not have permission to write to the database at the queried location.")
            //alert("PERMISSION DENIED - you do not have permission to write to the database at the queried location.")
        } else {
            console.warn(error.code + " - " + error.message);
        }
    });
};

/**************************************************************/
// // function fb_update(path, value)
// Written by Joshua Kessell-Haak, Term 1 2025
// Writes to the database at {variable path} based off the object passed with {variable value}.
// If write location has multiple value/field pairs, only changes those specified in {variable value}.
/**************************************************************/
function fb_update(path, value) {
    console.log('%c fb_update(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';'
    );
    if (window.user != null) {
        console.log("Attempting to update value as user \"" + user.displayName +"\"")  ;
    } else {
        console.log("Attempting to update value as anonymous user");
    }
    const reference = ref(database, path);
    update(reference, value).then(() => {
        console.log("Update successful.")
        //document.getElementById("p_fbUpdateRec").innerHTML = "Success.";
    }).catch((error) => {
        if (error.message = "Permission denied.") {
            console.warn("PERMISSION DENIED - you do not have permission to update the database at the queried location.")
            //document.getElementById("p_fbUpdateRec").innerHTML = "Permission denied.";
            //alert("PERMISSION DENIED - you do not have permission to update the database at the queried location.")
        } else {
            console.warn(error.code + " - " + error.message);
        }
    });
}

/**************************************************************/
// function fb_sortedread(path, orderKey, limit, orderDescending)
// Written by Joshua Kessell-Haak, Term 1 2025
// Reads the value at {variable path} in the database. 
// Orders the returned values based on the field values of the values 
// within the read location with the name of {variable orderKey}.
// Will only return the number {variable limit} of values.
// If {variable orderDescending} is true, the returned values are ordered 
// on descending order instead of ascending order.
/**************************************************************/
function fb_sortedread(path, orderKey, limit, orderDescending) {
    console.log('%c fb_sortedread(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';'
    );
    if (window.user != null) {
        console.log("Attempting to read value as user \"" + user.displayName +"\"") ;   
    } else {
        console.log("Attempting to read value as anonymous user");
    }

    var reference;
    if (orderDescending) { reference = query(ref(database, path), orderByChild(orderKey), limitToLast(limit));} 
    else {reference = query(ref(database, path), orderByChild(orderKey), limitToFirst(limit));}

    get(reference).then((allSnapshots) => {
        if (allSnapshots != null) {
            var fb_data = []
        allSnapshots.forEach(function (snapshot) {
            fb_data.push(snapshot.val());
        })
        if (orderDescending) {fb_data.reverse();}
        console.log(fb_data)
        } else {
                console.warn("The data at \'" + ref + "\' was not found.");
        }
    }).catch((error) => {
        console.warn(error.code + " - " + error.message);
        if (error.message = "Permission denied.") {
            document.getElementById("p_fbReadSorted").innerHTML = "Permission denied.";
            console.warn("PERMISSION DENIED - you do not have permission to read the database at the queried location.")
            alert("PERMISSION DENIED - you do not have permission to read the database at the queried location.")
        } else {
            console.warn(error.code + " - " + error.message);
        }
    });
};

/**************************************************************/
// // function fb_listen(path)
// Written by Joshua Kessell-Haak, Term 1 2025
// Sets up a listener on {variable path}. 
// When anything changes at this location, the listener will trigger and return the new data.
/**************************************************************/
function fb_listen(path) {
    console.log('%c fb_listen(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';'
    );
    if (window.user != null) {
        console.log("Attempting to set up listener on value as user \"" + user.displayName +"\"") ;   
    } else {
        console.log("Attempting to set up listener on value as anonymous user");
    }
    const reference = ref(database, path);
    onValue(reference, (snapshot) => {
        console.log("LISTENER ACTIVATED")
        var fb_data = snapshot.val();
        if (fb_data != null) {
            console.log(fb_data);
            //document.getElementById("p_fbListen").innerHTML = fb_data;
            return fb_data;
        } else {
            console.warn("The data at \'" + ref + "\' was not found.");
        }

    });
};

/**************************************************************/
// function fb_delete(path)
// Written by Joshua Kessell-Haak, Term 1 2025
// Deletes the value at {variable path}
/**************************************************************/
function fb_delete(path) {
    console.log('%c fb_delete(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';'
    );
    if (window.user != null) {
        console.log("Attempting to delete value as user \"" + user.displayName +"\"") ;   
    } else {
        console.log("Attempting to delete value as anonymous user");
    }
    const reference = ref(database, path);
    remove(reference).then(() => {
        console.log("Removal successful.")
        //document.getElementById("p_deleteRec").innerHTML = "Success.";
    }).catch((error) => {
        console.warn(error.code + " - " + error.message);
        if (error.message = "Permission denied.") {
            //document.getElementById("p_fbDeleteRec").innerHTML = "Permission denied.";
            console.warn("PERMISSION DENIED - you do not have permission to delete the value at the queried location.")
            //alert("PERMISSION DENIED - you do not have permission to delete the value at the queried location.")
        } else {
            console.warn(error.code + " - " + error.message);
        }
    });
};

/**************************************************************/
// END OF CODE
/**************************************************************/