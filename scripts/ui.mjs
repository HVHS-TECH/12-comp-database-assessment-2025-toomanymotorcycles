export {openLightbox, openGameLightbox, closeLightboxes}

function openLightbox(id) {
            document.getElementById("authLightboxes").style.display = "block";
            document.getElementById(id).style.display = "block";
        }

function openGameLightbox(title, desc, imgURL, playURL) {
            document.getElementById("authLightboxes").style.display = "block";
            document.getElementById("gameLightbox").style.display = "block";
            console.log(document.getElementById("gameLightbox").childNodes[4].childNodes[6])
            //document.getElementById("gameLightbox").childNodes[1].setAttribute("src",imgURL)
            document.getElementById("gameLightbox").childNodes[4].childNodes[1].innerHTML = title;
            document.getElementById("gameLightbox").childNodes[4].childNodes[4].innerHTML = desc;
            document.getElementById("gameLightbox").childNodes[4].childNodes[6].setAttribute("onclick",`window.location=${playURL}`)
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
