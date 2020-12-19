import json, httpcore, time, os
from googletrans import Translator


f = open("train-v2.0.json","r")

data = json.load(f)


dicionario = data['data']

def fun_translater(pergunta): 
    if(type(pergunta) == list):
        pergunta = [i.replace("_"," ") for i in pergunta]
    elif(type(pergunta) == str):
        pergunta.replace('_'," ")
        
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
    

total = 0
for i in dicionario:
    total += 1
    for j in i['paragraphs']:
        for k in j['qas']:
            total += 1
        total += 1
        
 

path = './backup'
if(not os.path.exists(path)):
    os.mkdir(path)

progresso = 0
i = 7
    
try:    
    dici_list = []
    for i_dici in range(6,len(dicionario)): # DataSet
        f = open('./output.txt','a') # Documento de saída
        f.write('Lista dicionario: %d | Total: %d\n'%(i,len(dicionario))) # Contador da quantidade de dicionarios dentro do Dataset
        f.close()
        titulo = dicionario[i_dici]['title']
        titulo = fun_translater(titulo).text

        progresso += 1 # Quantidade já traduzida
        f = open('./output.txt','a') # Documento de saída
        f.write("Progresso: %d de %d\n"%(progresso,total)) # Print da quantidade faltante
        f.close()
        para_list = []
        j = 1
        for i_para in range(len(dicionario[i_dici]['paragraphs'])): # Lista de perguntas e repostas do titulo
            f = open('./output.txt','a') # Documento de saída
            f.write('Lista paragraphs: %d | Total: %d\n'%(j,len(dicionario[i_dici]['paragraphs']))) # Contador de paragraphs dentro de cada dicionario
            f.close()

            contexto = dicionario[i_dici]['paragraphs'][i_para]['context'] # Contexto das respostas (String)

            qas_list = []
            k = 1
            for i_qas in range(len(dicionario[i_dici]['paragraphs'][i_para]['qas'])): # Perguntas e Respostas
                f = open('./output.txt','a') # Documento de saída
                f.write('Lista PR: %d | Total: %d\n'%(k,len(dicionario[i_dici]['paragraphs'][i_para]['qas']))) # Contador de PR dentro de cada paragraphs
                f.close()
                pergunta = dicionario[i_dici]['paragraphs'][i_para]['qas'][i_qas]['question'] # String
                id_ = dicionario[i_dici]['paragraphs'][i_para]['qas'][i_qas]['id'] # id

                is_impossible = dicionario[i_dici]['paragraphs'][i_para]['qas'][i_qas]['is_impossible'] # boolean

                if(not is_impossible): # Verifica se há resposta
                    resposta_texto = dicionario[i_dici]['paragraphs'][i_para]['qas'][i_qas]['answers'][0]['text'] # String
                    resposta_start = dicionario[i_dici]['paragraphs'][i_para]['qas'][i_qas]['answers'][0]['answer_start'] # int
                    is_impossible = dicionario[i_dici]['paragraphs'][i_para]['qas'][i_qas]['is_impossible'] # boolean

                    texto = [pergunta,resposta_texto]
                    texto_traduzido = fun_translater(texto) # tradução das PR
                    pergunta = texto_traduzido[0].text
                    resposta_texto = texto_traduzido[1].text

                    qas_list.append({'question' : pergunta, 'id' : id_, 'answers' : [{'text' : resposta_texto, 'answer_start' : resposta_start}], 'is_impossible' : is_impossible})

                else:
                    texto = [pergunta]
                    texto_traduzido = fun_translater(texto) # tradução das PR
                    pergunta = texto_traduzido[0].text

                    qas_list.append({'question' : pergunta, 'id' : id_, 'answers' : [], 'is_impossible' : is_impossible})


                k += 1

                progresso += 1 # Quantidade já traduzida
                f = open('./output.txt','a') # Documento de saída
                f.write("Progresso: %d de %d\n"%(progresso,total)) # Print da quantidade faltante
                f.close()

                with open('./backup/qas_list.json','w') as outfile: # Salvando backup
                    json.dump(qas_list,outfile,ensure_ascii=False)
                    outfile.close()


            texto = contexto
            texto_traduzido = fun_translater(texto) # tradução do contexto
            contexto = texto_traduzido.text

            with open('./backup/contexto.json','w') as outfile: # Salvando backup
                json.dump(contexto,outfile,ensure_ascii=False)
                outfile.close()

            para_list.append({'qas' : qas_list, 'context' : contexto})
            j += 1

            progresso += 1 # Quantidade já traduzida
            f = open('./output.txt','a') # Documento de saída
            f.write("Progresso: %d de %d\n"%(progresso,total)) # Print da quantidade faltante
            f.close()

            with open('./backup/para_list.json','w') as outfile: # Salvando backup
                json.dump(para_list,outfile,ensure_ascii=False)
                outfile.close()

        dici_list.append({'title' : titulo, 'paragraphs' : para_list})
        i += 1

        with open('./backup/dici_list.json','w') as outfile: # Salvando backup
            json.dump(dici_list,outfile,ensure_ascii=False)
            outfile.close()

        #-------------------------------------------#
        qas_list.append({'question' : pergunta, 'id' : id_, 'answers' : [{'text' : resposta_texto, 'answer_start' : resposta_start}], 'is_impossible' : is_impossible})
        para_list.append({'qas' : qas_list, 'context' : contexto})
        dici_list.append({'title' : titulo, 'paragraphs' : para_list})
        dataset = {'version' : 1 , 'data' : dici_list}

        with open('./backup/dataset.json','w') as outfile:
            json.dump(dataset,outfile,ensure_ascii=False) # Backup do dataset
            outfile.close()

        with open('./backup/posi.json','w') as outfile:
            posi = [i_dici,i_para,i_qas,progresso]
            json.dump(posi,outfile,ensure_ascii=False) # Backup das posições
            outfile.close()
        #-------------------------------------------#

    dataset = {'version' : 1 , 'data' : dici_list}

    with open('./dataset.json','w') as outfile:
        json.dump(dataset,outfile,ensure_ascii=False)
        outfile.close()

except (KeyboardInterrupt or httpcore._exceptions.ConnectError) as x:
    qas_list.append({'question' : pergunta, 'id' : id_, 'answers' : [{'text' : resposta_texto, 'answer_start' : resposta_start}], 'is_impossible' : is_impossible})
    para_list.append({'qas' : qas_list, 'context' : contexto})
    dici_list.append({'title' : titulo, 'paragraphs' : para_list})
    dataset = {'version' : 1 , 'data' : dici_list}
    
    with open('./backup/dataset.json','w') as outfile:
        json.dump(dataset,outfile,ensure_ascii=False) # Backup do dataset
        outfile.close()
        
    with open('./backup/posi.json','w') as outfile:
        posi = [i_dici,i_para,i_qas,progresso]
        json.dump(posi,outfile,ensure_ascii=False) # Backup das posições
        outfile.close()
    f = open('./output.txt','a') # Documento de saída
    f.write('stop translation - %s\n'%(str(x)))
    f.close()

