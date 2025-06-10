export {openLightbox, closeLightboxes}

function openLightbox(id) {
            for (var i=1; i<document.getElementsByClassName("lightbox").length; i++) {
                document.getElementsByClassName("lightbox")[i].style.display = "none";
            }
            document.getElementById("authLightboxes").style.display = "block";
            document.getElementById(id).style.display = "block";
        }
function closeLightboxes() {
    for (var i=1; i<document.getElementsByClassName("lightbox").length; i++) {
        document.getElementsByClassName("lightbox")[i].style.display = "none";
    }
    document.getElementById("authLightboxes").style.display = "none";
}

window.openLightbox = openLightbox;
window.closeLightboxes = closeLightboxes;