import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const CustomButton = ({ onPress, title }) => (
	<TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
		<Text style={styles.appButtonText}>{title}</Text>
	</TouchableOpacity>
);

export default CustomButton;

const styles = StyleSheet.create({
	appButtonContainer: {
		elevation: 8,
		backgroundColor: "#003B87",
		borderRadius: 10,
		paddingVertical: 10,
    paddingHorizontal: 12,
    width: 120
	},
	appButtonText: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
		alignSelf: "center",
		textTransform: "uppercase",
	},
});
