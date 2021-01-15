import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, ScrollView } from "react-native";
import CustomButton from "./CustomButton.js";
import OpenSecretsButton from "./OpenSecretsButton.js";

const Card = ({ id, chamber, handleReset, navigation }) => {
	const [member, setMember] = useState({});
	const [imageURL, setImageUrl] = useState("none");
	const [isFlipped, setIsFlipped] = useState(false);
	const shortid = require("shortid");

	useEffect(() => {
		loadMember();
		setImageUrl(`https://theunitedstates.io/images/congress/450x550/${id}.jpg`);
	}, []);

	const handleFlip = () => {
		isFlipped === false ? setIsFlipped(true) : setIsFlipped(false);
	};

	const loadMember = () => {
		var myHeaders = new Headers();
		myHeaders.append("X-API-Key", "uFMDoeej59MBKmv2peA9Sxnt2bHEReqwp9blNDFG");

		fetch(`https://api.propublica.org/congress/v1/members/${id}.json`, {
			method: "GET",
			headers: myHeaders,
		})
			.then((response) => response.json())
			.then((result) => setMember(result.results[0]))
			.catch((error) => console.log("error", error));
	};

	let committees = <Text style={styles.text}>Loading</Text>;
	let leadership;

	if (member.role) {
		leadership = (
			<Text style={styles.text}>{member.roles[0].leadership_role}</Text>
		);
	} else {
		leadership = <Text style={styles.text}>None</Text>;
	}

	if (member.roles) {
		if(!member.roles[1]){
			committees = member.roles[0].committees.map((committee) => {
				return (
					<Text style={styles.committeeText} key={shortid()}>
						{" "}
						{committee.name}
					</Text>
				);
			});
		} else {
			committees = member.roles[1].committees.map((committee) => {
				return (
					<Text style={styles.committeeText} key={shortid()}>
						{" "}
						{committee.name}
					</Text>
				);
			});
		}
	}

	if (isFlipped === false) {
		return (
			<View>
				<TouchableOpacity style={styles.card} onPress={handleFlip}>
					<View style={styles.imageContainer}>
						<Image
							source={{ uri: imageURL }}
							style={styles.image}
							alt="profile-Image"
						/>
					</View>
				</TouchableOpacity>
				<View style={styles.buttonContainer}>
					<CustomButton onPress={() => navigation.navigate("Home")} title="Home" />
						<CustomButton
							onPress={() => {
								setIsFlipped(false)
								handleReset()
								loadMember()
								setImageUrl(`https://theunitedstates.io/images/congress/450x550/${id}.jpg`)
							}}
							title="Next"
						/>
				</View>
			</View>
		);
	} else if (isFlipped === true) {
		return (
			<View>
			<TouchableOpacity style={styles.card} onPress={handleFlip}>
				<View style={styles.infoContainer}>
					<View style={styles.titles}>
						<Text style={styles.titleName}>Name</Text>
						<Text style={styles.title}>State</Text>
						<Text style={styles.title}>Party</Text>
						<Text style={styles.title}>Leadership Role</Text>
					</View>

					<View style={styles.stats}>
						{chamber === "House" && (
							<View style={styles.stats}>
								<Text style={styles.name}>
									Rep. {member.first_name} {member.last_name}
								</Text>

								<Text style={styles.text}>
									{member.roles[0].state}-{member.roles[0].district}
								</Text>
							</View>
						)}
						{chamber === "Senate" && (
							<View style={styles.stats}>
								<Text style={styles.name}>
									Sen. {member.first_name} {member.last_name}
								</Text>
								<Text style={styles.text}>{member.roles[0].state}</Text>
							</View>
						)}
						<Text style={styles.text}>
							{member.roles[0].party === "D" ? "Democrat" : "Republican"}
						</Text>

						<Text style={styles.text}>{leadership}</Text>
					</View>
				</View>
				<View style={styles.openSecrets}>
				<OpenSecretsButton  onPress={() => Linking.openURL(`https://www.opensecrets.org/search?q=${member.first_name}+${member.last_name}&type=indiv`)} title="Open Secrets" />
				</View>
				<View style={styles.committees}>
					<Text style={styles.title}>Committees</Text>
					{committees}
				</View>
			</TouchableOpacity>
				<View style={styles.buttonContainerInfo}>
					<CustomButton onPress={() => navigation.navigate("Home")} title="Home" />
						<CustomButton
							onPress={() => {
								setIsFlipped(false)
								handleReset()
								loadMember()
								setImageUrl(`https://theunitedstates.io/images/congress/450x550/${id}.jpg`)
							}}
							title="Next"
						/>
				</View>
			</View>
		);
	} else {
		return (
			<View>
				<Text style={styles.text}>Loading...</Text>
			</View>
		);
	}
};
export default Card;

const styles = StyleSheet.create({
	card: {
		minHeight: 731,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	imageContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
	text: {
		color: "black",
		fontSize: 20,
	},
	name: {
		color: "black",
		fontSize: 20,
		minWidth: '10%',
		height: 80
	},
	committeeText: {
		color: "black",
		fontSize: 20,
		textAlign: "center",
		marginTop: 5,
	},
	info: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
	},
	infoContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		top: "-40%",
		width: 333,
	},
	committees: {
		bottom: "10%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: 350,
		overflow: 'hidden'
	},
	image: {
		width: '80%',
		height: '60%',
		top: "-18%",
	},
	title: {
		color: "black",
		fontSize: 20,
		fontWeight: "bold",
	},
	titleName: {
		color: "black",
		fontSize: 20,
		fontWeight: "bold",
		height: 80
	},
	stats: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-end",
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly",
		top: "-72%",
	},
	buttonContainerInfo: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly",
		top: "-50%",
	},
	openSecrets: {
		width: '60%',
		top: "-15%",
	}
});
