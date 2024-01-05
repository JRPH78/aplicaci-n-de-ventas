async function getClientes() {
  // Realiza una consulta a la base de datos para obtener todos los clientes
  // Devuelve un array de objetos JSON con los datos de clientes

  const url = "https://aplicacionesmoviles2022.000webhostapp.com/apis.php?comando=clientes";
  const response = await fetch(url);
  const datos = await response.json();

  return datos;
}