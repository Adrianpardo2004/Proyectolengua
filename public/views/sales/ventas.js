// Cargar datos desde el archivo JSON y generar la gráfica y tabla
fetch('\\Data\\ventas_por_pais.json') // Ruta corregida
    .then(response => response.json())
    .then(data => {
        const salesTableBody = document.getElementById('salesTable').getElementsByTagName('tbody')[0];
        const maxSales = {};
        const chartData = {}; // Para la gráfica

        // Procesar los datos para encontrar el máximo por mes
        for (const [countryCode, info] of Object.entries(data)) {
            for (let i = 0; i < info.meses.length; i++) {
                const month = info.meses[i];
                const total = info.totales[i];

                // Actualizar los datos para la tabla
                if (!maxSales[month] || total > maxSales[month].total) {
                    maxSales[month] = { countryCode, total };
                }

                // Actualizar los datos para la gráfica
                if (!chartData[month]) {
                    chartData[month] = 0;
                }
                chartData[month] += total; // Sumar las ventas totales por mes
            }
        }

        // Agregar los máximos a la tabla
        for (const [month, info] of Object.entries(maxSales)) {
            const row = salesTableBody.insertRow();
            row.insertCell(0).textContent = month;
            row.insertCell(1).textContent = info.countryCode;
            row.insertCell(2).textContent = info.total.toLocaleString(); // Formatear el total
        }

        // Crear la gráfica de barras
        const ctx = document.getElementById('salesChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(chartData), // Los meses
                datasets: [{
                    label: 'Ventas Totales',
                    data: Object.values(chartData), // Ventas totales por mes
                    backgroundColor: 'rgba(0, 123, 255, 0.5)', // Color de las barras
                    borderColor: 'rgba(0, 123, 255, 1)', // Borde de las barras
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true, // Asegura que la gráfica se ajuste a su contenedor
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
