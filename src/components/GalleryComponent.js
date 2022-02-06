import React, { useState, useEffect } from "react";
import { Button, View, Platform, Image, StyleSheet } from "react-native";
import { Auth } from "aws-amplify";
import { Icon, Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { Storage } from "aws-amplify";

const GalleryComponent = () => {
    const [image, setImage] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [progressText, setProgressText] = useState('');

    useEffect(() => {
    (async () => {
        if (Platform.OS !== "web") {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Camera roll permissions are required!");
            }
        }
    })();
}, []);

    const chooseImg = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
            allowsEditing: true,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        {image && (
          <>
            <Image source={{ uri: image }} style={{ width: 75, height: 75 }} />
            <Button
              color="red"
              title="Remove Image"
              onPress={() => {
                setImage(null);
              }}
            ></Button>
          </>
        )}
        <Button
          title="Choose photo"
          onPress={chooseImg}
          styles={styles.button}
        />
      </View>
    );
};

export default GalleryComponent;

const styles = StyleSheet.create({
    button: {
        width: 50
    }
})