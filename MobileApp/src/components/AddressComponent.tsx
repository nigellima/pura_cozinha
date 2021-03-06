import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';

interface IProps {
  onAddressChanged(newAddress: string);
  address: string;
  onNameChanged(newName: string);
  name: string;
  onPayClicked();
}

const Address = (props: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.address} >
        <Text style={styles.header}>Insira o endereço:</Text>
        <TextInput
          style={styles.input}
          onChangeText={props.onAddressChanged}
          value={props.address}
        />
      </View>
      <View style={styles.address} >
        <Text style={styles.header}>Qual o seu nome:</Text>
        <TextInput
          style={styles.input}
          onChangeText={props.onNameChanged}
          value={props.name}
        />
      </View>
      <Button
        onPress={props.onPayClicked}
        title='Pagar'
        color='#841584'
        accessibilityLabel='Pagar'
      />
    </View>
  );
}

export default Address;

const styles = StyleSheet.create({
  input: {height: 40, borderColor: 'gray', borderWidth: 1},
  container: {},
  address: {
    padding: 10
  }
});