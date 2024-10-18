import os
import pandas as pd
import numpy as np
import json
import matplotlib.pyplot as plt
from xgboost import XGBRegressor
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import MinMaxScaler
from babel.dates import format_date

# Cargar los datos
file_path = r'C:\Users\Lenovo\Documents\FA_CAFAC.xlsx'
store_sales = pd.read_excel(file_path, engine='openpyxl')

# Seleccionar y renombrar columnas
columnas_a_mantener = ['FEC_TRAN', 'VAL_TOTA']
store_sales = store_sales[columnas_a_mantener]
store_sales.rename(columns={'FEC_TRAN': 'date', 'VAL_TOTA': 'sales'}, inplace=True)

# Verificar si hay valores nulos en la columna de ventas
print("Valores nulos en 'sales':", store_sales['sales'].isnull().sum())

# Eliminar filas con valores nulos
store_sales = store_sales.dropna(subset=['sales'])

# Convertir y agrupar datos
store_sales['sales'] = store_sales['sales'].astype('int64')  # Ahora debería funcionar
store_sales['date'] = pd.to_datetime(store_sales['date'])
store_sales['date'] = store_sales['date'].dt.to_period('M')
monthly_sales = store_sales.groupby('date').sum().reset_index()
monthly_sales['date'] = monthly_sales['date'].dt.to_timestamp()

# Preparar los datos para el modelo
X = monthly_sales['date'].dt.month.values.reshape(-1, 1)  # Meses como características
y = monthly_sales['sales'].values  # Ventas como objetivo

scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)

split = int(0.8 * len(X))
X_train, X_test = X_scaled[:split], X_scaled[split:]
y_train, y_test = y[:split], y[split:]

# Entrenar los modelos
models = {
    'Linear Regression': LinearRegression(),
}

for name, model in models.items():
    model.fit(X_train, y_train)

# Extender el rango de fechas hasta el año siguiente
last_date = monthly_sales['date'].max()
next_year_dates = pd.date_range(start=last_date + pd.DateOffset(months=1), periods=12, freq='M')

# Generar características para el año siguiente
X_next_year = pd.DataFrame({'date': next_year_dates})
X_next_year['month'] = X_next_year['date'].dt.month
X_next_year_scaled = scaler.transform(X_next_year[['month']])

# Realizar predicciones para el año siguiente
predictions_next_year = {}
for name, model in models.items():
    y_pred_next_year = model.predict(X_next_year_scaled)
    predictions_next_year[name] = y_pred_next_year

# Usar los números de los meses para el JSON
predicciones_2024 = {mes.month: int(pred) for mes, pred in
                     zip(X_next_year['date'], predictions_next_year['Linear Regression'])}

# Guardar los datos en un archivo JSON
with open('predicciones_2024.json', 'w') as json_file:
    json.dump(predicciones_2024, json_file)

# Modificar los meses de data_2023 para que coincidan con las predicciones
# Cambiar aquí para usar números en lugar de nombres
meses_numeros_2023 = monthly_sales['date'].dt.month.tolist()
precios_dict = dict(zip(meses_numeros_2023, monthly_sales['sales'].tolist()))

# Guardar datos de ventas del 2023 en un archivo JSON
with open('data_2023.json', 'w') as json_file:
    json.dump({'meses': meses_numeros_2023, 'precios': monthly_sales['sales'].tolist()}, json_file)

# Visualizar los resultados
plt.figure(figsize=(15, 5))

# Gráfico de predicciones de Linear Regression para el año siguiente
plt.plot(monthly_sales['date'], monthly_sales['sales'], color='blue', label='Datos reales', marker='o')
plt.plot(X_next_year['date'], predictions_next_year['Linear Regression'], label='Predicciones Regresión Lineal',
         color='green')
plt.xlabel('Fecha')
plt.ylabel('Ventas')
plt.title('Predicciones Regresión Lineal para el Año Siguiente')
plt.legend()
plt.grid(True)

plt.tight_layout()
plt.show()
