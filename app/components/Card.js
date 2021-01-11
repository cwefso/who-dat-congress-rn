import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import CardFlip from "react-native-card-flip";
// import Flippy, { FrontSide, BackSide } from "react-flippy";

const Card = ({ id, chamber }) => {
	const [member, setMember] = useState({});
	const [imageURL, setImageUrl] = useState("");
	const [isFlipped, setIsFlipped] = useState(false);

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

	let committees = <Text>Loading</Text>;
	let leadership;

	if (member.role) {
		leadership = <Text>{member.roles[1].leadership_role}</Text>;
	} else {
		leadership = <Text>None</Text>;
	}

	if (member.roles) {
		committees = member.roles[1].committees.map((committee) => {
			return <Text> - {committee.name}</Text>;
		});

		if (isFlipped === false) {
			return (
				<View className="App-header">
					<View>
						<TouchableOpacity style={styles.card} onPress={handleFlip}>
							{/* CardFront Open */}
							<Image
								source={{ uri: imageURL }}
								style={{ width: 200, height: 300 }}
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
						<Text>
							Name: Rep. {member.first_name} {member.last_name}
						</Text>
						<Text>Party: {member.roles[1].party}</Text>
						<Text>
							State: ({member.roles[1].state}-{member.roles[1].district})
						</Text>
						<Text>Leadership Role: {leadership}</Text>
						<Text>Committees:</Text>
						<View>{committees}</View>
						<Text>
							{/* <a
													href={`https://www.opensecrets.org/search?q=${member.first_name}+${member.last_name}&type=indiv`}
													style={{ color: "white" }}
												>
													Open Secrets Search
												</a> */}
						</Text>
					</TouchableOpacity>
				);
												}	else if (isFlipped === true && chamber === "Senate") {
				return (
					<TouchableOpacity style={styles.card} onPress={handleFlip}>
						<Text>
							Name: Sen. {member.first_name} {member.last_name}
						</Text>
						<Text>Party: {member.roles[1].party}</Text>
						<Text>State: {member.roles[1].state}</Text>
						<Text>Leadership Role: {leadership}</Text>
						<Text>
							Committees:
							<View>{committees}</View>
						</Text>
					</TouchableOpacity>
				);
			}
		} else {
			console.log("Loading");
			return (
				<View>
					<Text>Loading...</Text>
				</View>
			);
		}
	}
;

export default Card;

const styles = {
	front: {},
	back: {},
};
