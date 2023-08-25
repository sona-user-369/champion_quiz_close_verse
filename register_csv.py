import csv
from pathlib import Path

a = {
    'Question1': 
        {
            'reponse1' : ['intitule', True],
            'reponse2': ['intitule', True],
            'reponse3': ['intitule', True],
        },

    'Question 2':
        {
            
            'reponse1' : ['intitule', True],
            'reponse2': ['intitule', True],
            'reponse3': ['intitule', True],
        }
    
    }

def register_data(data):
    data_response = dict()
    question = input('Entrer votre question\n')
    data.update({question : dict()}) 
    # number_question = input('Entrer le nombre de reponse\n')
    for i in range(3):
        response = input('Entrer la reponse {}\n'.format(i))
        truth = input('Tapez 1 si elle est vrai et 0 sinon\n')
        data_response.update({'reponse{}'.format(i+1): {response : '1' if truth=='1' else '0'}})
        data.update({question: data_response})
    return data
    

def main():
    data = dict()
    while True:
        data = register_data(data)
        go_on = input('Voulez vous continuer ? Y or N\n')
        if go_on == 'N':
            fileName = "quiz.csv"
            fileObj = Path(fileName)
            file = fileObj.is_file()
            header_done = False
            rows = []

            try:
                with open('quiz.csv', 'r', newline='') as fichier:
                    reader = csv.reader(fichier)
                    
                    for row in reader :
                        if row == ['question', 'reponse1', 'reponse2', 'reponse3']:
                            header_done = True
                        rows.append(row)
            except FileNotFoundError :
                pass
            with open('quiz.csv', 'w', newline='') as fichier :
                writer = csv.writer(fichier)
                if not header_done : writer.writerow(['question', 'reponse1', 'reponse2', 'reponse3'])
                for row in rows :
                    writer.writerow(row)
                for question, reponse in data.items():
                    writer.writerow([question, reponse['reponse1'], reponse['reponse2'], reponse['reponse3']])
            break
        else:
            continue

if __name__=='__main__':
    main()
        
    
