import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Button,
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
  FlatList,
  StyleSheet,
  ScrollView,
  Picker,
} from 'react-native';
import TablaProductos from './TablaProductos'; // Importa el nuevo componente
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

//inicio sesionn
PantallaInicio = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  navigationOptions = {
    header: null,
  };

  Entrar = () => {
    if (!!usuario && !!contrasena) {
      fetch(
        'https://aplicacionesmoviles2022.000webhostapp.com/apis.php?comando=login&nombre=' +
          usuario +
          '&contrasena=' +
          contrasena,
        {
          method: 'GET',
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          const encontrado = responseJson.records;

          if (encontrado.length > 0) {
            navigation.navigate('Menu', { idUsuario: encontrado[0].id });
            //alert("Valio!!")
          } else {
            Alert.alert(
              'Usuario',
              'No encontrado!!',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
              { cancelable: false }
            );
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert(
            'Aviso',
            'Error de Internet!!',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        });
    } else {
      Alert.alert(
        'Aviso',
        'No introdujo datos',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
      <Text
        style={{
          fontSize: 40,
          marginTop: 80,
          marginBottom: 100,
          alignSelf: 'center',
        }}>
        Ventas
      </Text>

      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Input
          placeholder="USUARIO"
          onChangeText={(text) => setUsuario(text)}
          rightIcon={<Icon name="user" size={24} color="black" />}
        />
        <Input
          placeholder="CONTRASEÑA"
          onChangeText={(contrasena) => setContrasena(contrasena)}
          secureTextEntry={true}
          rightIcon={<Icon name="lock" size={24} color="black" />}
        />
      </View>

      <TouchableOpacity
        style={{
          height: 50,
          backgroundColor: 'red',
          marginTop: 15,
          borderRadius: 5,
          justifyContent: 'center',
          marginLeft: 20,
          marginRight: 20,
        }}
        onPress={() => Entrar()}>
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

//menu principal
MenuP = ({ navigation, route }) => {
  const [elementos, setElementos] = useState([]);
  const [total, setTotal] = useState(0);
  const { idUsuario } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
      <TouchableOpacity
        style={{
          marginTop: 10,
          marginLeft: 2,
          borderColor: 'black',
          borderRadius: 5,
          borderWidth: 2,
        }}
        onPress={() => navigation.navigate('Vender', { idUsuario: idUsuario })}>
        <View
          style={{
            flexGrow: 1,
            flexDirection: 'row',
            marginTop: 10,
            marginLeft: 2,
            marginEnd: 20,
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
              marginTop: 5,
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 10,
              alignSelf: 'center',
              padding: 80,
            }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1992/1992622.png',
            }}
          />
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text
              style={{
                flex: 1,
                fontSize: 30,
                flexWrap: 'wrap',
                flexShrink: 1,
              }}>
              Vender
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginTop: 10,
          marginLeft: 2,
          borderColor: 'black',
          borderRadius: 5,
          borderWidth: 2,
        }}
        onPress={() => navigation.navigate('Ticket', { idUsuario: idUsuario })}>
        <View
          style={{
            flexGrow: 1,
            flexDirection: 'row',
            marginTop: 10,
            marginLeft: 2,
            marginEnd: 20,
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
              marginTop: 5,
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 10,
              alignSelf: 'center',
              padding: 80,
            }}
            source={{
              uri: 'https://www.pngall.com/wp-content/uploads/12/Ticket-PNG-Cutout.png',
            }}
          />
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text
              style={{
                flex: 1,
                fontSize: 30,
                flexWrap: 'wrap',
                flexShrink: 1,
              }}>
              Tickets
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginTop: 10,
          marginLeft: 2,
          borderColor: 'black',
          borderRadius: 5,
          borderWidth: 2,
        }}
        onPress={() =>
          navigation.navigate('Productos', { idUsuario: idUsuario })
        }>
        <View
          style={{
            flexGrow: 1,
            flexDirection: 'row',
            marginTop: 10,
            marginLeft: 2,
            marginEnd: 20,
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
              marginTop: 5,
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 10,
              alignSelf: 'center',
              padding: 80,
            }}
            source={{
              uri: 'https://png.pngtree.com/png-vector/20190809/ourlarge/pngtree-packaging-branding-marketing-product-bottle-flat-color-icon-png-image_1652448.jpg',
            }}
          />
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text
              style={{
                flex: 1,
                fontSize: 30,
                flexWrap: 'wrap',
                flexShrink: 1,
              }}>
              Productos
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginTop: 10,
          marginLeft: 2,
          borderColor: 'black',
          borderRadius: 5,
          borderWidth: 2,
        }}
        onPress={() =>
          navigation.navigate('Clientes', { idUsuario: idUsuario })
        }>
        <View
          style={{
            flexGrow: 1,
            flexDirection: 'row',
            marginTop: 10,
            marginLeft: 2,
            marginEnd: 20,
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
              marginTop: 5,
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 10,
              alignSelf: 'center',
              padding: 80,
            }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/17/17115.png',
            }}
          />
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text
              style={{
                flex: 1,
                fontSize: 30,
                flexWrap: 'wrap',
                flexShrink: 1,
              }}>
              Clientes
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

