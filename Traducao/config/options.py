import os,sys,getopt
from datetime import datetime

       
class Options():
    def __init__(self):
        self.input_dir = None
        self.header = None
        self.database_name = None
        self.trad_columns = None

    def collect_info(self):
        argv = sys.argv[1:]

        if(len(argv) == 0):
            print('Missing flags')
        else:
            try:
                opts, args = getopt.getopt(argv,"hi:",["header=","db-name=","trad-col="])
            except getopt.GetoptError:
                print('Invalid flags')
                sys.exit(2)
            for opt, arg in opts:
                if(opt == '-h'):
                    print('main.py -i <inputfile> --header= <headers> --db-name= <databse_name> --trad-col= <columns_trans>')
                    sys.exit()
                elif(opt == '-i'):
                    self.set_input_dir(arg)
                elif(opt == '--header'):
                    self.set_header(arg)
                elif(opt == '--db-name'):
                    self.set_database_name(arg)
                elif(opt == '--trad-col'):
                    self.set_trad_columns(arg)

    def set_input_dir(self,input_dir):
        if(os.path.exists(input_dir)):
            self.input_dir = input_dir
        else:
            raise Exception(f'Diretorio ou caminho inexistente: {input_dir}\nCaminho relativo atual: {os.getcwd()}')

    def set_header(self,header):
        self.header = header.split(",") if ',' in header else [header]

    def set_database_name(self,database_name):
        self.database_name = database_name
    
    def set_trad_columns(self,columns):
        columns = columns.split(",") if ',' in columns else [columns]
        print('Options ',columns)
        self.trad_columns = columns




