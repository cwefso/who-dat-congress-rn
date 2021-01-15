import React from "react";
import { StyleSheet, View, Image } from "react-native";
import CustomButton from "/Users/cwefso/projects/WhoDatReactNative/app/components/CustomButton.js";

const HomeScreen = ({ navigation }) => {
	return (
		<View style={styles.main}>
			<Image
				source={require("/Users/cwefso/projects/WhoDatReactNative/assets/logo.png")}
				style={styles.logo}
			/>
			<View style={styles.buttonContainer}>
				<CustomButton
					onPress={() => navigation.navigate("Congress")}
					title="Congress"
				/>
				<CustomButton
					onPress={() => navigation.navigate("Senate")}
					title="Senate"
				/>
			</View>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	main: {
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "white",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "row",
		width: "90%",
		justifyContent: "space-evenly",
	},
	logo: {
		width: "65%",
		height: "65%",
		bottom: 40,
		right: 1
	},
});
