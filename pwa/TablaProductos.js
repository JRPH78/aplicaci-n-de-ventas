import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TablaProductos = ({ productos }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Productos</Text>
      <Text >Producto {"     "}cantidad{"      "} precio {"          "}subtotal</Text>

      {productos &&
        JSON.parse(productos).map((producto, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.producto}>{producto.producto}</Text>
            <Text style={styles.detalle}>{producto.cantidad} unidades</Text>
            <Text style={styles.detalle}>${producto.precio}</Text>
            <Text style={styles.subtota}>
              ${producto.precio * producto.cantidad}
            </Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  producto: {
    flex: 1,
    marginRight: 1,
  },
  detalle: {
    flex: 1,
    marginRight: 1,

    color: 'gray',
  },

  subtota: {
    flex: 1,
    marginRight: 1,

    color: 'gray',
  },
  
  
});

export default TablaProductos;
