

class Player:
    color = None

    def __init__(self, color:str) -> None:
        self.color = color
        self.points = 0

    # @property
    def get_points(self):
        return self.points
    

    def set_points(self, point) -> None:
        self.points += point
    
    def __str__(self) -> str:
        return "Im player {}".format(self.color)
    


PLAYER1, PLAYER2 = Player('black') , Player('red')

class Quiz:
    """
    Quiz Game

    """

    def __init__(self) -> None:
        self.choice = []
        self.winner = Player
        self.total_quiz = None
        self.finished = False


    def update_points(self) -> None:
        *_, last_choice = self.choice
        player = last_choice[0]
        response = last_choice[1]
        if response.get('intitule') is True:
            print(response.get('intitule'))
            player.set_points(response.get('points'))
        
            
    

    
    def get_winner(self):
        return self.winner


    
    def last_player(self):
        return PLAYER1 if len(self.choice) % 2 else PLAYER2
    


    def play(self, player, response) -> None:
        print(player)
        print(self.last_player)
        if player == self.last_player():
            raise RuntimeError("it's not your turn")
        
        self.choice.append((player, response))
        
        self.update_points()

        if PLAYER1.get_points() >= PLAYER2.get_points():
            self.winner = PLAYER1
        else:
            self.winner = PLAYER2


        
        



    



