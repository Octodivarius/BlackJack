let deck = [];
const tipos = ["C","D","H","S"];
const especiales = ["J","Q","K","A"];

let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHtml = document.querySelectorAll('small');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btn1');
const resultadoPartida = document.querySelector('#resultadoPartida');

const crearDeck = () => {

    for (let i = 2 ; i <= 10 ; i++){
        for(let tipo of tipos){
            deck.push(i+tipo);
        }
    }

    for(let especial of especiales){
        for(let tipo of  tipos){
            deck.push(especial+tipo);
        }
    }

    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
    }


crearDeck();


//Funcion pedir una carta
const pedirCarta = () =>{
    if (deck.length === 0){
        throw 'No hay mas cartas';
    }
    const carta = deck.pop();
    return carta;
}

//Funcion obtener el valor de una carta

const valorCarta = (carta) => {
    
    const valor = carta.substring(0, carta.length-1);
    return (isNaN(valor)) ? 
                (valor ===  "A") ? 11 : 10
                : valor * 1;
}

//Funcion para el turno de la computadora

const turnoComputadora = (puntosMinmos) => {

    do{
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHtml[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/img/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if (puntosMinmos > 21) {
            break;
        }

    } while((puntosComputadora < puntosMinmos) &&( puntosMinmos <= 21));

    setTimeout(() => {
        
        if( puntosComputadora === puntosMinmos ) {
           // alert('Nadie gana :(');
           resultadoPartida.innerText = 'Nadie Gana, Empate';
        } else if ( puntosMinmos > 21 ) {
            //alert('Computadora gana')
            resultadoPartida.innerText = 'Computadora Gana';
        } else if( puntosComputadora > 21 ) {
            //alert('Jugador Gana');
            resultadoPartida.innerText = 'Haz Ganado';
        } else {
            //alert('Computadora Gana')
            resultadoPartida.innerText = 'Computadora Gana';
        }    }, 100 );

  

}

//Eventos

btnPedir.addEventListener('click', () =>{

    const carta = pedirCarta();
     
    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHtml[0].innerText = puntosJugador;
    
    //  <img class="carta"  src="assets/cartas/2C.png" >
    
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/img/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);
    
    if (puntosJugador > 21) {
        console.warn('Lo siento mucho, a perdido');
        btnPedir.disabled = true ;
        btnDetener.disabled = true ;
        turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21, Genial!');
            btnPedir.disabled = true ;
            btnDetener.disabled = true ;
            turnoComputadora(puntosJugador);
    
        } 
    
        
    
    })
    
    
    btnDetener.addEventListener('click', () =>{
        btnPedir.disabled = true ;
        btnDetener.disabled = true ;
        turnoComputadora(puntosJugador);
    
    });
    
    
    btn1.addEventListener('click', () => {
    
        console.clear();
        deck = [];
        deck = crearDeck();
    
        puntosJugador     = 0;
        puntosComputadora = 0;
        
        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;
    
        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';
        resultadoPartida.innerText = '';
    
        btnPedir.disabled   = false;
        btnDetener.disabled = false;
    
    });


