import React, { Component } from 'react';
import { View } from 'react-native';
import AddressComponent from '../components/AddressComponent';
import { model } from '../Startup';
import { addressFlowControl } from '../FlowControl';

interface IAppProps {
}

interface IAppState {
  address: string;
  name: string;
}

export default class Cart extends Component<IAppProps, IAppState> {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      name: ''
    }
  }

  componentDidMount() {
    this.setState({ address: model.getAddress() });
  }

  onAddressChanged(newAddress) {
    this.setState({address: newAddress});
    model.setAddress(newAddress);
  }

  onNameChanged(newName: string) {
    this.setState({name: newName});
    model.name = newName;
  }

  render() {
    return (
      <AddressComponent 
        address={this.state.address}
        onAddressChanged={this.onAddressChanged.bind(this)}
        name={this.state.name}
        onNameChanged={this.onNameChanged.bind(this)}
        onPayClicked={addressFlowControl.onPayClicked}
      />
    )
  }
}