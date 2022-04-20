// screens/UserDetailScreen.js

import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
const update_user = 'http://10.0.2.2:5001/sever-apinode/us-central1/app/api/update/'
class UpdateUser extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      update_name: '',
      isLoading: true
    };
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  componentDidMount() {
    this.setState({ name: this.props.route.params.name })
  }
  async updateUser() {
    let rjx = /[a-zA-Z]+$/
    let isvalid = rjx.test(this.state.name)
    if (!isvalid) {
      alert('the name is not leagle!')
    }
    else{
    try {


      const requestBody = {
        item: this.state.name
      };

      const updateResponse =
        await fetch(update_user + this.props.route.params.id, {
          method: 'PUT',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      alert('Success Update');
      this.props.navigation.navigate('UserScreen')

      // call select all to update the table
    } catch (error) {
      alert(error);
    }
  }
  }

  render() {

    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>

          <TextInput
            placeholder={'Update_Name'}
            value={this.state.name}
            onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View>
          <Button
            title='Update'
            onPress={() => this.updateUser()}
            color="#19AC52"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7,
  }
})

export default UpdateUser;