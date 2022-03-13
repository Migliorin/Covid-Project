from config.options import Options
from database.database import DataBase
from src.tradutor import Traducao

class MainFacade():
    def __init__(self):
        self.options = Options()
        self.db = DataBase()
    
    def main_facade(self):

        self.options.collect_info()

        self.db.create_connection(self.options.database_name)

        leitor_df = Traducao(self.options,self.db)

        dataframe = leitor_df.read_dataframe()
        info = leitor_df.create_df_sqlite(dataframe)

        leitor_df.translate(info)

        self.db.close_connection()


main = MainFacade()

main.main_facade()

        




