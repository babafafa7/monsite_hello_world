window.onload = function() {
	const largeurGrille = 14;
    const hauteurGrille = 28;
    const carreau = 20;	// Taille en pixels d'une case de la grille
    var canvas;
    var ctx;
    var delay = 250;
    var grille = new Array(largeurGrille);
    var formeSuivante;
	
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
        ["#FF69B4","#FF8C00","#228B22","#4B0082","#DC143C","#FFD700","#00BFFF"],
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

    function drawForme(num, i,j,z) {
		for(x=0 ; x<forme[num][z][0].length ; x++) {
			for(y=0 ; y<forme[num][z][0].length ; y++) {
                if(forme[num][z][y][x] == 1) {
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
		ctx.save();								   
		ctx.clearRect(0,0,largeurGrille * carreau, hauteurGrille * carreau);
        formY++;
        if(collision()){
            transfertFormeToGrille(); 
            numForme = formeSuivante;
            formeSuivante = nouvelleForme();
            formY = 0;
            formX = 5;
        }
		drawForme(numForme, formX, formY, rotation);
        drawForme(formeSuivante, 330, 40,0);
        drawGrille();
        ctx.restore();
        setTimeout(refreshCanvas,delay);
    }

	// Initialisation du canvas
    function init() {
        canvas = document.createElement('canvas');
        canvas.width = largeurGrille * carreau + 150;
        canvas.height = hauteurGrille * carreau;
        canvas.style.border = "2px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        ctx.font = '15px serif';
        ctx.fillText('Prochaine forme :', 310, 30 );
        ctx.beginPath();
        ctx.moveTo(largeurGrille*carreau,0);
        ctx.lineTo(largeurGrille*carreau, hauteurGrille*carreau);
        ctx.stroke();
        numForme = nouvelleForme();
        formeSuivante = nouvelleForme();
        initGrille();
		refreshCanvas();
    }

    function collision(){
        for(x=0 ; x<forme[numForme][rotation].length ; x++) {
			for(y=0 ; y<forme[numForme][rotation].length ; y++) {
                if(forme[numForme][rotation][y][x] == 1){
                    if(((formX + x == largeurGrille) || (formX + x == -1)) || (formY + y == hauteurGrille)){
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
                    grille[formX+x][formY+y-1] = numForme;
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
        num = Math.floor(Math.random() * 7);
        console.log(num);
       return num;
    }

	// Seul ligne de code... avec la gestion des évènements clavier
    init();

	// Gestion des évènements clavier
    document.onkeydown = function handleKeyDown(e) {
        var key = e.keyCode;
        switch(key) {
            // Remarque : Pour connaitre les keycodes : https://keycode.info/
            case 38:  // flèche haut => rotation horaire de la forme
                temp = rotation
                rotation++;
                if(rotation >  forme[numForme].length - 1) rotation = 0;
                if(collision()) rotation = temp;
                break;

            case 40: // flèche haut => rotation anti-horaire de la forme
                temp = rotation
                rotation--;
                if(rotation < 0){rotation = forme[numForme].length-1}
                if(collision()) rotation = temp;
                break;
            
            case 39:
                temp = formX;
                formX++;
                if(collision()) {formX = temp;}
                break;

            case 37:
                temp = formX
                formX--;
                if(collision()) {formX = temp;}
                break;
            
            case 84: //t => changement de forme
                numForme++;
                rotation = 0; 
                if(numForme > forme.length-1){numForme = 0;}                
                break;
        }
    }    
}