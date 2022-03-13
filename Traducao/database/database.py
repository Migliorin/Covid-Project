import sqlite3, os
from sqlite3 import Error

class DataBase:
    def __init__(self):
        self.conn = None

    def create_connection(self,db_file):
        """ create a database connection to a SQLite database """
        print(f'Iniciando conexao com o banco: {db_file}')
        print(f'Diretorio atual de inicializacao: {os.getcwd()}')
        try:
            self.conn = sqlite3.connect(db_file)
            print('Conexao concluida.....')
            
        except Error as e:
            print('Erro de conexao.......')
            print(e)

    def create_table(self,table_name:str,atributos:dict):
        """
            Criacao de tabela passando os atributos e o nome
            Ex.:
            create_table('funcionario',{
                'name':'text',
                'begin_date':'date',
                'end_date':'date'
            })
        """
        
        # Tabela existente retorna tentando criar
        if(self.verify_table(table_name)):
            print(f'Tabela ja existente: {table_name}')
            return
        # Criando a tabela nao existente
        else:
            print(f'Criando tabela: {table_name}')
            sql_create = f"CREATE TABLE IF NOT EXISTS {table_name} ( "
            tam = len(atributos)
            for i,key in enumerate(atributos.keys()):
                if(i != tam -1):
                    sql_create += f'{key} {atributos[key]},'
                else:
                    sql_create += f'{key} {atributos[key]} );'
            try:
                c = self.conn.cursor()
                c.execute(sql_create)
                print(f'Tabela criada com sucesso.....')
            except Error as e:
                print(f'Erro ao criar tabela {table_name}')
                print(e)

    def verify_table(self,table_name:str)->bool:
        """
            Verifica a existencia da tabela no banco
        """
        sql_schema = f'SELECT * FROM sqlite_master WHERE name ="{table_name}" and type ="table";'
        c = self.conn.cursor()
        try:
            c.execute(sql_schema)
            res = c.fetchall()
            return True if len(res) > 0 else False
        except Error as e:
            print(f'Error: {e}')
            return False

    def select_table(self,table_name:str,columns)->list:
        """
            Select de colunas ou completo
        """
        sql_query = 'SELECT '
        if(isinstance(columns,str)):
            if(columns == '*'):
                sql_query += f'* FROM {table_name};'
            else:
                raise Exception(f'columns nao aceita: {columns}')
        elif(isinstance(columns,list)):
            sql_query += (','.join(columns) + f' FROM {table_name};')
        else:
            raise Exception(f'columns deve ser do tipo list ou string, em vez de {type(columns)}')

        if(self.verify_table(table_name)):
            print(f'Selecionando colunas da tabela {table_name}')
            cur = self.conn.cursor()
            cur.execute(sql_query)
            resu = cur.fetchall()
            print(f'Selecao finalizada......')
            return resu
        else:
            raise Exception(f'Tabela nao existente: {table_name}')
    
    def insert_values_table(self,table_name:str,columns:list,values:list)->int:
        """
            Insercao valores na tabela
        """
        if(len(columns) != len(values)):
            raise Exception(f'columns e values devem ter o mesmo tamanho')
        else:
            sql_query = f'INSERT INTO {table_name}({",".join(columns)}) VALUES({",".join(["?"]*len(values))})'
            if(self.verify_table(table_name)):
                try:
                    print(f'Inserindo valores na tabela {table_name}')
                    cur = self.conn.cursor()
                    cur.execute(sql_query,values)
                    self.conn.commit()
                    resu = cur.lastrowid
                    print('Insercao finalizada')
                    return resu
                except Error as e:
                    raise Exception(e)
            else:
                raise Exception(f'Tabela nao existente: {table_name}')
    
    def select_search_table(self,table_name:str,columns:list)->list:
        """
            Busca com where
            Ex.:
            db.select_search_table('funcionario',['name="Robertoo"'])
        """
        sql_query = 'SELECT * FROM'
        sql_query += f' {table_name} WHERE {",".join(columns)};'
        if(self.verify_table(table_name)):
            try:
                print(f'Iniciando busca na tabela {table_name}')
                cur = self.conn.cursor()
                cur.execute(sql_query)
                resu = cur.fetchall()
                print(f'Selecao finalizada......')
                return resu
            except Error as e:
                raise Exception(e)
        else:
            raise Exception(f'Tabela nao existente: {table_name}')

    def get_last_id(self,table_name) -> int:
        """
            Busca o ultimo id do dataset
        """
        sql_query = f'SELECT id FROM {table_name} WHERE id = (SELECT MAX(id) FROM {table_name});'
        if(self.verify_table(table_name)):
            try:
                print(f'Iniciando busca na tabela {table_name}')
                cur = self.conn.cursor()
                cur.execute(sql_query)
                resu = cur.fetchall()
                if(len(resu) == 0):
                    return 0
                else:
                    return int(resu[0][0])
            except Error as e:
                raise Exception(e)

        else:
            raise Exception(f'Tabela nao existente: {table_name}')

    def close_connection(self):
        self.conn.close()

        
# db = DataBase()
# db.create_connection('teste.sqlite')

# print(db.get_last_id('final_master_dataset'))