//Listar productos
ListarProductos = ({ navigation, route }) => {
  const [elementos, setElementos] = useState([]);
  const [total, setTotal] = useState(0);
  const { idUsuario } = route.params;

  cargarRegistros = () => {
    fetch(
      'https://aplicacionesmoviles2022.000webhostapp.com/apis.php?comando=productos&id=' +
        idUsuario,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const listado = responseJson;
        setElementos(listado);
        setTotal(listado.length);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarRegistros();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          height: 40,
          marginTop: 10,
          backgroundColor: 'lightgray',
          textAlignVertical: 'center',
          borderRadius: 10,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
        }}>
        Hay {total} productos
      </Text>

      <FlatList
        data={elementos}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            //onPress = {() => this.alertItemName(item)}
            onPress={() =>
              navigation.navigate('Detalleproduco', { producto: item })
            }
            style={{
              marginTop: 10,
              marginLeft: 2,
              borderColor: 'gray',
              borderRadius: 5,
              borderWidth: 2,
            }}>
            <View
              style={{
                flexGrow: 1,
                flexDirection: 'row',
                marginTop: 15,
                marginLeft: 2,
              }}>
              <Image
                style={{ width: 90, height: 90 }}
                source={{ uri: item.urldeproducto }}
              />
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    flexWrap: 'wrap',
                    flexShrink: 1,
                  }}>
                  {item.nombre}
                </Text>
                <Text style={{ flex: 1, fontSize: 12, fontWeight: 'bold' }}>
                  ${item.preciodeventa}
                </Text>
                <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold' }}>
                  quedan {item.cantidad} unidades
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 70,
          backgroundColor: 'red',
          borderRadius: 100,
        }}
        onPress={() =>
          navigation.navigate('Agregarproducto', { idUsuario: idUsuario })
        }>
        <Icon name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

//const AppContainer = createAppContainer(RootStack);
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

