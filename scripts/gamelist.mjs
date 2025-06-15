import { fb_read_passOn } from "./readwrite.mjs";
export { loadGames };

function loadGames() {
   fb_read_passOn("/games", (output) => {
    var gameList = Object.values(output);
    var i = 0;
    for (i=0; i<gameList.length; i++) {
        var newEntry = document.getElementById("entryTemplate").cloneNode(true);
        document.getElementById("gameList").appendChild(newEntry);
        newEntry.firstChild.nextSibling.childNodes[4].innerHTML = gameList[i].title;
    }
   });
}
