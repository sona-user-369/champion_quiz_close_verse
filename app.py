import asyncio
import websockets
import itertools
import json

from quiz import Quiz , PLAYER1 , PLAYER2 , Player

message_receive = {
    'type': 'play',
    'response' : 'True',
    'points': 1 ,
}

message_send ={
    'type': 'play',
    'player': '',
    'points': 1,
}

msgerror = {
    'type': 'error',
    'message': 'exc',
}



async def handler(websocket):
    game = Quiz()

    turns = itertools.cycle([PLAYER1, PLAYER2])

    player = next(turns)

    state_game = None

    async for message in websocket :
        event = json.loads(message)
        print(event)
        if event['type'] == 'state':
            state_game = event['value']
            game.finished = True if event['value'] == 0 else False
            winner  = game.get_winner()
            event = {
                'type': 'state',
                'winner' : winner.color,
            }

            await websocket.send(json.dumps(event))
            
        if state_game is None:assert event['type'] == 'play'
        reponse = True if event['reponse'] == 1 else False
        points = event['points'] 

        sender = {'intitule': reponse, 'points': points}

        try:
            game.play(player, sender)
        except RuntimeError as exc :
            error = {
                'type': 'error',
                'message': exc
                }
            
            await websocket.send(json.dumps(error))

            continue

        event = {
            'type': 'play',
            'player': player.color,
            'points': player.get_points(),
        }

        await websocket.send(json.dumps(event))

        player = next(turns)

async def main():
    async with websockets.serve(handler,"127.0.0.1", 8001):
        await asyncio.Future()

if __name__=='__main__':
    asyncio.run(main()) 