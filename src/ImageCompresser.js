import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Button,
  Image,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import React, { useState } from "react";
export default function PdfShow({ navigation }) {
  const [image, setImage] = useState([]);
  const [data, setData] = useState("");
  const[isSelected , setIsSelected] = useState([]) ;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [3, 3],
      allowsMultipleSelection: true,
    });
    setImage([...image, result.assets[0].uri]);
    setData("data");
  };



  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {console.log("data" + image)}
      {data ? (
        <FlatList
          style={styles.imageContainer}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
          horizontal={false}
          data={image}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <Image
                  source={{ uri: item }}
                  style={[
                    styles.Image,
                    {
                      width: 170,
                      height: 170,
                      margin: 10,
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <Image
          style={{ height: 200, width: 200, resizeMode: "contain" }}
          source={require("../assets/logo_file.png")}
        />
      )}

      <View style={{ marginBottom: 40 ,flexDirection:'row'}}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text>PICK IMAGE </Text>
        </TouchableOpacity>
        <View style={{ paddingLeft: 50 }}>
           {data ? (<TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("pdfShow")}
          >
            <Text> Generate Pdf </Text>
          </TouchableOpacity>) : null
}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#94a0a1",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    width: windowWidth,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
  },
});
