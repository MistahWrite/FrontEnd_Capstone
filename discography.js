const api_key = "f07c2aeb03be433d8e60bdc5fdc10671";

var url = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s=coldplay';

var submitBtn;

window.onload=function(){
    var discography = document.getElementById("discography");
    var submitBtn = document.getElementById("submit");
    var search = document.getElementById("search");
    submitBtn.addEventListener("click", function(e) {
        e.preventDefault();
        getSearch()});


    search.addEventListener("keyup", function(e) {
        e.preventDefault(); 
    
        var key = e.keyCode;

        if (key == 13) {
            console.log("KeyCode = " + e.keyCode);
            submitBtn.click();
        }
    });
}

function getSearch() {
    let search_box = document.getElementById("search").value;

    if (search_box == "") { alert("You need to enter a valid artist's name"); } 
    else {

        url = 'https://theaudiodb.com/api/v1/json/1/discography.php?s=' + search_box;

        axios.get(url)
        .then(function (response){
            console.log(response.data);

            url = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s=' + search_box;
            discography.innerHTML = '';
            axios.get(url)
            .then(function (response){
                console.log(response.data);
                var idArtist = response.data.artists[0].idArtist;
                discography.innerHTML = "<br><div class='biography'>";
                discography.innerHTML +="<h2>Biography:</h2> " + response.data.artists[0].strBiographyEN + "<BR/>";
                discography.innerHTML += "<br><b>Country:</b> " + response.data.artists[0].strCountry + "<br/>";
                discography.innerHTML += "<b>Genre:</b> " + response.data.artists[0].strGenre + "<br/>";
                discography.innerHTML += "<b>Label:</b> " + response.data.artists[0].strLabel + "<br/>";

                discography.innerHTML += "<b>Facebook:</b> <a href='http://" + response.data.artists[0].strFacebook + "' target='_blank'>" + response.data.artists[0].strFacebook + "</a><br/>";
                discography.innerHTML += "<b>Twitter:</b> <a href='http://" + response.data.artists[0].strTwitter + "' target='_blank'>" + response.data.artists[0].strTwitter + "</a><br/>";
                discography.innerHTML += "<b>Website:</b> <a href='http://" + response.data.artists[0].strWebsite + "' target='_blank'>" + response.data.artists[0].strWebsite + "</a><br/>";
                discography.innerHTML += "</div>";
                discography.innerHTML += "</div>";

                url = 'https://theaudiodb.com/api/v1/json/1/album.php?i=' + idArtist;
                axios.get(url)
                .then(function(response){
                    console.log(response);
                    for(var i = 0; i < response.data.album.length; i++) {
                        discography.innerHTML += "<div class='album'><a target='_blank' href='https://www.youtube.com/results?search_query=" + search_box + " " + response.data.album[i].strAlbum + "'><img src='" + response.data.album[i].strAlbumThumb + "'><br/>" + response.data.album[i].strAlbum + "</a><br/>Releeased: " + response.data.album[i].intYearReleased + "</div>";
                    }
                })
                .catch(function(err){
                    console.log(err);
                })
                .then(function() {
                    console.log(url);
                });
            })
            .catch(function(err){
                    console.log(err);  
            })
            .then(function(){
                console.log(url);
            });
            //discgraphy.innerHTML = "";
            for(var i = 0; i < response.data.album.length; i++) {
             //   discography.innerHTML += "<div class='album'><a target='_blank' href='https://www.youtube.com/results?search_query=" + search_box + " " + response.data.album[i].strAlbum + "'>" + response.data.album[i].strAlbum + "</a><br/>Releeased: " + response.data.album[i].intYearReleased + "</div>";
            }
            //discgraphy.innerHTML += "";
        })
        .catch(function(err){
            console.log("Error: " + err);
        })
        .then(function(){
            console.log(url);
        });
    }
}