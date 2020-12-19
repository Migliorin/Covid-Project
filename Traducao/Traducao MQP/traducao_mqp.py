from googletrans import Translator
from pandas import*
import httpcore,os,json,time


def fun_translater(pergunta):         
    loop = True
    while(loop):
        try:
            translator = Translator()
            pergunta_br = translator.translate(pergunta, dest='pt',src='en')
            time.sleep(5)
            loop = False # Stop the loop
            return pergunta_br

        except AttributeError:
            time.sleep(10)

if('__main__' == __name__):

    df = read_csv('./mqp.csv',names = ['dr_id', 'question_1', 'question_2', 'label'])

    path = './backup'
    if(not os.path.exists(path)):
        os.mkdir(path)


    pergunta_um = []
    pergunta_dois = []

    for pergunta_1,pergunta_2,i in zip(df['question_1'].values[463:],df['question_2'].values[463:],range(464,df.shape[0] + 1)):
        try:
            texto = [pergunta_1,pergunta_2]
            texto_traduzido = fun_translater(texto) 
            pergunta_um.append(texto_traduzido[0].text)
            pergunta_dois.append(texto_traduzido[1].text)

            with open('./backup/pergunta_um.json','w+') as outfile:
                json.dump(pergunta_um,outfile,ensure_ascii=False)
                outfile.close()

            with open('./backup/pergunta_dois.json','w+') as outfile:
                json.dump(pergunta_dois,outfile,ensure_ascii=False)
                outfile.close()

            f = open('output.txt','a')
            f.write("%d de %d\n"%(i,df.shape[0]))
            f.close()

            DataFrame({'pergunta_um' : pergunta_um, 'pergunta_dois' : pergunta_dois}).to_csv('./backup/backupMQP.csv',index=False)

        except (KeyboardInterrupt or httpcore._exceptions.ConnectError) as x:

            with open('./backup/pergunta_um.json','w+') as outfile:
                json.dump(pergunta_um,outfile,ensure_ascii=False)
                outfile.close()

            with open('./backup/pergunta_dois.json','w+') as outfile:
                json.dump(pergunta_dois,outfile,ensure_ascii=False)
                outfile.close()

            f = open('output.txt','a')
            f.write("Traducao parada na posicao %d\n"%(i))
            f.write(x)
            f.close()

            DataFrame({'pergunta_um' : pergunta_um, 'pergunta_dois' : pergunta_dois}).to_csv('./backup/backupMQP.csv',index=False)

    DataFrame({'pergunta_um' : pergunta_um, 'pergunta_dois' : pergunta_dois, 'label' : df['label']}).to_csv('./mqp.csv',index=False)
    f = open('output.txt','a')
    f.write("Traducao concluida\n")
    f.close()


