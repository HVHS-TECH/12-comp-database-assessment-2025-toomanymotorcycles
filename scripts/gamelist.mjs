import { fb_read_passOn } from "./readwrite.mjs";
export { loadGames };

function loadGames() {
   fb_read_passOn("/games", (output) => {
    var gameList = Object.values(output);
    var i = 0;
    for (i=0; i<gameList.length; i++) {
        var newEntry = document.getElementById("entryTemplate").cloneNode(true);
        document.getElementById("gameList").appendChild(newEntry);
        console.log(gameList)
        newEntry.firstChild.nextSibling.childNodes[4].childNodes[1].innerHTML = gameList[i].title;
        newEntry.setAttribute("onclick", `openGameLightbox("${gameList[i].title}","${gameList[i].description}","${gameList[i].url}","${gameList[i].imgURL}")`);
    }
   });
}
