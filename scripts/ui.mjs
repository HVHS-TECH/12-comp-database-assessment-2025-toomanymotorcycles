export {openLightbox, openGameLightbox, closeLightboxes}

function openLightbox(id) {
            document.getElementById("authLightboxes").style.display = "block";
            document.getElementById(id).style.display = "block";
        }

function openGameLightbox(title, desc, playURL, imgURL) {
            document.getElementById("authLightboxes").style.display = "block";
            document.getElementById("gameLightbox").style.display = "block";
            document.getElementById("gameLightbox").childNodes[1].setAttribute("src",imgURL)
            document.getElementById("gameTitle").innerHTML = title;
            document.getElementById("gameDesc").innerHTML = desc;
            document.getElementById("playButton").setAttribute("onclick",`window.location=\'${playURL}\'`)
        }

function closeLightboxes() {
    for (var i=1; i<document.getElementsByClassName("lightbox").length; i++) {
        document.getElementsByClassName("lightbox")[i].style.display = "none";
    }
    document.getElementById("authLightboxes").style.display = "none";
}

window.openLightbox = openLightbox;
window.openGameLightbox = openGameLightbox;
window.closeLightboxes = closeLightboxes;
