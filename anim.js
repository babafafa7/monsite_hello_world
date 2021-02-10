function init(){
    document.getElementById("boutton").addEventListener("mouseover", enSavoirPlus);
    document.getElementById("boutton").addEventListener("mouseout", enSavoirMoins);
}

function enSavoirPlus(){
    codeHtml = '<div class="card-body">'
    +'<p class="card-text">Le texte pour en savoir plus.fzb ekrnnefv erno niaoena banba bann abs s f r rffsfsf sg g z  z z z gzgzgzgzg  zz tz tab tgrg ertg etg ertgertge rtgertgertg etge tgetgerge tg tt ge egerg ggg ebbnb jab obai bb  ba o efsqq qrg qrg qegr qgqr gq</p>'
    +'<a href="./tetris/tetris.html" class="btn btn-primary">Jouer</a>';
    document.getElementById("card1").innerHTML = codeHtml;
}

function enSavoirMoins(){
    codeHtml = '<img class="card-img-top" src="./images/H2x1_NSwitchDS_Tetris99.png" alt="tetris">'
    +'<div class="card-body">'
    +'<h5 class="card-title">Tetris</h5>'
    +'<p class="card-text">Le plus célèbre des jeux de briques.</p>'
    +'<a href="./tetris/tetris.html" class="btn btn-primary">Jouer</a>'
    document.getElementById("card1").innerHTML = codeHtml;
}

window.addEventListener("load", init);