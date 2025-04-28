import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      products: [],
      url: 'https://pokeapi.co/api/v2/pokemon'
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {

    this.setState({ loading: true });
    fetch(this.state.url)
      .then((response) => response.json())
      .then( response => {
        this.setState({
          products: response.results,
          url: response.next,
          loading: false
        })

      })
  };

  render() {
    if (this.state.loading){
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
          <StatusBar style="auto" />
        </View>
      );
    }


    return (
      <View style={{flex: 1, paddingTop: 50, paddingLeft: 5}}>
        
        <FlatList
          data={this.state.products}
          renderItem={
            ({item}) => <Text> { item.name } </Text>
          
          }
        
        />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



