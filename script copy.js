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
            $.each(data.Search, function(index,item) {
                const title = item.Title;
                const year = item.Year;
                const poster = item.Poster !== "N/A" ? item.Poster : "placeholder.jpg"; // Placeholder kuva jos ei ole
                const imbdID = item.imdbID;
                console.log(imbdID);
                const resultItem = `
                    <div class="result-item" data-imdbid="${imdbID}"">
                        <img src="${poster}" alt="Poster of ${title}" class="poster-image"/>
                        <h3 class="movie-title">${title}</h3>
                        <p class="movie-year">${year}</p>
                    </div>
                `;
                results.append(resultItem);
                

            });
        }


$(document).on('click', '.result-item', function() {
    // Haetaan korttiin tallennettu IMDb ID
    const imdbID = $(this).data('imdbid'); 
    
    if (imdbID) {
        // TÄMÄ FUNKTIO TARVITTAAN
        searchDetails(imdbID); 
        console.log("Klikattu ID:", imdbID);
    } else {
        console.log("Virhe: IMDb ID puuttuu.");
    }
});


// --- LISÄÄ TÄMÄ FUNKTIO KAIKKIEN HAKUFUNKTIOIDEN JÄLKEEN ---

function searchDetails(imdbID) {
    const detailsModal = $("#details-modal"); 
    
    // Piilota tuloslista ja näytä latausilmoitus
    $("#results").hide();
    detailsModal.html('<p>Ladataan yksityiskohtaisia tietoja...</p>').show(); 
    
    // API-kutsu tarkemmille tiedoille käyttämällä ID:tä (i=)
    $.getJSON(`https://www.omdbapi.com/?i=${imdbID}&apikey=54405f3f`)
        .done(function(data) {
            detailsModal.empty();
            
            if (data.Response === "True") {
                const detailContent = `
                    <div class="movie-details">
                        <h2>${data.Title} (${data.Year})</h2>
                        <img src="${data.Poster}" alt="Poster of ${data.Title}" />
                        <p><strong>Ohjaaja:</strong> ${data.Director}</p>
                        <p><strong>Genre:</strong> ${data.Genre}</p>
                        <p><strong>Juoni:</strong> ${data.Plot}</p>
                        <p><strong>Arvosana:</strong> ${data.imdbRating}</p>
                        <button id="close-details">Palaa tuloksiin</button>
                    </div>
                `;
                detailsModal.append(detailContent);
            } else {
                detailsModal.html('<p>Yksityiskohtia ei löytynyt.</p>');
            }
        })
        .fail(function(error) {
            console.error("Virhe yksityiskohtien haussa!", error);
            detailsModal.html('<p>Virhe tietojen haussa.</p>');
        });
}

// Lisää kuuntelija palaa-napille
$(document).on('click', '#close-details', function() {
    $("#details-modal").hide();
    $("#results").show(); // Näytä tuloslista uudelleen
});

    })
    .fail(function(error) {
        console.error("Virhe!", error);

    });
}

// Valitun viihdykkeen tarkemmat tiedot


//Leffahaku
function searchMovies() {
    hideTitle();
    const userInput = $("#user-input").val();
    $.getJSON(`https://www.omdbapi.com/?s=${userInput}&type=movie&apikey=54405f3f`)
    .done(function(data) {
        
        // Mitä dataa halutaan: otsikko, vuosi ja kuva.
        // Käytetään for each silmukkaa samaan ylläolevat datat
        if (data.Response === "True") {

            // Tyhjennetään aiemmat tulokset
            results.empty(); 
            $.each(data.Search, function(index,item) {
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
            $.each(data.Search, function(index,item) {
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