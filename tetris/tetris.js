﻿window.onload = function() {
	const largeurGrille = 14;
    const hauteurGrille = 28;
    const carreau = 20;	// Taille en pixels d'une case de la grille
    var canvas;
    var ctx;
    var delay;
    var timer_is_on;
    var grille = new Array(largeurGrille);
    var formeSuivante;
    var ctrLignes;
    var myAudio = document.createElement("audio");
    myAudio.src = "tetris-gameboy-02.mp3";
    myAudio.loop = true;
	
	// Position de la forme sur la grille
	const XInitial = 5;
	const YInitial = 0;
    var formX = XInitial;
    var formY = YInitial;

	// Numéro de la forme (du tableau "forme") à afficher 
	var numForme = 0;
	// Sélection de la version de la forme à afficher (différentes rotations possibles)
    var rotation = 0;
    
    var couleursFormes = [
        ["#0000FF","#00FF00","#FF0000","#8A2BE2","#FF4500","#FFFF00","#00FFFF"],
        ["#000000","#000000","#000000","#000000","#000000","#000000","#000000"]
    ]

	// Tableau de définition des formes
    var forme = new Array();
    forme[0]= [
        [	// rotation 0
            [0,0,0],
            [1,1,1],
            [0,0,1]
        ],
        [	// rotation 1
            [0,1,0],
            [0,1,0],
            [1,1,0]
        ],
        [	// rotation 2
            [1,0,0],
            [1,1,1],
            [0,0,0]
        ],
        [	// rotation 3
            [0,1,1],
            [0,1,0],
            [0,1,0]
        ]
    ]; 
    
	forme[1] = [
        [	// rotation 0 (cette forme là n'a besoin que de 2 rotations)
            [0,0,0],
            [0,1,1],
            [1,1,0]
        ],
        [	// rotation 1
            [0,1,0],
            [0,1,1],
            [0,0,1]
        ]        
    ];

    forme[2] = [
        [
            [0,0,0],
            [1,1,0],
            [0,1,1]
        ],
        [
            [0,1,0],
            [1,1,0],
            [1,0,0]
        ]
    ];

    forme[3] = [
        [
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ],
        [
            [0,1,0],
            [0,1,1],
            [0,1,0]
        ],
        [
            [0,0,0],
            [1,1,1],
            [0,1,0]
        ],
        [
            [0,1,0],
            [1,1,0],
            [0,1,0]
        ]
    ];

    forme[4] = [
        [
            [0,0,0],
            [1,1,1],
            [1,0,0]
        ],
        [
            [1,1,0],
            [0,1,0],
            [0,1,0]
        ],
        [
            [0,0,1],
            [1,1,1],
            [0,0,0]
        ],
        [
            [0,1,0],
            [0,1,0],
            [0,1,1]
        ]
    ];

    forme[5] = [
        [
            [0,0,0,0],
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0]
        ]
    ];

    forme[6] = [       
        [
            [0,0,0,0],
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0]
        ],
        [
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0]
        ],
        [
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0]
        ]
    ];

    

	// !!! Fin de déclaration des variables !!!
	
	// !!! Les fonctions !!!
	
	// Dessine une forme à l'écran 
	// Variable utilisées :
	//		numForme : numéro de la forme à afficher (tableau forme)
	//		rotation : version de la forme à afficher (tableau forme[numForme])
	//		formX : Position horizontale de la forme sur la grille
	//		formY : Position verticale de la forme sur la grille

    function initGrille(){
        for(x = 0 ; x < largeurGrille ; x++){
            grille[x] = new Array(hauteurGrille);
        }
        for(x = 0; x < largeurGrille; x++){
            for(y = 0; y < hauteurGrille; y++){
                grille[x][y]=-1;
            }
        }
    }

    function drawForme(num, i, j, z) {
		for(let x=0 ; x<forme[num][z][0].length ; x++) {
			for(let y=0 ; y<forme[num][z][0].length ; y++) {
                if(forme[num][z][y][x] === 1) {
                    ctx.fillStyle = couleursFormes[1][num];
                    ctx.fillRect((i + x) * carreau, (j + y) * carreau, carreau, carreau);
                    ctx.fillStyle = couleursFormes[0][num];
                    ctx.fillRect((i + x) * carreau + 1, (j + y) * carreau + 1, carreau - 2, carreau - 2);
                }
            }
        }
    }
    
	// Rafraichi l'affichage :
	//  - efface le canvas
	//  - dessine la forme
    function refreshCanvas() {
        vitesse();
		ctx.save();								   
		ctx.clearRect(0,0,largeurGrille * carreau, hauteurGrille * carreau);
        drawForme(numForme, formX, formY, rotation);
        drawGrille();
        formY++;
        if(collision()){
            if(formY < 2){
                gameOver();
            }
            else{
                formY--;
                transfertFormeToGrille();
                verifierLignes(); 
                ctx.clearRect(largeurGrille * carreau + 15, 11 * carreau, 150, 100);
                ctx.fillStyle = 'rgb(255, 14, 243)';
                ctx.font = 'bold 30px serif';
                ctx.fillText(ctrLignes, 350, 250);
                numForme = formeSuivante;
                formeSuivante = nouvelleForme();
                ctx.clearRect(largeurGrille * carreau + 15, 2 * carreau, 150, 100);
                drawForme(formeSuivante, 16, 3,0);
                formY = 0;
                formX = 5;
                rotation = 0;
            }
            
        }
        ctx.restore();
        if(timer_is_on){
            setTimeout(refreshCanvas,delay);
        }
        else{
            if(!collision()){
                afficherPause();
            }
        }
    }

	// Initialisation du canvas
    function init() {
        ctrLignes = 0;
        timer_is_on = false;
        initGrille();
        canvas = document.createElement('canvas');
        canvas.width = largeurGrille * carreau + 150;
        canvas.height = hauteurGrille * carreau;
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        ctx.font = 'bold 15px serif';
        ctx.fillStyle = 'rgb(255, 14, 243)';
        ctx.fillText('Prochaine forme :', 310, 30 );
        ctx.fillText('Lignes :', 310, 200);
        ctx.font = 'bold 30px serif';
        ctx.fillText(ctrLignes, 350, 250);
        
        
        ctx.beginPath();
        ctx.lineWidth = 15;
        ctx.moveTo(largeurGrille*carreau,0);
        ctx.lineTo(largeurGrille*carreau, hauteurGrille*carreau);
        ctx.strokeStyle = 'rgb(255, 14, 243)';
        ctx.stroke();
        numForme = nouvelleForme();
        formeSuivante = nouvelleForme();
        drawForme(formeSuivante, 16, 3,0);
		refreshCanvas();
    }

    function restart(){
        ctrLignes = 0;
        formY = 0;
        formX = 5;
        rotation = 0;
        timer_is_on = false;
        initGrille();
        ctx.clearRect(0,0,largeurGrille * carreau, hauteurGrille * carreau);
        ctx.clearRect(largeurGrille * carreau + 15, 11 * carreau, 150, 100);
        ctx.clearRect(largeurGrille * carreau + 15, 2 * carreau, 150, 100);
        ctx.font = 'bold 30px serif';
        ctx.fillStyle = 'rgb(255, 14, 243)';
        ctx.fillText(ctrLignes, 350, 250);
        numForme = nouvelleForme();
        formeSuivante = nouvelleForme();
        drawForme(formeSuivante, 16, 3,0);
		refreshCanvas();
    }

    function collision(){
        for(x=0 ; x<forme[numForme][rotation].length ; x++) {
			for(y=0 ; y<forme[numForme][rotation].length ; y++) {
                if(forme[numForme][rotation][y][x] == 1){
                    if(((formX + x >= largeurGrille) || (formX + x <= -1)) || (formY + y >= hauteurGrille)){
                        return true;
                    }
                    if(grille[formX+x][formY+y] > -1){
                        return true
                    }
                }
            }
        }
        return false;
    }

    function transfertFormeToGrille(){
        for(x=0 ; x<forme[numForme][rotation].length ; x++) {
			for(y=0 ; y<forme[numForme][rotation].length ; y++) {
                if(forme[numForme][rotation][y][x] == 1) {
                    grille[formX+x][formY+y] = numForme;
                }
            }
        }
    }

    function drawGrille(){
        for(x=0; x<largeurGrille; x++){
            for(y=0; y<hauteurGrille; y++){
                if(grille[x][y] > -1){
                    ctx.fillStyle = couleursFormes[1][grille[x][y]];
                    ctx.fillRect(x * carreau, y * carreau, carreau, carreau);
                    ctx.fillStyle = couleursFormes[0][grille[x][y]];
                    ctx.fillRect(x * carreau + 1, y * carreau + 1, carreau - 2, carreau - 2);
                }
            }
        }
    }

    function nouvelleForme(){
       return Math.floor(Math.random() * 7);
    }

    function verifierLignes(){
        let a;
        let y = formY;

        for(let b = 0; b < forme[numForme][0].length; b++){
            a = true;
            for(let x = 0; x < grille.length; x++){
                if(grille[x][y] === -1){
                    a = false;
                    break;
                }
            }
            if(a){
                effaceLigne(y);
                ctrLignes++;
            }
            y++;
            if(y >= grille[0].length){
                break;
            }
        }
    }

    function effaceLigne(numLigne){
        for(;numLigne > 0; numLigne--){
            for(let x=0; x < grille.length; x++){    
                grille[x][numLigne] = grille[x][numLigne-1];
            }
        }
        grille[x][numLigne] = -1;
    }

    function vitesse(){
        if(ctrLignes < 5){
            delay = 200;
        }
        else if((ctrLignes >= 5) && (ctrLignes < 10)){
            delay = 180;
        }
        else if((ctrLignes >= 10) &&(ctrLignes < 20)){
            delay = 160;   
        }
        else if((ctrLignes >= 20) && (ctrLignes < 30)){
            delay = 140;   
        }
        else if((ctrLignes >= 30) && (ctrLignes < 50)){
            delay = 120;   
        }
        else{
            delay = 100;
        }
    }

    function gameOver(){
        ctrLignes = 0;
        timer_is_on = false;
        myAudio.pause();						   
        ctx.fillStyle= 'rgb(255, 14, 243)';
        ctx.font = 'bold 40px sans-serif';
        ctx.fillText("RETRY => R", 20, 280);
    }

    function afficherPause(){
        ctx.fillStyle= 'rgb(255, 14, 243)';
        ctx.font = 'bold 40px sans-serif';
        ctx.fillText("PAUSE", 75, 280);
    }

	// Seul ligne de code... avec la gestion des évènements clavier
    init();

	// Gestion des évènements clavier
    document.onkeydown = function handleKeyDown(e) {
        var key = e.keyCode;
        switch(key) {
            case 38:  // flèche haut => rotation horaire de la forme
                temp = rotation
                rotation++;
                if(rotation >  forme[numForme].length - 1) rotation = 0;
                if(collision()) rotation = temp;
                break;

            case 40: // flèche bas => descend immédiatement la pièce au plus bas
                while(!collision()){
                    formY++;
                }
                formY--;
                break;
            
            case 39: //flèche droite => déplacer pièce à droite
                temp = formX;
                formX++;
                if(collision()) {formX = temp;}
                break;

            case 37: //flèche gauche => déplacer pièce à gauche
                temp = formX
                formX--;
                if(collision()) {formX = temp;}
                break;

            case 32: //p => met en pause le jeu ou le reprend
                if(timer_is_on){
                    timer_is_on = false;
                    myAudio.pause();
                }
                else{
                    timer_is_on = true;
                    myAudio.play();
                    refreshCanvas();
                }
                break;
            case 82: //r => recommence le jeu 
                myAudio.pause();
                restart();
            break;
        }
    }    
}