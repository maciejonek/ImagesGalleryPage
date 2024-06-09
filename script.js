document.addEventListener('DOMContentLoaded', ()=>{
    getAlbums();

});

function getAlbums(){
    $.get("https://jsonplaceholder.typicode.com/albums",
        function (data){
            addAlbums(data);
        }
    );
}


function addAlbums(data){
    for(let album of data){
        $('#gallery').append(
            $('<div></div>')
            .addClass("album")
            .attr("id", album.id)
            .attr("onclick","showAlbum(this.id)")
            .text(album.title));
    }
    
}
function showAlbum(id){
    $('#gallery').toggleClass('hide');
    $('#album').toggleClass("hide");
    getPhotos(id);

}

function getPhotos(id){
    $.get("https://jsonplaceholder.typicode.com/photos?albumId="+id,
        function (data){
            addPhotos(data);
        }
    );
}

function addPhotos(data){
    for(let photo of data){
        $('#album').append(
            $('<div></div>')
            .addClass('photo')
            .append(
                $('<div></div>')
                .text(`Title: ${photo.title}`)
            )
            .append(
                $('<img></img>')
                .attr('id',photo.id)
                .attr('src', photo.thumbnailUrl)
                .attr("onclick","showLightbox(this.id)")));
    }
    
}
function showLightbox(id){
    bodyBackgroundColorToggler();
    $('#album').toggleClass("hide");
    $('#lightbox').toggleClass("hide");
   
    getLightboxPhoto(id);
}

function getLightboxPhoto(id){
    $.get("https://jsonplaceholder.typicode.com/photos/"+id,
        function (data){
            openLightbox(data.url);
        }
    );
}

function openLightbox(url){
    
    $('#lightbox').append(
            $('<img></img>')
            .attr('src', url));
    
}

function bodyBackgroundColorToggler(){
    if($('body').css("background-color")=='rgb(47, 47, 47)')
        $('body').css("background-color", 'rgb(255,255,255)');
    else
        $('body').css("background-color",'rgb(47, 47, 47)');
}

function returnButton(){
    if(!$('#formBox').hasClass('hide')){
        // console.log(1);
        $('#album').toggleClass('hide');
        $('#formBox').toggleClass('hide');
    }
    else if($('#lightbox').hasClass('hide')){
        // console.log(2);
        $('#album').toggleClass('hide');
        $('#album').children().not(".returnButton, .postForm").remove();
        $('#gallery').toggleClass('hide');
    }
    else{
        // console.log(3);
        bodyBackgroundColorToggler();
        $('#lightbox').toggleClass('hide');
        $('#lightbox').children().not(".returnButton").remove();
        $('#album').toggleClass('hide');

    }

}

function openForm(){
    $('#formBox').toggleClass('hide');
    $('#album').toggleClass('hide');
}

function validateFileType() {
    var fileName = $("#fileName").val();
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "gif") {
      $('.form').append(`<p>${fileName.replace('C:\\fakepath\\','')}</p>`)
    } else {
      alert("Only jpg, jpeg, png and gif files are allowed!");
      $('#fileName').val('');
      $('#fileName').attr('accept',".jpg,.jpeg,.png,.gif");
    }
  }