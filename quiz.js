const PLAYER1 = 'black';
const PLAYER2 = 'red' ;


function  addEvent(id, val, cards,click ,websocket){
    
    $(id).on("click",function(e){

        click ++ ;
        changeUser()
        const sender ={
           type: "play",
           reponse: parseInt(this.id),
           points: 1,  
        }
        
        websocket.send(JSON.stringify(sender)) ;
        
        if(click%2 == 0){
           $( ".quiz" + val ).animate({ "left": "-=1000px" }, "slow", function(){
               document.getElementById('quiz').innerHTML = cards[val + 1] ;
               
               $(".quiz" + (val+1)).css('left', '500px') ;
               $(".quiz" + (val+1)).animate({"left": "-=500px"}, "slow") ;
               if ((val + 1) == cards.length -1){
                const sender = {
                    type: 'state',
                    value : 0
                }
                websocket.send(JSON.stringify(sender)) ;
                }

               SetEvent(".choice" + (val +1) + "0", val +1, cards , click, websocket) ;
               SetEvent(".choice" + (val +1) + "1", val +1, cards , click, websocket) ;
               SetEvent(".choice" + (val +1) + "2", val +1, cards , click, websocket) ;
               
               resetUser();


           });
        }
        
    });


}



function createElementCSV(websocket){

    Papa.parse('quiz.csv', {
       download: true,
       header: true,
       complete: function(result) {
         var donnees = [];
     
         result.data.forEach(function(row) {
           var data = {} ;
           data['question'] = row.question ;
           var res1 = [] ;
           var res2 = [] ;
           var res3 = [] ;
     
           
           console.log(result) ;
           
           
           
           try{
             var reponse1 = JSON.parse(JSON.stringify(row.reponse1))
             var reponse2 = JSON.parse(JSON.stringify(row.reponse2))
             var reponse3 = JSON.parse(JSON.stringify(row.reponse3))

             reponse1 = reponse1.replace(/'/g, '"');
             reponse2 = reponse2.replace(/'/g, '"');
             reponse3 = reponse3.replace(/'/g, '"');

             reponse1 = JSON.parse(reponse1) ;
             reponse2 = JSON.parse(reponse2) ;
             reponse3 = JSON.parse(reponse3) ;
           }catch(e){
               console.log(e) ;
           }
                     
           for (var key in reponse1){
             
             res1[0] = key ;
             res1[1] = parseInt(reponse1[key])
           }
           for (var key in reponse2){
            
             res2[0] = key ;
             res2[1] = parseInt(reponse2[key])
           }
           for (var key in reponse3){
             
             res3[0] = key ;
             res3[1] = parseInt(reponse3[key])
           }

           data['reponse1'] = res1 ;
           data['reponse2'] = res2 ;
           data['reponse3'] = res3 ;
           
           
           // console.log(reponses) ;
           
           donnees.push(data);
          
           
         });
         
         
         
         const cards = donnees.map(x => {
           const card = 
           `
           <div class="card text-center mx-auto w-50 d-flex quiz${donnees.indexOf(x)}" style="width: 18rem">
                 <img src="assets/images/cat.jpg" class="card-img-top" alt="cat" style="height: 100px;">
                 <div class="card-body">
                     <h5 class="card-title">${x.question}<span class="badge bg-primary rounded-pill">30:30</span></h5>
                     <ol class="list-group list-group-numbered">
                         <li class="list-group-item d-flex justify-content-between align-items-start">
                             <div class="ms-2 me-auto">
                             <div class="fw-bold">${x.reponse1[0]}</div>
                         
                             </div>
                             <button class="btn btn-primary choice${donnees.indexOf(x)}0" id="${x.reponse1[1]}">Choisir</button>
                         </li>
                         <li class="list-group-item d-flex justify-content-between align-items-start">
                             <div class="ms-2 me-auto">
                             <div class="fw-bold" >${x.reponse2[0]}</div>
                             
                             </div>
                             <button class="btn btn-primary choice${donnees.indexOf(x)}1" id="${x.reponse2[1]}">Choisir</button>
                         </li>
                         <li class="list-group-item d-flex justify-content-between align-items-start">
                             <div class="ms-2 me-auto">
                             <div class="fw-bold" >${x.reponse3[0]}</div>
                             
                             </div>
                             <button class="btn btn-primary choice${donnees.indexOf(x)}2" id="${x.reponse3[1]}">Choisir</button>
                         </li>
                     </ol>
                 </div>
             </div>
           `
     
           return card ;
           
         }) ;

         cards.push(`
         <div class="card text-center mx-auto w-50 d-flex mt-5 quiz${cards.length}" style="width: 18rem">
         <img src="assets/images/cat.jpg" class="card-img-top" alt="cat" style="height: 100px;">
         <div class="card-body text-center">
             <h2 class="card-title" style="font-style: italic; color: green;">&#9679; Fin de la partie &#9679;</h2>
         `) ;
          
   
         
       document.getElementById('quiz').innerHTML = cards[0] ;
       
       
         var click = 0 ;
         addEvent(".choice00",0, cards,click, websocket) ;
         addEvent(".choice01", 0,cards, click, websocket) ;
         addEvent(".choice02", 0, cards, click,  websocket);



        //  $( ".choice00" ).on("click",function(e){
        //      click ++ ;
        //      changeUser()
        //      const sender ={
        //         type: "play",
        //         reponse: parseInt(this.id),
        //         points: 1,  
        //      }
             
        //      websocket.send(JSON.stringify(sender)) ;
             
        //      if(click%2 == 0){
        //         $( ".quiz" + 0 ).animate({ "left": "-=1000px" }, "slow", function(){
        //             document.getElementById('quiz').innerHTML = cards[0 + 1] ;
                    
        //             SetEvent(".choice" + (0 +1) + "0", 0 +1, cards , click, websocket) ;
                    
        //             $(".quiz" + (0+1)).css('left', '500px') ;
        //             $(".quiz" + (0+1)).animate({"left": "-=500px"}, "slow") ;
        //             resetUser();

    
        //         });
        //      }
             
        //  });

    
       }
       
     }
     
     );
}

function changeUser(){

    $("#player1").removeClass('bg-dark') ;
    $("#player2").addClass('bg-danger') ;

}

function resetUser(){
    $("#player2").removeClass('bg-danger') ;
    $("#player1").addClass('bg-dark') ;
}


function SetEvent(key, val, cards, click, websocket){
    addEvent(key,val,cards,click,websocket) ;
//  $(key).on("click", function(e){
  
//   click++ ;
//   changeUser();
//   const sender = {
//     type: "play",
//     reponse: parseInt(this.id),
//     points: 1 ,
//   }
//   console.log(sender);
//   websocket.send(JSON.stringify(sender)) ;

//    if(click%2 == 0){

//     $( ".quiz" + val ).animate({ "left": "-=1000px" }, "slow", function(){
     
//         document.getElementById('quiz').innerHTML = cards[val+1] ;
        
   
//         SetEvent(".choice" + (val +1) + "0", val+1, cards, click, websocket) ;
        
   
//         $(".quiz" + (val + 1)).css('left', '500px') ;
//         $(".quiz" + (val+1)).animate({"left": "-=500px"}, "slow") ;

//         if ((val + 1) == cards.length -1){
//             const sender = {
//                 type: 'state',
//                 value : 0
//             }
//             websocket.send(JSON.stringify(sender)) ;
//         }
//         resetUser();

//     });

//    }
   
//  })
}


async function updatePoint(player, points){
    console.log(player)
    const PlayerPointID = player == 'black' ? 'player1Point' : 'player2Point' ;
    document.getElementById(PlayerPointID).innerHTML = points ;
}


export {createElementCSV, updatePoint, PLAYER1, PLAYER2} ;






