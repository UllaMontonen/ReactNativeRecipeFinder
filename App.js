import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList, Image } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [recipe, setRecipe] = useState([]);

  // finding recipes from url using given keyword
  const getRecipe = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(data => setRecipe(data.meals))
    .catch(error => Alert.alert('Error', error.message ));
  }
  
  // creating line between FlatList items
  const ItemSeparator = () => <View 
    style={{
      height: 1,
      width: "100%",
      backgroundColor: "grey"
    }}
  />

  return (
    <View style={styles.container}>

      {/* Flatlist used for listing all recieved recipes, showing recipes name and picture  */}
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
      
      {/* This part is for the textInput and button */}
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
  // container style
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 50,
  },
  // textInput style
  input: {
    marginTop: 20,
    marginBottom: 10,
    padding: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  // button style
  button: {
    flexDirection: 'row',
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // aligning textInput and button on the center
  center: {
    alignItems: 'center',
  }
});
