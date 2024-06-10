document.addEventListener('DOMContentLoaded', ()=>{
    apiGet("https://jsonplaceholder.typicode.com/albums",addAlbums)
});

function apiGet(url, func){
    $.get(url,
        function (data){
            func(data);
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
    $('.albumBox').toggleClass("hide");
    $('.albumBox').attr('id',id);
    apiGet("https://jsonplaceholder.typicode.com/photos?albumId="+id,addPhotos)

}



function addPhotos(data){
    for(let photo of data){
        $('.albumBox').append(
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
    $('.albumBox').toggleClass("hide");
    $('#lightbox').toggleClass("hide");
    apiGet("https://jsonplaceholder.typicode.com/photos/"+id,openLightbox);
}

function openLightbox(data){
    
    $('#lightbox').append(
            $('<img></img>')
            .attr('src', data.url));
    
}

function bodyBackgroundColorToggler(){
    if($('body').css("background-color")=='rgb(47, 47, 47)')
        $('body').css("background-color", 'rgb(255,255,255)');
    else
        $('body').css("background-color",'rgb(47, 47, 47)');
}

function returnButton(){
    if(!$('#formBox').hasClass('hide')){
        $('.albumBox').toggleClass('hide');
        $('#formBox').toggleClass('hide');
    }
    else if($('#lightbox').hasClass('hide')){
        $('.albumBox').toggleClass('hide');
        $('.albumBox').children().not(".returnButton, .postForm").remove();
        $('#gallery').toggleClass('hide');
    }
    else{
        bodyBackgroundColorToggler();
        $('#lightbox').toggleClass('hide');
        $('#lightbox').children().not(".returnButton").remove();
        $('.albumBox').toggleClass('hide');

    }

}

function openForm(){
    $('#formBox').toggleClass('hide');
    $('.albumBox').toggleClass('hide');
}

function validateFileType() {
    var fileName = $("#fileName").val();
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "gif") {
      $('#file').text(fileName.replace('C:\\fakepath\\',''));
    } else {
      alert("Only jpg, jpeg, png and gif files are allowed!");
      $('#fileName').val('');
      $('#fileName').attr('accept',".jpg,.jpeg,.png,.gif");
    }
  }

function readForm(){
    $('.form').on('submit', function(event){
        event.preventDefault();
        var formInvalid = false;
        $('.form>input').each(function() {
        if ($(this).val() === '') {
            formInvalid = true;
        }
        });

        if (!formInvalid){
        var formData = {
            albumId: $('.albumBox').attr('id'),
            title: $('#title').val(),
            url: $('#fileName').val(),
            thumbnailUrl: $('#fileName').val()
        }
        $.ajax({
            type: "POST",
            url: "https://jsonplaceholder.typicode.com/photos",
            data: formData,
            dataType: "json",
            success: function (response) {
                console.log('Response:', response);
            }
        });
        console.log(formData);
        $('.form').each(function () { 
             this.reset();
        });
        $('#file').remove()
        }
    })
}