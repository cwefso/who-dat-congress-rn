import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import CardFlip from "react-native-card-flip";
// import Flippy, { FrontSide, BackSide } from "react-flippy";

const Card = ({ id, chamber }) => {
	const [member, setMember] = useState({});
	const [imageURL, setImageUrl] = useState("");
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
			<Text style={styles.text}>{member.roles[1].leadership_role}</Text>
		);
	} else {
		leadership = <Text style={styles.text}>None</Text>;
	}

	if (member.roles) {
		committees = member.roles[1].committees.map((committee) => {
			return (
				<Text style={styles.text} key={shortid()}>
					{" "}
					- {committee.name}
				</Text>
			);
		});

		if (isFlipped === false) {
			return (
				<View className="App-header">
					<View>
						<TouchableOpacity style={styles.card} onPress={handleFlip}>
							{/* CardFront Open */}
							<Image
								source={{ uri: imageURL }}
								style={styles.image}
								alt="profile-Image"
							/>
							{/* CardFront Close */}
						</TouchableOpacity>
					</View>
				</View>
			);
		} else if (isFlipped === true && chamber === "House") {
			return (
				<TouchableOpacity style={styles.card} onPress={handleFlip}>
										<View style={styles.info}>

					<Text style={styles.text}>
						Name: Rep. {member.first_name} {member.last_name}
					</Text>
					<Text style={styles.text}>Party: {member.roles[1].party}</Text>
					<Text style={styles.text}>
						State: ({member.roles[1].state}-{member.roles[1].district})
					</Text>
					<Text style={styles.text}>Leadership Role: {leadership}</Text>
					<Text style={styles.text}>Committees:</Text>
					<View style={styles.committees}>{committees}</View>
					<Text style={styles.text}>
						{/* <a
													href={`https://www.opensecrets.org/search?q=${member.first_name}+${member.last_name}&type=indiv`}
													style={{ color: "white" }}
													>
													Open Secrets Search
												</a> */}
					</Text>
												</View>
				</TouchableOpacity>
			);
		} else if (isFlipped === true && chamber === "Senate") {
			return (
				<TouchableOpacity style={styles.card} onPress={handleFlip}>
					<View style={styles.info}>

					<Text style={styles.text}>
						Name: Sen. {member.first_name} {member.last_name}
					</Text>
					<Text style={styles.text}>Party: {member.roles[1].party}</Text>
					<Text style={styles.text}>State: {member.roles[1].state}</Text>
					<Text style={styles.text}>Leadership Role: {leadership}</Text>
					<Text style={styles.text}>Committees:</Text>
					<View style={styles.committees}>{committees}</View>
					</View>
				</TouchableOpacity>
			);
		}
	} else {
		console.log("Loading");
		return (
			<View>
				<Text style={styles.text}>Loading...</Text>
			</View>
		);
	}
};
export default Card;

const styles = {
	card: {
		minWidth: 411,
		minHeight: 731,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		top: -80,
		right: -10,
	},
	text: {
		color: "black",
		fontSize: 20,
	},
	info: {
		top: -120,
	},
	committees: {
		left: 150,
		width: 200,
	},
	image: {
		right: -30,
		width: 333, height: 500,
		top: -15
	}
};
