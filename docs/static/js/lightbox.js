// Creates a modal if there are any images requiring a lightbox
function makeBaseModal(firstImg) {
  var modal = document.createElement('div');
  modal.setAttribute("class", "modal");
  modal.innerHTML = '<span class="close">&times;</span>' +
                    '<img class="modal-content"/>' +
                    '<div id="caption"></div>';
  firstImg.parentNode.insertBefore(modal, firstImg);

  modal.onclick = function() {
    modal.style.display = "none";
  }

  return modal;
}

function run() {
  // Get all images that want to have a lightbox
  var imgs = [...document.getElementsByClassName('lightbox')];

  // If the page requires lightboxes, get everything set up
  if (imgs.length > 0){
    var modal = makeBaseModal(imgs[0]);

    imgs.forEach( function (img) {
      var modalImg = modal.childNodes[1];
      var modalCaption = modal.lastChild;

      // When an image is clicked, the modal is updated to match
      img.onclick = function(){
        modal.style.display="block";
        modalImg.src = img.src;
        modalCaption.innerHTML = img.getAttribute("caption");
      }
    });
  }
}

window.addEventListener("load", run);
