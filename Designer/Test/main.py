import os

file_path = r'C:\Users\Lenovo\Documents\FA_CAFAC_cod_pais_modificado.xlsx'

# Verifica si el archivo existe
if os.path.exists(file_path):
    print("El archivo se encontró.")
else:
    print("El archivo no se encontró.")
