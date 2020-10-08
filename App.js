import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Button, TextInput } from 'react-native-paper';

export default function App() {
  const [peso, setPeso] = React.useState();
  const [altura, setAltura] = React.useState();
  const [imc, setImc] = React.useState(0);
  const [legenda, setLegenda] = React.useState('Indeterminado');
  const [cor, setCor] = React.useState('#bdc3c7');

  const diagnostico = imc => {
    if (imc < 18.5) {
      setCor('#f1c40f');
      return 'Magreza';
    } else if (imc >= 18.5 && imc < 25) {
      setCor('#2ecc71');
      return 'Normal';
    } else if (imc >= 25 && imc < 30) {
      setCor('#e67e22');
      return 'Sobrepeso';
    } else if (imc >= 30 && imc < 40) {
      setCor('#e74c3c');
      return 'Obesidade';
    } else if (imc >= 40) {
      setCor('#c0392b');
      return 'Obesidade Grave';
    }
  }

  const calcularIMC = () => {
    const resultado = peso / (altura*altura);

    setImc(Math.ceil(resultado));

    setLegenda(diagnostico(resultado));
  }

  const reiniciar = () => {
    setPeso(0);
    setAltura(0);
    setCor('#bdc3c7');
    setImc(0);
    setLegenda('Indefinido');
  }

  return (
    <View>
      <View style={[styles.header, {backgroundColor: cor}]}>
        <Text style={styles.legenda}>Seu IMC</Text>
        <Text style={styles.resultado}>{imc}</Text>
        <Text style={styles.diagnostico}>{legenda}</Text>
      </View>

      <View style={styles.body}>
        <TextInput 
        label="Peso:"
        mode="outlined"
        value={peso == 0 ? '' : peso}
        onChangeText={value => {
          setPeso(value.replace(",", "."))
        }} />

        <TextInput
        label="Altura:"
        mode="outlined"
        value={altura == 0 ? '' : altura}
        onChangeText={value => {
          setAltura(value.replace(",", "."))
        }} />

        <Button style={{marginTop: 10}} mode="contained" onPress={calcularIMC}>Calcular IMC</Button>

        <Button style={{marginTop: 10}} mode="outlined" onPress={reiniciar}>Reiniciar</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 20
  },
  body: {
    padding: 20,
  },
  legenda: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 50,
    color: '#7f8c8d'
  },
  resultado: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
    color: 'white'
  },
  diagnostico: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  }
});