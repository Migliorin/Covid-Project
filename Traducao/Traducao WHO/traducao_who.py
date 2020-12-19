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

    df = read_csv('./who.csv')

    path = './backup'
    if(not os.path.exists(path)):
        os.mkdir(path)


    perguntas_trad = []
    respostas_trad = []

    for pergunta,resposta,i in zip(df['questions'].values,df['answers'].values,range(1,df.shape[0] + 1)):
        try:
            texto = [pergunta,resposta]
            texto_traduzido = fun_translater(texto) 
            perguntas_trad.append(texto_traduzido[0].text)
            respostas_trad.append(texto_traduzido[1].text)

            with open('./backup/perguntas.json','w+') as outfile:
                json.dump(perguntas_trad,outfile,ensure_ascii=False)
                outfile.close()

            with open('./backup/respostas.json','w+') as outfile:
                json.dump(respostas_trad,outfile,ensure_ascii=False)
                outfile.close()

            f = open('output.txt','a')
            f.write("%d de %d\n"%(i,df.shape[0]))
            f.close()

        except (KeyboardInterrupt or httpcore._exceptions.ConnectError) as x:

            with open('./backup/perguntas.json','w+') as outfile:
                json.dump(perguntas_trad,outfile,ensure_ascii=False)
                outfile.close()

            with open('./backup/respostas.json','w+') as outfile:
                json.dump(respostas_trad,outfile,ensure_ascii=False)
                outfile.close()

            f = open('output.txt','a')
            f.write("Traducao parada na posicao %d\n"%(i))
            f.close()

            DataFrame({'perguntas' : perguntas_trad, 'respostas' : respostas_trad}).to_csv('./backup/backupWHO.csv',index=False)

    DataFrame({'perguntas' : perguntas_trad, 'respostas' : respostas_trad}).to_csv('./who.csv',index=False)
    f = open('output.txt','a')
    f.write("Traducao concluida\n")
    f.close()




