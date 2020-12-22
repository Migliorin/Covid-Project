from textblob import TextBlob
from textblob.exceptions import NotTranslated
from textblob.exceptions import TranslatorError
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

            except NotTranslated:
                pergunta_br.append(pergunta)
                loop = False

            except TranslatorError:
                pergunta_br.append(None)
                loop = False
    return pergunta_br

if('__main__' == __name__):

    
    queries = []
    for i in open('./queries.txt').readlines():
        queries.append(i.replace('\n',''))

    df = DataFrame({'queries' : queries})

    path = './backup'
    if(not os.path.exists(path)):
        os.mkdir(path)


    pergunta = []
    finalizado = True

    for i in range(0,df.shape[0]):
        texto = [str(df['queries'].values[i])]
        try:
            traduzido = fun_translater(texto)
            if(None not in traduzido):
                pergunta.append(traduzido[0])
            else:
                finalizado = False
                
                f = open('output.txt','a')
                f.write("Traducao parada\n")
                f.close()

                break
            
        except:
            f = open('output.txt','a')
            f.write("Traducao parada na posicao %d\n"%(i))
            f.close()   
        
        finally:
            
            with open('./backup/pergunta.json','w') as outfile:
                json.dump(pergunta,outfile,ensure_ascii=False)
                outfile.close()

            f = open('output.txt','a')
            f.write("%d de %d\n"%(i + 1,df.shape[0]))
            f.close()

            DataFrame({'queries' : pergunta}).to_csv('./backup/backup_queries.csv',index=False)
    
