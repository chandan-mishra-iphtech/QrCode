import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import Scanner from "./src/Scanner";
import ImageCompresion from "./src/ImageCompresser";
import PdfShow from "./src/PdfShow";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import QRCode from "./src/QrCode";

const Tab = createBottomTabNavigator();

const BottomTabNaviagtion = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Scanner"
       
      >
        <Tab.Screen

          name="Scanner"
          component={Scanner}
          options={{
             headerShown: false ,
            tabBarLabel: "Scanner",
            tabBarIcon: () => (
              <Image
                style={styles.bottomTabIcon}
                source={require("./assets/scanner.jpeg")}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Gallery"
          component={ImageCompresion}
          options={{
            headerTintColor:"white",
            headerStyle: {
              backgroundColor: '#75aaff'
            },

            tabBarLabel: "Image",
            tabBarIcon: () => (
              <Image
                style={styles.bottomTabIcon}
                source={require("./assets/Image.png")}
              />
            ),
          }}
        />

        <Tab.Screen
          name="pdfShow"
          component={PdfShow}
          options={{
            headerShown: false ,
            tabBarLabel: "Pdf",
            tabBarIcon: () => (
              <Image
                style={styles.bottomTabIcon}
                source={require("./assets/pdf.png")}
              />
            ),
          }}
        />
        <Tab.Screen
          name="QrCode"
          component={QRCode}
          options={() => ({
            headerShown: false ,
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  bottomTabIcon: {
    width: 30,
    height: 30,
  },
});

export default BottomTabNaviagtion;