//Agregar
PaginaAgregar = ({ navigation, route }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [preciodeventa, setPreciodeventa] = useState('');
  const [preciodecosto, setPreciodecosto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fotografia, setFotografia] = useState('');

  const { idUsuario } = route.params;

  navigationOptions = {
    title: 'Agregar producto',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  Guardar = () => {
    const urlapi =
      'https://aplicacionesmoviles2022.000webhostapp.com/apis.php?comando=agregarProducto&nombre=' +
      nombre +
      '&descripcion=' +
      descripcion +
      '&cantidad=' +
      cantidad +
      '&preciodecosto=' +
      preciodecosto +
      '&preciodeventa=' +
      preciodeventa +
      '&urldeproducto=' +
      fotografia +
      '&idusuario=' +
      idUsuario;

    fetch(urlapi, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const mensaje = responseJson.estatus;
        console.log(mensaje);
        if (mensaje == 'error') alert('Error al agregar!');
        else {
          alert(mensaje);
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error de Internet!!');
      });
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
      <Input placeholder="Nombre" onChangeText={(text) => setNombre(text)} />
      <Input
        inputStyle={{ marginTop: 10 }}
        placeholder="Descripción"
        onChangeText={(text) => setDescripcion(text)}
      />
      <Input
        inputStyle={{ marginTop: 10 }}
        placeholder="Precio de costo"
        onChangeText={(text) => setPreciodecosto(text)}
      />
      <Input
        inputStyle={{ marginTop: 10 }}
        placeholder="Precio de venta"
        onChangeText={(text) => setPreciodeventa(text)}
      />
      <Input
        inputStyle={{ marginTop: 10 }}
        placeholder="Cantidad"
        onChangeText={(text) => setCantidad(text)}
      />
      <Input
        inputStyle={{ marginTop: 10 }}
        placeholder="URL de fotografía"
        onChangeText={(text) => setFotografia(text)}
      />
      <TouchableOpacity
        style={{
          height: 50,
          backgroundColor: 'red',
          marginTop: 15,
          borderRadius: 5,
          justifyContent: 'center',
          marginLeft: 20,
          marginRight: 20,
        }}
        onPress={() => Guardar()}>
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Guardar
        </Text>
      </TouchableOpacity>
    </View>
  );
};
//Fin de agregar

//Detalles
PaginaDetalle = ({ navigation, route }) => {
  const { producto } = route.params;

  const [nombre, setNombre] = useState(producto.nombre);
  const [descripcion, setDescripcion] = useState(producto.descripcion);
  const [preciodeventa, setPreciodeventa] = useState(producto.preciodeventa);
  const [preciodecosto, setPreciodecosto] = useState(producto.preciodecosto);
  const [cantidad, setCantidad] = useState(producto.cantidad);
  const [fotografia, setFotografia] = useState(producto.urldeproducto);
  const [id, setId] = useState(producto.id);
  const [idusuario, setIdusuario] = useState(producto.idusuario);

  Actualizar = () => {
    const urlapi =
      'https://aplicacionesmoviles2022.000webhostapp.com/apis.php?comando=editarProducto&nombre=' +
      nombre +
      '&descripcion=' +
      descripcion +
      '&cantidad=' +
      cantidad +
      '&preciodecosto=' +
      preciodecosto +
      '&preciodeventa=' +
      preciodeventa +
      '&urldeproducto=' +
      fotografia +
      '&id=' +
      id +
      '&idusuario=' +
      idusuario;

    fetch(urlapi, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const mensaje = responseJson.estatus;
        console.log(mensaje);
        if (mensaje === 'error') alert('Error al actualizar!');
        else {
          alert(mensaje);
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error de Internet!!');
      });
  };

  Eliminar = () => {
    fetch(
      'https://aplicacionesmoviles2022.000webhostapp.com/apis.php?comando=eliminarProducto&id=' +
        id,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const mensaje = responseJson.estatus;
        console.log(mensaje);
        if (mensaje === 'error') alert('Error al eliminar!');
        else {
          alert(mensaje);
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error de Internet!!');
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          height: 40,
          borderRadius: 5,
          alignItems: 'center',
          marginLeft: 5,
          marginRight: 5,
          marginTop: 5,
        }}
        onPress={() => {
          Actualizar();
        }}>
        <Text style={{ color: 'white', fontSize: 22 }}>Actualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          height: 40,
          borderRadius: 5,
          alignItems: 'center',
          marginLeft: 5,
          marginRight: 5,
          marginTop: 5,
        }}
        onPress={() => {
          Eliminar();
        }}>
        <Text style={{ color: 'white', fontSize: 22 }}>Eliminar</Text>
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 20 }}>
          <Input
            label="Nombre"
            value={nombre}
            placeholder="Nombre"
            onChangeText={(text) => setNombre(text)}
          />
          <Input
            label="Descripción"
            value={descripcion}
            inputStyle={{ marginTop: 10 }}
            placeholder="Descripción"
            onChangeText={(text) => setDescripcion(text)}
          />
          <Input
            label="Precio de costo"
            value={preciodecosto}
            inputStyle={{ marginTop: 10 }}
            placeholder="Precio de costo"
            onChangeText={(text) => setPreciodecosto(text)}
          />
          <Input
            label="Precio de venta"
            value={preciodeventa}
            inputStyle={{ marginTop: 10 }}
            placeholder="Precio de venta"
            onChangeText={(text) => setPreciodeventa(text)}
          />
          <Input
            label="Cantidad"
            value={cantidad}
            inputStyle={{ marginTop: 10 }}
            placeholder="Cantidad"
            onChangeText={(text) => setCantidad(text)}
          />
          <Input
            label="Fotografía"
            value={fotografia}
            inputStyle={{ marginTop: 10 }}
            placeholder="URL de fotografía"
            onChangeText={(text) => setFotografia(text)}
          />
          <Image
            style={{ width: 100, height: 100, alignSelf: 'center' }}
            source={{ uri: fotografia }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
//Fin de detalles

//pagina usuarios
Paginausuarios = ({ navigation, route }) => {
  const [elementos, setElementos] = useState([]);
  const [total, setTotal] = useState(0);
  const { idUsuario } = route.params;

  cargarRegistros = () => {
    fetch(
      'https://aplicacionesmoviles2022.000webhostapp.com/apis.php?comando=clientes&id=' +
        idUsuario,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const listado = responseJson;
        setElementos(listado);
        setTotal(listado.length);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarRegistros();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          height: 40,
          marginTop: 10,
          backgroundColor: 'lightgray',
          textAlignVertical: 'center',
          borderRadius: 10,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
        }}>
        Hay {total} Clientes
      </Text>

      <FlatList
        data={elementos}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            //onPress = {() => this.alertItemName(item)}
            onPress={() =>
              navigation.navigate('Detalleclientes', { producto: item })
            }
            style={{
              marginTop: 10,
              marginEnd: 10,
              marginLeft: 2,
              borderColor: 'gray',
              borderRadius: 5,
              borderWidth: 2,
            }}>
            <View
              style={{
                flexGrow: 1,
                flexDirection: 'row',
                marginTop: 5,
                marginLeft: 2,
              }}>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    flexWrap: 'wrap',
                    flexShrink: 1,
                  }}>
                  {item.nombre}
                </Text>
                <Text style={{ flex: 1, fontSize: 12, fontWeight: 'bold' }}>
                  Domicilio {item.domicilio}
                </Text>
                <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold' }}>
                  Telefono {item.telefono}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 70,
          backgroundColor: 'red',
          borderRadius: 100,
        }}
        onPress={() =>
          navigation.navigate('Agregarcliente', { idUsuario: idUsuario })
        }>
        <Icon name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};
