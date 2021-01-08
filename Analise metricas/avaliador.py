import pandas as pd
import numpy as np
import json
import nltk
import string
from rank_bm25 import BM25Okapi
from unidecode import unidecode
import gensim
from os import listdir
from os.path import isfile, join
from gensim.summarization.bm25 import BM25

nltk.download('punkt')

result = pd.read_csv('./Datasets a serem usados/dataset_tratado.csv')

perguntas = result['perguntas']

document = []
for pergunta,i in zip(perguntas,range(perguntas.size)):
    try:
        tokens = nltk.word_tokenize(pergunta,language = 'portuguese')
        tokens = [w for w in tokens if not w in string.punctuation]
        document.append(tokens)
    except:
        print(pergunta, i)
document = np.array(document,dtype=object)

with open('./Amostra Analise Dataset/amostra.json','r') as f:
    sample = json.load(f)

bm25 = BM25(document)

aux = []
k = 356
while(k <= 499):

    posicao =  k
    try:
        print('Posicao atual: ',posicao)
        query = sample[posicao]
        if("?" not in query):
            print('Query:'," ".join(query) + '?','\n')
        else:
            print(" ".join(query),'\n')
        score = bm25.get_scores(query)
        top_n = np.argsort(score)[::-1][2:5] # Apresentar as 3 melhores assimilações

        aux_aux = []
        aux_aux.append(" ".join(query))
        for i in top_n:
            print("Pergunta: {}".format(perguntas[i])) # Print da pergunta similiar e o score do BM25
            ava = int(input("Avaliacao: "))
            aux_aux.append(perguntas[i])
            aux_aux.append(ava)

        aux.append(aux_aux)
        with open('./avaliador_backup.json','w') as outfile:
            json.dump(aux,outfile)
        print('Posicao atual avaliada: ',posicao)
        k += 1
    except Exception as x:
        print("Erro",str(x))
        with open('./avaliador_backup.json','w') as outfile:
            aux.append(['posicao parada, start da proxima',posicao])
            json.dump(aux,outfile)
        break
