import { PLAYER1, PLAYER2, createElementCSV, updatePoint } from "./quiz.js";


function sendReponse(websocket){



}

function receiveReponse(websocket){

  websocket.addEventListener('message', async ({data} )=>{
      const event = JSON.parse(data) ;
      switch(event.type){
        case 'play':
          await updatePoint(event.player, event.points) ;
          break;
        case 'error':
          alert(event.message);
          break ;
        case 'state':
          const player = event.winner == PLAYER1 ? 'PLAYER1' : 'PLAYER2' ;
          alert(`${player} wins`) ;
          websocket.close(1000) ;
          break ;
        default:
          throw new Error(`Event type ${event.type} not recognized`) ;
      }


  });


}


window.addEventListener("DOMContentLoaded", () => {

  const websocket = new WebSocket("ws://127.0.0.1:8001/");
  createElementCSV(websocket);
  receiveReponse(websocket)
  
  
});