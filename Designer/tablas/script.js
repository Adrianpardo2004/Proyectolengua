// Agregar los máximos a la tabla
for (const [month, info] of Object.entries(maxSales)) {
    const row = salesTableBody.insertRow();
    row.insertCell(0).textContent = month;
    row.insertCell(1).textContent = info.countryCode;
    row.insertCell(2).textContent = info.total.toLocaleString(); // Formatear el total
}
