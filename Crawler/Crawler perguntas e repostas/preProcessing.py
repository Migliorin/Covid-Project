import PyPDF2
import os

def extract_per_pdf(pdf_path):
    create_dir('img')
    with open(pdf_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfFileReader(pdf_file)
        for i in range(pdf_reader.numPages):
            pdf_writer = PyPDF2.PdfFileWriter()
            pdf_writer.addPage(pdf_reader.getPage(i))
            output_file_name = f'./img/{i}.pdf'
            with open(output_file_name, 'wb') as output_file:
                pdf_writer.write(output_file)

def create_dir(name):
    if not os.path.exists(name):
        os.makedirs(name)

if __name__ == '__main__':
    path = './convid19_doencachagas.pdf'
    extract_per_pdf(path)