// fin usuarios

//Agregar clientes
Agregarcliente = ({ navigation, route }) => {
  const [nombre, setNombre] = useState('');
  const [domicilio, setdomicilio] = useState('');
  const [telefono, settelefono] = useState('');
  const [correo, setcorreo] = useState('');
  const [fotografia, setFotografia] = useState('');

  const { idUsuario } = route.params;

  navigationOptions = {
    title: 'Agregar clientes',
    headerStyle: {
      backgroundColor: '#B32000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  Guardar = () => {
    const urlapi =
      'https://aplicacionesmoviles2022.000webhostapp.com/apis.php?comando=gregarCliente&nombre=' +
      nombre +
      '&domicilio=' +
      domicilio +
      '&telefono=' +
      telefono +
      '&correo=' +
      correo +
      '&urlfoto=' +
      fotografia +
      '&idusuario=' +
      idUsuario;

    fetch(urlapi, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const mensaje = responseJson.estatus;
        console.log(mensaje);
        if (mensaje == 'error') alert('Error al agregar!');
        else {
          alert(mensaje);
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error de Internet!!');
      });
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
      <Input placeholder="Nombre" onChangeText={(text) => setNombre(text)} />

      <Input
        inputStyle={{ marginTop: 10 }}
        placeholder="Domicilio"
        onChangeText={(text) => setdomicilio(text)}
      />
      <Input
        inputStyle={{ marginTop: 10 }}
        placeholder="Telefono"
        onChangeText={(text) => settelefono(text)}
      />
      <Input
        inputStyle={{ marginTop: 10 }}
        placeholder="Correo"
        onChangeText={(text) => setcorreo(text)}
      />
      <Input
        inputStyle={{ marginTop: 10 }}
        placeholder="URL de fotografía"
        onChangeText={(text) => setFotografia(text)}
      />
      <TouchableOpacity
        style={{
          height: 50,
          backgroundColor: 'red',
          marginTop: 15,
          borderRadius: 5,
          justifyContent: 'center',
          marginLeft: 20,
          marginRight: 20,
        }}
        onPress={() => Guardar()}>
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Guardar
        </Text>
      </TouchableOpacity>
    </View>
  );
};
//Fin de agregar

//Detalles
Detalleclientes = ({ navigation, route }) => {
  const { producto } = route.params;

  const [nombre, setNombre] = useState(producto.nombre);
  const [domicilio, setdomicilio] = useState(producto.domicilio);
  const [telefono, settelefono] = useState(producto.telefono);
  const [correo, setcorreo] = useState(producto.correo);
  const [urlfoto, seturlfoto] = useState(producto.urlfoto);
  const [id, setId] = useState(producto.id);
  const [idusuario, setIdusuario] = useState(producto.idusuario);

  Actualizar = () => {
    const urlapi =
      'https://aplicacionesmoviles2022.000webhostapp.com/apis.php?comando=editarCliente&nombre=' +
      nombre +
      '&domicilio=' +
      domicilio +
      '&telefono=' +
      telefono +
      '&correo=' +
      correo +
      '&urlfoto=' +
      urlfoto +
      '&id=' +
      id +
      '&idusuario=' +
      idusuario;

    fetch(urlapi, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const mensaje = responseJson.estatus;
        console.log(mensaje);
        if (mensaje === 'error') alert('Error al actualizar!');
        else {
          alert(mensaje);
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error de Internet!!');
      });
  };

  Eliminar = () => {
    fetch(
      'https://aplicacionesmoviles2022.000webhostapp.com/apis.php?comando=eliminarCliente&id=' +
        id,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const mensaje = responseJson.estatus;
        console.log(mensaje);
        if (mensaje === 'error') alert('Error al eliminar!');
        else {
          alert(mensaje);
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error de Internet!!');
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          height: 40,
          borderRadius: 5,
          alignItems: 'center',
          marginLeft: 5,
          marginRight: 5,
          marginTop: 5,
        }}
        onPress={() => {
          Actualizar();
        }}>
        <Text style={{ color: 'white', fontSize: 22 }}>Actualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          height: 40,
          borderRadius: 5,
          alignItems: 'center',
          marginLeft: 5,
          marginRight: 5,
          marginTop: 5,
        }}
        onPress={() => {
          Eliminar();
        }}>
        <Text style={{ color: 'white', fontSize: 22 }}>Eliminar</Text>
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 20 }}>
          <Input
            label="Nombre"
            value={nombre}
            placeholder="Nombre"
            onChangeText={(text) => setNombre(text)}
          />
          <Input
            label="Domicilio"
            value={domicilio}
            inputStyle={{ marginTop: 10 }}
            placeholder="Domicilio"
            onChangeText={(text) => setdomicilio(text)}
          />
          <Input
            label="telefono"
            value={telefono}
            inputStyle={{ marginTop: 10 }}
            placeholder="telefono"
            onChangeText={(text) => settelefono(text)}
          />
          <Input
            label="correo"
            value={correo}
            inputStyle={{ marginTop: 10 }}
            placeholder="correo"
            onChangeText={(text) => setcorreo(text)}
          />

          <Input
            label="Fotografía"
            value={urlfoto}
            inputStyle={{ marginTop: 10 }}
            placeholder="URL de fotografía"
            onChangeText={(text) => seturlfoto(text)}
          />
          <Image
            style={{ width: 100, height: 100, alignSelf: 'center' }}
            source={{ uri: urlfoto }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
//Fin de detalles

//Paginavender
Paginavender = ({ navigation, route }) => {
  const [elementos, setElementos] = useState([]);
  const { idUsuario } = route.params;
  const iduser = idUsuario;

  cargarRegistros = () => {
    fetch(
      'https://aplicacionesmoviles2022.000webhostapp.com/apis.php?comando=clientes&id=' +
        idUsuario,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const listado = responseJson;
        setElementos(listado);
        setTotal(listado.length);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarRegistros();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);
  updateClientess = (clienteseleccionado) => {
    setClientess(clienteseleccionado);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          height: 40,
          marginTop: 10,
          backgroundColor: 'white',
          textAlignVertical: 'center',
          borderRadius: 10,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
        }}>
        seleccione el cliente
      </Text>

      <FlatList
        data={elementos}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            //onPress = {() => this.alertItemName(item)}
            onPress={() =>
              navigation.navigate('Completar Venta', {
                idUsuario,
                idCliente: item.id,
                nCliente: item.nombre,
              })
            }
            style={{
              marginTop: 10,
              marginEnd: 10,
              marginLeft: 2,
              borderColor: 'gray',
              borderRadius: 5,
              borderWidth: 2,
            }}>
            <View
              style={{
                flexGrow: 1,
                flexDirection: 'row',
                marginTop: 5,
                marginLeft: 2,
              }}>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    flexWrap: 'wrap',
                    flexShrink: 1,
                  }}>
                  {item.nombre}
                </Text>
                <Text style={{ flex: 1, fontSize: 12, fontWeight: 'bold' }}>
                  Domicilio {item.domicilio}
                </Text>
                <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold' }}>
                  Telefono {item.telefono}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
