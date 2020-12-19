from textblob import TextBlob
from pandas import*
import os,json,time

def fun_translater(texto):
    pergunta_br = []
    for pergunta in texto:
        loop = True
        while(loop):
            try:
                blob = TextBlob(pergunta)
                pergunta_br.append(blob.translate(from_lang='en',to='pt').string)
                time.sleep(5)
                loop = False # Stop the loop

            except:
                time.sleep(10)
    return pergunta_br

if('__main__' == __name__):

    df = read_csv('./mqp.csv',names = ['dr_id', 'question_1', 'question_2', 'label'])

    path = './backup'
    if(not os.path.exists(path)):
        os.mkdir(path)


    pergunta_um = []
    pergunta_dois = []

    for i in range(463,df.shape[0]):
        texto = [df['question_1'].values[i],df['question_2'].values[i]]
        try:
            traduzido = fun_translater(texto)
            pergunta_um.append(traduzido[0])
            pergunta_dois.append(traduzido[1])

        except:
            f = open('output.txt','a')
            f.write("Traducao parada na posicao %d\n"%(i))
            f.close()

        finally:

            with open('./backup/pergunta_um.json','w') as outfile:
                json.dump(pergunta_um,outfile,ensure_ascii=False)
                outfile.close()

            with open('./backup/pergunta_dois.json','w') as outfile:
                json.dump(pergunta_dois,outfile,ensure_ascii=False)
                outfile.close()

            f = open('output.txt','a')
            f.write("%d de %d\n"%(i + 1,df.shape[0]))
            f.close()

            DataFrame({'pergunta_um' : pergunta_um, 'pergunta_dois' : pergunta_dois}).to_csv('./backup/backupMQP.csv',index=False)




    DataFrame({'pergunta_um' : pergunta_um, 'pergunta_dois' : pergunta_dois, 'label' : df['label']}).to_csv('./mqp.csv',index=False)
    f = open('output.txt','a')
    f.write("Traducao concluida\n")
    f.close()
