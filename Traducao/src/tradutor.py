from textblob import TextBlob
import pandas as pd
import re
from database.database import DataBase
from config.options import Options
from unidecode import unidecode
import time
from tqdm import tqdm

class Traducao():
    def __init__(self,options:Options,database:DataBase):
        self.options = options
        self.database = database
    
    def translator(self,text):
        loop = True
        while(loop):
            try:
                blob = TextBlob(text)
                res = blob.translate(from_lang='en',to='pt').string
                time.sleep(5)
                loop = False # Stop the loop
                return res
            except:
                time.sleep(10)

    def read_dataframe(self):
        """
            Leitura do dataframe e retorno dele
        """
        columns_names = self.options.header
        df = pd.read_csv(self.options.input_dir,names=columns_names)
        return df

    def create_df_sqlite(self,df:pd.DataFrame):
        """
            Criando uma tabela no banco de dado usando o dataframe retornando um dicionario
            com informacoes
        """
        df.columns = ["_".join(re.findall(r'\w+',unidecode(i.lower()))) for i in df.columns]

        name_table = self.options.input_dir
        name_table = name_table.split('/')[-1] if '/' in name_table else name_table
        name_table = name_table.split('.')[0]

        atributos = {'id':'integer PRIMARY KEY'}

        for col in df.columns:
            if(('float' in str(df[col].dtype))):
                atributos[col] = 'decimal'
            elif(('int' in str(df[col].dtype))):
                atributos[col] = 'integer'
            elif(('object' in str(df[col].dtype))):
                atributos[col] = 'text'


        self.database.create_table(name_table,atributos)

        return {
            'name_table':name_table,
            'dataframe':df
        }

    def translate(self,info:dict):
        """
            Traduzindo dataset
        """
        last_id = self.database.get_last_id(info['name_table'])
        if(last_id != 0):
            last_id += 1
        col_trad = ["_".join(re.findall(r'\w+',unidecode(i.lower()))) for i in self.options.trad_columns]
        dataframe = info['dataframe'].iloc[last_id:,:]
        for row_ in tqdm(dataframe.iloc,total=dataframe.shape[0]):
            #print(row_)
            
            aux = dict(row_)

            for col in col_trad:
                aux[col] = self.translator(aux[col])

            columns = []
            values = []

            for item in aux.items():
                columns.append(item[0])
                values.append(item[1])

            self.database.insert_values_table(info['name_table'],columns,values)
            
        self.database.select_search_table
        