//Fin de agregar

//Listar productos
Paginavender2 = ({ navigation, route }) => {
  const [elementos, setElementos] = useState([]);
  const { idUsuario, idCliente, nCliente } = route.params;
  const [carrito, setCarrito] = useState([]); // El array para guardar las cantidades
  const [totalCarrito, setTotalCarrito] = useState(0);
  const carritoItems = [];

  const calcularTotalCarrito = () => {
    const total = carrito.reduce((total, item) => total + item.Total, 0);
    setTotalCarrito(total);
  };

  // useEffect para calcular el total cuando cambia el carrito
  useEffect(() => {
    calcularTotalCarrito();
  }, [carrito]);
  //carritoItems = [];
  Compra = (carrito) => {
    for (const item of carrito) {
      carritoItems.push({
        id: item.IdProd,
        producto: item.Producto,
        cantidad: item.Cantidad,
        precio: item.Precio,
      });
    }
    const carritoItemsJSON = JSON.stringify(carritoItems);

    const urlapi =
      'https://aplicacionesmoviles2022.000webhostapp.com/apis.php?comando=insticket&' +
      `idusuario=${idUsuario}&idcliente=${idCliente}&cliente=${nCliente}&productos=${carritoItemsJSON}&total=${totalCarrito}`;

    fetch(urlapi, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const mensaje = responseJson.estatus;
        console.log(mensaje);
        if (mensaje == 'error') alert('Error al agregar!');
        else {
          alert(mensaje);
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error de Internet!!' + error.message);
      });
  };

  cargarRegistros = () => {
    fetch(
      'https://aplicacionesmoviles2022.000webhostapp.com/apis.php?comando=productos&id=' +
        idUsuario,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const listado = responseJson;
        setElementos(listado);
        setTotal(listado.length);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarRegistros();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);

  const mostrarPrompt = (
    idprod,
    nombreProducto,
    cantidadproducto,
    preciodeventa
  ) => {
    Alert.prompt(
      'Cantidad',
      'Ingrese la cantidad deseada:',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelado'),
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: (cantidadIngresada) => {
            const cantidadNumerica = parseInt(cantidadIngresada);
            if (!isNaN(cantidadNumerica)) {
              if (cantidadNumerica <= cantidadproducto) {
                setCarrito([
                  ...carrito,
                  {
                    IdProd: idprod,
                    Producto: nombreProducto,
                    Total: preciodeventa * cantidadNumerica,
                    Cantidad: cantidadNumerica,
                    Precio: preciodeventa,
                  },
                ]);
                calcularTotalCarrito;
              } else {
                Alert.alert('cantidad insuficiente en stock');
              }
            }
          },
        },
      ],
      'plain-text'
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <View style={{ flex: 0.5, marginTop: 10, marginBottom: 5 }}>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            height: 40,
            marginTop: 10,
            backgroundColor: 'white',
            textAlignVertical: 'center',
            borderRadius: 10,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 5,
          }}>
          Seleccione el producto
        </Text>

        <FlatList
          data={elementos}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              //onPress = {() => this.alertItemName(item)}
              onPress={() =>
                mostrarPrompt(
                  item.id,
                  item.nombre,
                  item.cantidad,
                  item.preciodeventa
                )
              }
              style={{
                marginTop: 5,
                marginLeft: 2,
                borderColor: 'gray',
                borderRadius: 5,
                borderWidth: 2,
              }}>
              <View
                style={{
                  flexGrow: 1,
                  flexDirection: 'row',
                  marginTop: 2,
                  marginLeft: 2,
                }}>
                <View style={{ flex: 1, marginLeft: 5 }}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 14,
                    }}>
                    {item.nombre}
                  </Text>
                  <Text style={{ flex: 1, fontSize: 12, fontWeight: 'bold' }}>
                    ${item.preciodeventa}
                  </Text>
                  <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold' }}>
                    quedan {item.cantidad} unidades
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          //marginBottom={1} // Agregué un marginBottom de 20 píxeles
        />
      </View>

      <View style={{ flex: 1, marginTop: 1 }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            height: 40,
            marginTop: 1,
            backgroundColor: 'white',
            textAlignVertical: 'center',
            borderRadius: 10,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 5,
          }}>
          Contenido del carrito:
        </Text>
        <FlatList
          data={carrito}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: '#CCECF3',
                padding: 5,
                margin: 5,
              }}>
              <Text>Cliente: {nCliente}</Text>
              <Text>Producto: {item.Producto}</Text>
              <Text>Cantidad: {item.Cantidad}</Text>
              <Text>Precio: ${item.Precio}</Text>
              <Text>Subtotal: ${item.Total}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          marginBottom: 30,
          marginTop: 300,
        }}>
        <Text>Total de carrito: ${totalCarrito}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={{
              height: 30,
              backgroundColor: 'red',
              marginTop: 15,
              borderRadius: 5,
              justifyContent: 'center',
              marginLeft: 5,
              marginRight: 20,
              flex: 2,
            }}
            onPress={() => Compra(carrito)}>
            <Text
              style={{
                color: 'white',
                fontSize: 22,
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              Comprar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

//Ticket
Ticket = ({ navigation, route }) => {
  const [elementos, setElementos] = useState([]);
  const { idUsuario } = route.params;
  const iduser = idUsuario;

  cargarRegistros = () => {
    fetch(
      'https://aplicacionesmoviles2022.000webhostapp.com/apis.php?comando=ConsultTiket&id=' +
        idUsuario,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const listado = responseJson;
        setElementos(listado);
        setTotal(listado.length);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarRegistros();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);
  updateClientess = (clienteseleccionado) => {
    setClientess(clienteseleccionado);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <Text style={{ fontSize: 25, textAlign: 'center', marginBottom: 10 }}>
        Tickets
      </Text>

      <FlatList
        data={elementos}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Completar Venta', {
                idUsuario,
                idCliente: item.id,
                nCliente: item.nombre,
              })
            }
            style={{
              marginTop: 10,
              marginEnd: 10,
              marginLeft: 2,
              borderColor: 'gray',
              borderRadius: 5,
              borderWidth: 2,
            }}>
            <View
              style={{
                flexGrow: 1,
                flexDirection: 'row',
                marginTop: 5,
                marginLeft: 2,
              }}>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Text style={{ fontSize: 14, flexWrap: 'wrap', flexShrink: 1 }}>
                  Ticket: {item.id}
                </Text>
                <Text style={{ fontSize: 14 }}>Cliente: {item.cliente}</Text>
                {/* Utiliza el nuevo componente TablaProductos */}
                <TablaProductos productos={item.productos} />
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                  Total: ${item.total}
                </Text>
                <Text style={{ fontSize: 14 }}>Fecha: {item.fecha}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()} // Cambiado a toString() para garantizar que sea una cadena
      />
    </View>
  );
};
//Fin de agregar

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={PantallaInicio}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuP}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Productos"
          component={ListarProductos}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'blue',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Agregarproducto"
          component={PaginaAgregar}
          options={{
            headerShown: true,
            title: 'Agregar producto',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Detalleproduco"
          component={PaginaDetalle}
          options={{
            headerShown: true,
            title: 'Editar producto',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Clientes"
          component={Paginausuarios}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Agregarcliente"
          component={Agregarcliente}
          options={{
            headerShown: true,
            title: 'Agregar cliente',
            headerStyle: {
              backgroundColor: '#B32000',
            },
            headerTintColor: '#fff',
          }}
        />

        <Stack.Screen
          name="Detalleclientes"
          component={Detalleclientes}
          options={{
            headerShown: true,
            title: 'Editar cliente',
            headerStyle: {
              backgroundColor: 'blue',
            },
            headerTintColor: '#fff',
          }}
        />

        <Stack.Screen
          name="Vender"
          component={Paginavender}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Completar Venta"
          component={Paginavender2}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Ticket"
          component={Ticket}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
