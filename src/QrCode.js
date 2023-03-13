import {
  View,
  Pressable,
  Text,
  Button,
  StyleSheet,
  Linking,
  ToastAndroid,
  Share,
} from "react-native";
import QRCodeView from "react-native-qrcode-svg";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import { useState, useEffect } from "react";
const QRCode = ({ route, navigation }) => {
  const [QRref, setQRref] = useState();
  const [hasPermissions, setHasPermissions] = useState(false);
  const [qrCode, setQRCode] = useState(route.params.items.data);
  const [data, setData] = useState("");
  useEffect(() => {
    (async () => {
      setHasPermissions((await MediaLibrary.requestPermissionsAsync()).granted);
    })();
  }, []);

  const saveQRCode = () => {
    if (!hasPermissions || !QRref) return;

    QRref.toDataURL(async (value) => {
      const QRCodeImg = FileSystem.documentDirectory + "QRCode.png";
      await FileSystem.writeAsStringAsync(QRCodeImg, value, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (QRCodeImg) {
        MediaLibrary.saveToLibraryAsync(QRCodeImg)
          .then(() =>
            ToastAndroid.show("QR Code saved to gallery", ToastAndroid.SHORT)
          )
          .catch(console.error);
      } else {
        console.log("QRCode Image is null or undefiend");
      }
    });
  };
  const handleQRCodePress = async () => {
    Share.share(
      {
        message: qrCode,
      },
      { dialogTitle: "Share QR Code via" }
    )
      .then(({ action, activityType }) => {
        if (action === Share.sharedAction) console.log("Share was successful");
        else console.log("Share was dismissed");
      })
      .catch((err) => console.log(err));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      {/* <QRCodeView
        value={route.params.items.data ? route.params.items.data : "NA"}
        size={250}
        color="black"
        backgroundColor="white"
        logo={{
          url: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png",
        }}
        logoSize={30}
        logoMargin={2}
        logoBorderRadius={15}
        logoBackgroundColor="transparent"
      /> */}
      <View style={styles.container}>
        <View style={styles.qr}>
          <Pressable>
            {route.params.items.data && (
              <QRCodeView
                size={240}
                value={qrCode}
                getRef={setQRref}
                backgroundColor="#fff"
              />
            )}
          </Pressable>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <View style={{ marginTop: 40 }}>
            <Button title="Share" onPress={handleQRCodePress} />
          </View>

          {route.params.items.data && (
            <View style={{ marginTop: 40 }}>
              <Button title="Download" onPress={saveQRCode} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Button: {
    backgroundColor: "deepskyblue",
    marginTop: 32,

    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 20,
    paddingBottom: 17,
  },

  instraction: {
    marginTop: 40,
    color: "#adadad",
  },

  instraicon: {
    color: "#bf88f3",
  },
  qr: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    width: 250,
  },
});

export default QRCode;
