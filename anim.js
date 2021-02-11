$(document).ready(function(){
    /*$("#card1").on({
        mouseenter: enSavoirPlus,
        mouseleave: enSavoirMoins
    });*/
});

function enSavoirPlus(){
    codeHtml = '<div class="card-body">'
    +'<p class="card-text">Tetris est un jeu vidéo de puzzle conçu par Alekseï Pajitnov à partir de juin 1984 sur Elektronika 60. Lors de la création du concept, Pajitnov est aidé de Dmitri Pavlovski et Vadim Guerassimov pour le développement.</p>'
    +'<a href="./tetris/tetris.html" class="btn btn-primary">Jouer</a>';
    document.getElementById("card1").innerHTML = codeHtml;
}

function enSavoirMoins(){
    codeHtml = '<img class="card-img-top" src="./images/H2x1_NSwitchDS_Tetris99.png" alt="tetris">'
    +'<div class="card-body">'
    +'<h5 class="card-title">Tetris</h5>'
    +'<p class="card-text">Le plus célèbre des jeux de briques.</p>';
    document.getElementById("card1").innerHTML = codeHtml;
}

