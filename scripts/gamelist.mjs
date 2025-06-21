import { fb_read_passOn, fb_updateRecordTable } from "./readwrite.mjs";
export { loadGames, loadRecords, updateRecords, updateSingleRecord };
var i = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function loadGames() {
   fb_read_passOn("/games", (output) => {
    var gameList = Object.values(output);
    var i = 0;
    for (i=0; i<gameList.length; i++) {
        var newEntry = document.getElementById("entryTemplate").cloneNode(true);
        newEntry.removeAttribute("id");
        document.getElementById("gameList").appendChild(newEntry);
        console.log(gameList)
        newEntry.firstChild.nextSibling.childNodes[4].childNodes[1].innerHTML = gameList[i].title;
        newEntry.setAttribute("onclick", `openGameLightbox("${gameList[i].title}","${gameList[i].description}","${gameList[i].url}","${gameList[i].imgURL}")`);
    }
   });
}

function loadRecords() {
    fb_read_passOn("/games", (output) => {
    var gameList = Object.values(output);
    var recordEntries = null;
    var i = 0;
    var v = 0;
    for (i=0; i<gameList.length; i++) {
        recordEntries = Object.values(gameList[i].recordEntries)
        console.log(recordEntries)
        for(v=0; v<recordEntries.length; v++) {
            var newEntry = document.getElementById("recordsTemplate").cloneNode(true);
            newEntry.removeAttribute("id");
            document.getElementById("recordsList").appendChild(newEntry);
            console.log(newEntry.childNodes);
            newEntry.childNodes[1].innerHTML = recordEntries[v].name;
            newEntry.setAttribute("data-id-link",recordEntries[v].id);
            console.log(newEntry.dataset.idLink);
        }
    }
   });
}

async function updateSingleRecord(updatedTable, newValue) {
    var returnedValue = [];
    console.log(updatedTable)
    console.log(Object.values(Object.values(newValue)[0]));
    updatedTable.childNodes[5].childNodes[1].innerHTML = "";
                fb_updateRecordTable(`/records/${updatedTable.dataset.idLink}`,"value",10,true,updatedTable,(rawRecords, table) => {
                try{
                    var records = Object.values(rawRecords);
                    var v = 0;
                    console.log("AAAAA: "+records.length)
                    for (v=0; v<records.length; v++) {
                        console.log(records[v]);
                        var newScore = document.createElement("li");
                        newScore.innerHTML = `${records[v].score} (${records[v].user})`
                        console.log(updatedTable.dataset.idLink+":"+newScore.innerHTML);
                        returnedValue.push(newScore)
                        console.log(returnedValue)
                    }
                    var x = 0;
                    for (x=0; x<returnedValue.length; x++) {
                        console.log("TABLE: "+updatedTable+", IDLINK: "+updatedTable.dataset.idLink);
                        console.log("WRITING ENTRY "+x)
                        updatedTable.childNodes[5].childNodes[1].appendChild(returnedValue[x])
                    }
                    returnedValue = [];
                } catch {}
            });
}

function updateRecords() {
    var tables = document.getElementsByClassName("recordsTable");
    var returnedValue = [];
    for(i=0; i<tables.length; i++) {
        console.log("i = "+i)
        if (!tables[i].id) {
            tables[i].childNodes[5].childNodes[1].innerHTML = "";
            console.log("idLink: " + tables[i].dataset.idLink);
            fb_updateRecordTable(`/records/${tables[i].dataset.idLink}`,"value",10,true,tables[i],(rawRecords, table) => {
                try{
                    var records = Object.values(rawRecords);
                    var v = 0;
                    console.log("AAAAA: "+records.length)
                    for (v=0; v<records.length; v++) {
                        console.log(records[v]);
                        var newScore = document.createElement("li");
                        newScore.innerHTML = `${records[v].score} (${records[v].user})`
                        console.log(table.dataset.idLink+":"+newScore.innerHTML);
                        console.log(tables[i])
                        returnedValue.push(newScore)
                        console.log(returnedValue)
                    }
                    var x = 0;
                    for (x=0; x<returnedValue.length; x++) {
                        console.log("TABLE: "+table+", IDLINK: "+table.dataset.idLink);
                        console.log("WRITING ENTRY "+x)
                        table.childNodes[5].childNodes[1].appendChild(returnedValue[x])
                    }
                    returnedValue = [];
                } catch {}
            });
        }
    }
}

window.updateRecords = updateRecords;
window.updateSingleRecord = updateSingleRecord;
