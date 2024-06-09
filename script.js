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



