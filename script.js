// Vantan sumutausta
VANTA.FOG({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  highlightColor: 0x0,
  midtoneColor: 0x110f0f,
  lowlightColor: 0x0,
  baseColor: 0x555555
})


// Const määritykset
// Search box (käyttäjän syöte) id ="user-input", 

const moviesInput = $("#movies");
const seriesInput = $("#series");
const allInput = $("#all");

const results = $("#results");

// ScreenSpace painikkeen toiminnallisuus
$(".title").on("click", function() {
    location.reload();
});


// Hakutoiminto

$("#user-input").on("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        console.log("Enter toimii")
        
        // Tarkistus vaihe onko valittu movies, series vai all
        if (moviesInput.is(":checked")) {
            searchMovies();
        }
        else if (seriesInput.is(":checked")) {
            searchSeries();
        }
        else if (allInput.is(":checked")) {
            searchAll();
        }
    }
});

// Search nappi toiminallisuus
$("#explore-button").on("click", function(event) {
    event.preventDefault();
    
    // Tarkistus vaihe onko valittu movies, series vai all
    if (moviesInput.is(":checked")) {
        searchMovies();
    }
    else if (seriesInput.is(":checked")) {
        searchSeries();
    }
    else if (allInput.is(":checked")) {
        searchAll();
    }
});

// All Valinta defaulttina päällä, kun sivu ladataan

$(document).ready(function() {
    allInput.prop("checked", true);
});

// Haetaan API

function searchAll() {
    hideTitle();
    const userInput = $("#user-input").val();
    const results = $("#results");
    $.getJSON(`https://www.omdbapi.com/?s=${userInput}&apikey=54405f3f`)
    .done(function(data) {
        // Mitä dataa halutaan: otsikko, vuosi ja kuva.
        // Käytetään for each silmukkaa samaan ylläolevat datat
        if (data.Response === "True") {
            results.empty(); // Tyhjennetään aiemmat tulokset
            data.Search.forEach(function(item) {
                const title = item.Title;
                const year = item.Year;
                const poster = item.Poster !== "N/A" ? item.Poster : "placeholder.jpg"; // Placeholder kuva jos ei ole
                const resultItem = `
                    <div class="result-item">
                        <img src="${poster}" alt="Poster of ${title}" class="poster-image"/>
                        <h3 class="movie-title">${title}</h3>
                        <p class="movie-year">${year}</p>
                    </div>
                `;
                results.append(resultItem);     

            });
        }


    })
    .fail(function(error) {
        console.error("Virhe!", error);

    });
}



//Leffahaku
function searchMovies() {
    hideTitle();
    const userInput = $("#user-input").val();
    $.getJSON(`https://www.omdbapi.com/?s=${userInput}&type=movie&apikey=54405f3f`)
    .done(function(data) {
        // Mitä dataa halutaan: otsikko, vuosi ja kuva.
        // Käytetään for each silmukkaa samaan ylläolevat datat
        if (data.Response === "True") {
            results.empty(); // Tyhjennetään aiemmat tulokset
            data.Search.forEach(function(item) {
                const title = item.Title;
                const year = item.Year;
                const poster = item.Poster !== "N/A" ? item.Poster : "placeholder.jpg"; // Placeholder kuva jos ei ole
                const resultItem = `
                    <div class="result-item">
                        <img src="${poster}" alt="Poster of ${title}" class="poster-image"/>
                        <h3 class="movie-title">${title}</h3>
                        <p class="movie-year">${year}</p>
                    </div>
                `;
                results.append(resultItem);     

            });
        }
    })
    .fail(function(error) {
        console.error("Virhe!", error);

    });
}

// Sarjahaku
function searchSeries() {
    hideTitle();
    const userInput = $("#user-input").val();
    $.getJSON(`https://www.omdbapi.com/?s=${userInput}&type=series&apikey=54405f3f`)
    .done(function(data) {
        // Mitä dataa halutaan: otsikko, vuosi ja kuva.
        // Käytetään for each silmukkaa samaan ylläolevat datat
        if (data.Response === "True") {
            results.empty(); // Tyhjennetään aiemmat tulokset
            data.Search.forEach(function(item) {
                const title = item.Title;
                const year = item.Year;
                const poster = item.Poster !== "N/A" ? item.Poster : "placeholder.jpg"; // Placeholder kuva jos ei ole
                const resultItem = `
                    <div class="result-item">
                        <img src="${poster}" alt="Poster of ${title}" class="poster-image"/>
                        <h3 class="movie-title">${title}</h3>
                        <p class="movie-year">${year}</p>
                    </div>
                `;
                results.append(resultItem);     

            });
        }
    })
    .fail(function(error) {
        console.error("Virhe!", error);

    });
}

function hideTitle() {
    $("#title2").hide();
}

function showTitle() {
    $("#title2").show();
}