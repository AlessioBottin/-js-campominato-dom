// PARTE 1 
// L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.


// // PARTE 2 
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: 
// non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi 
// con l'inizializzazione di git).
// L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella:
// se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, 
// altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
// BONUS:
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste


// ANALISI 
// [x] imposto il numero di bombe generatedBombsNumber
// [x] imposto il numero di maxRightAttempts 
// [x] Genero l'array di 16 numeri casuali e diversi compresi tra 1 e generatedCellsNumber: le bombe 
// [x] al click:
//              [x] se il numero cliccato è presente nella lista delle bombsArray
//                 - [x] do alla cella classe bomb (colore rosso) 
//                 - [] termino la partita con una funzione endGame
//              [x] altrimenti la cella si colora di azzurro e la cella non è più cliccabile
//                 - [x] inserisco il numero in un array di rightAttempts
//                       se la lunghezza di rightAttempts = maxRightAttempts
//                      - [] termina la partita con una funzione endGame



// Quando l' utente cliccca play parte il gioco
const playBtn = document.getElementById('play-btn');
playBtn.addEventListener('click', gameStart);

function gameStart() {
    // Raccolgo il dato sull'impostazione della difficolta 
    const gameDifficulty = document.getElementById('difficulty').value;
    let generatedCellsNumber;

    // Resetto le celle precedenti 
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    // imposto il numero di bombe 
    let generatedBombsNumber = 1;

    // Cambio il numero di celle in base alla difficoltà 
    switch (gameDifficulty) {
        case 'easy':
            generatedCellsNumber = 100;
            break;
        case 'medium':
            generatedCellsNumber = 81;
            break;
        case 'hard':
            generatedCellsNumber = 49;
            break; 
        default:
    }

    // imposto il numero di maxRightAttempts in base alla dificoltà
    let maxRightAttempts = generatedCellsNumber - generatedBombsNumber;
    console.log(maxRightAttempts); // test

    // Genero l' array di numeri casuali e diversi 
    const rndNumbersArray = getRndNumbersArray(generatedCellsNumber);

    // Per ogni numero genero una cella e la appendo al div che la contiene
    for ( i = 0; i < rndNumbersArray.length; i++ ) {
        thisNumber = rndNumbersArray[i];

        // Genero cella 
        const createdCell = createCell(thisNumber, generatedCellsNumber);

        // Do alla cella la possibilità di essere cliccata:
        createdCell.addEventListener('click', handleCellClick);

        // Appendo cella 
        grid.appendChild(createdCell);
    } 
    
    // Genero l'array di 16 numeri casuali e diversi compresi tra 1 e generatedCellsNumber: le bombe 
    const bombsArray = [];

    while ( bombsArray.length < generatedBombsNumber ) {
        let genereatedBomb = getRndInteger(1, generatedCellsNumber);

        if ( !bombsArray.includes(genereatedBomb) ) {
            bombsArray.push(genereatedBomb);
        }
    }
    
    // Genero l' array di rightAttempts 
    const rightAttempts = [];

    console.log(rightAttempts); // test
    console.log(bombsArray); //test
    
    // DOM SPECIFIC FUNCTIONS 
    // al click:
    function handleCellClick() {
        // se il numero cliccato è presente nella lista delle bombsArray
        const clickedNumber = parseInt(this.querySelector('span').textContent);
   
        if ( bombsArray.includes(clickedNumber) ) {
            // do alla cella classe bomb (colore rosso) 
            this.classList.add('bomb');

            // termino la partita con una funzione endGame
            alert('il gioco è finito');

        } else {
            // altrimenti la cella si colora di azzurro e la cella non è più cliccabile 
            this.classList.add('clicked');
            this.style.pointerEvents = "none";
            // inserisco il numero in un array di rightAttempts 
            rightAttempts.push(clickedNumber);
            console.log(rightAttempts);

            // se la lunghezza di rightAttempts = maxRightAttempts 
            if ( rightAttempts.length === maxRightAttempts) {
                alert('il gioco è finito hai vinto');
            }
        }
    }
}


// ---------
// FUNCTIONS 
// ---------

// Genera un div con all' interno uno span e un numero
// number --> numero che voglio dare allo span 
// dimensionNumber --> dimensione relativa al contenitore es: 7 = 1/7 del contenitore 
function createCell(number, dimensionNumber) {
    const newCell = document.createElement('div');
    newCell.classList.add('cell');
    let cellDimensionNumber = Math.sqrt(dimensionNumber);
    newCell.style.width = `calc( 100% / ( ${cellDimensionNumber} ) )`;
    newCell.style.height = `calc( 100% / ( ${cellDimensionNumber} ) )`;
    newCell.innerHTML = 
    `
    <span>${number}</span>
    `;

    return newCell;
}

// Genera un array di numeri in posizione casuale e mai doppi da 1 a numbersQuantity inclusi 
// numbersQuantity --> quantità di numeri che vogliamo 
function getRndNumbersArray(numbersQuantity) {
    const numbersArray = [];   

    while ( numbersArray.length < numbersQuantity ) {
        const rndNumber = getRndInteger(1, numbersQuantity);

        if ( !numbersArray.includes(rndNumber) ) {
            numbersArray.push(rndNumber);
        }
    }

    return numbersArray;
}

// Genera un numero da min a max inclusi 
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

