import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
// import Flippy, { FrontSide, BackSide } from "react-flippy";

const Card = ({ id, chamber }) => {
	const [member, setMember] = useState({});
	const [imageURL, setImageUrl] = useState("");

	useEffect(() => {
		loadMember();
		setImageUrl(`https://theunitedstates.io/images/congress/450x550/${id}.jpg`);
	}, []);

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

		return (
			<View className="App-header">
				<View>
					<View className="container">
						<View className="profile">
							<Image
								source={{ uri: imageURL }}
								style={{ width: 200, height: 300 }}
								alt="profile-Image"
							/>
						</View>
					</View>
				</View>
				{chamber === "House" && (
					<View>
						<View className="container">
							<View className="profile">
								{/* <img src={imageURL} alt="profile-img"></img> */}
								<View className="committees">
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
								</View>
							</View>
						</View>
					</View>
				)}
				{chamber === "Senate" && (
					<View>
						<View>
							<View className="profile">
								{/* <img src={imageURL} alt="profile-img"></img> */}
								<View className="committees">
									<View>
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
									</View>
								</View>
							</View>
						</View>
					</View>
				)}
			</View>
		);
	} else {
		console.log("Loading");
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}
};

export default Card;
