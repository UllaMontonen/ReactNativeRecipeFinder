import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList, Image } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [recipe, setRecipe] = useState([]);

  const getRecipe = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(data => setRecipe(data.meals))
    .catch(error => Alert.alert('Error', error.message ));
  }
  
  const ItemSeparator = () => <View 
    style={{
      height: 1,
      width: "100%",
      backgroundColor: "grey"
    }}
  />

  return (
    <View style={styles.container}>
      <FlatList
          keyExtractor={(item) => String(item.idMeal)}
          renderItem={({item}) => {
            return (
              <View> 
                <Text style={{fontSize: 18, fontWeight: "bold"}}> {item.strMeal} </Text>
                <Image 
                  style={{ width: 100, height: 100 }}
                  source={{
                    uri: `${item.strMealThumb}`,
                  }}
                />
              </View>
            );
          }}
          ItemSeparatorComponent={ItemSeparator}
          data={recipe}
      />
      <View style={styles.center}>
        <TextInput
            style={styles.input}
            onChangeText={keyword => setKeyword(keyword)}
            value={keyword}/>
        <View style={styles.button}>
          <Button onPress={getRecipe} title="Find" />
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 50,
  },
  input: {
    marginTop: 20,
    marginBottom: 10,
    padding: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  button: {
    flexDirection: 'row',
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
  }
});
