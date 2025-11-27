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


const explore = $("#explore-button");

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

//Search napin toiminnallisuus

explore.on("click", function() {
    console.log("Nappi toimii")
        
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
);

// All Valinta defaulttina päällä, kun sivu ladataan

$(document).ready(function() {
    allInput.prop("checked", true);
});

// Haetaan API

function searchAll() {
    hideTitle();
    const userInput = $("#user-input").val();
    $.getJSON(`https://www.omdbapi.com/?s=${userInput}&apikey=54405f3f`)
    .done(function(data) {
        console.log("Hakutulokset:", data);

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
        console.log("Hakutulokset:", data);

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
        console.log("Hakutulokset:", data);

    }) 
    .fail(function(error) {
        console.error("Virhe!", error);

    });
}

function hideTitle() {
    $("#title2").hide();
}