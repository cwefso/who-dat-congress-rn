import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import CardFlip from "react-native-card-flip"
// import Flippy, { FrontSide, BackSide } from "react-flippy"

const Card = ({ id, chamber }) => {
	const [member, setMember] = useState({})
	const [imageURL, setImageUrl] = useState("none")
	const [isFlipped, setIsFlipped] = useState(false)
	const shortid = require("shortid")

	useEffect(() => {
		loadMember()
		setImageUrl(`https://theunitedstates.io/images/congress/450x550/${id}.jpg`)
	}, [])

	const handleFlip = () => {
		isFlipped === false ? setIsFlipped(true) : setIsFlipped(false)
	}

	const loadMember = () => {
		var myHeaders = new Headers()
		myHeaders.append("X-API-Key", "uFMDoeej59MBKmv2peA9Sxnt2bHEReqwp9blNDFG")

		fetch(`https://api.propublica.org/congress/v1/members/${id}.json`, {
			method: "GET",
			headers: myHeaders,
		})
			.then((response) => response.json())
			.then((result) => setMember(result.results[0]))
			.catch((error) => console.log("error", error))
	}

	let committees = <Text style={styles.text}>Loading</Text>
	let leadership

	if (member.role) {
		leadership = (
			<Text style={styles.text}>{member.roles[1].leadership_role}</Text>
		)
	} else {
		leadership = <Text style={styles.text}>None</Text>
	}

	if (member.roles) {
		committees = member.roles[1].committees.map((committee) => {
			return (
				<Text style={styles.committeeText} key={shortid()}>
					{" "}
					{committee.name}
				</Text>
			)
		})
	}

	if (isFlipped === false) {
		return (
			<View className="App-header">
				<View>
					<TouchableOpacity style={styles.card} onPress={handleFlip}>
						{/* CardFront Open */}
						<View style={styles.imageContainer}>
						<Image
							source={{ uri: imageURL }}
							style={styles.image}
							alt="profile-Image"
						/>
						</View>
						{/* CardFront Close */}
					</TouchableOpacity>
				</View>
			</View>
		)
	} else if (isFlipped === true) {
		return (
			<TouchableOpacity style={styles.card} onPress={handleFlip}>
				<View style={styles.infoContainer}>
					<View style={styles.titles}>
					<Text style={styles.title}>
								Name
					</Text>
					<Text style={styles.title}>
								State
					</Text>
					<Text style={styles.title}>Party</Text>
					<Text style={styles.title}>Leadership Role</Text>
					</View>

					<View style={styles.stats}>
					{chamber === "House" && (
						<View style={styles.stats}>
							<Text style={styles.text}>
								Rep. {member.first_name} {member.last_name}
							</Text>

							<Text style={styles.text}>
								{member.roles[1].state}-{member.roles[1].district}
							</Text>
						</View>
					)}
					{chamber === "Senate" && (
						<View style={styles.stats}>
							<Text style={styles.text}>
								Sen. {member.first_name} {member.last_name}
							</Text>
							<Text style={styles.text}>{member.roles[1].state}</Text>
						</View>
					)}
					<Text style={styles.text}>
						{member.roles[1].party === "D" ?
							"Democrat"
						 : 
							"Republican"
						}
					</Text>

					<Text style={styles.text}>{leadership}</Text>
					<Text style={styles.text}>
						{/* <a
													href={`https://www.opensecrets.org/search?q=${member.first_name}+${member.last_name}&type=indiv`}
													style={{ color: "white" }}
													>
													Open Secrets Search
												</a> */}
					</Text>
					</View>
				</View>
												<View style={styles.committees}>
												<Text style={styles.title}>Committees</Text>
													{committees}
												</View>
			</TouchableOpacity>
		)
	} else {
		return (
			<View>
				<Text style={styles.text}>Loading...</Text>
			</View>
		)
	}
}
export default Card

const styles = {
	card: {
		minWidth: 411,
		minHeight: 731,
		// top: -80,
		// right: -10,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: 'center',
	},
	imageContainer: {		
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: 'center',
		width: '100%',
		height: '100%'
	},
	text: {
		color: "black",
		fontSize: 20,
		// textDecorationLine: 'underline',
	},
	committeeText: {
		color: "black",
		fontSize: 20,
		textAlign: 'center'
	},
	info: {
		// top: "15%",
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',

	},
	infoContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		top: "-40%",
		// alignItems: 'center',
	},
	committees: {
		bottom: '10%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		// left: 150,
		width: 350,
	},
	image: {
		width: 333,
		height: 500,
		top: "-10%"
	},
	title: {
		color: "black",
		fontSize: 20,
		fontWeight: 'bold',
    // fontStyle: 'italic',
	},
	stats: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-end',
	}
}

// { color: #e8d4a7 text-decoration: none text-align: right padding: 15px font-size: 20px }
// h2 { font-size: 30px letter-spacing: -1px color: #DFBF84 text-transform: uppercase text-shadow: 1px 1px 0 #000, margin: 10px 0 24px text-align: center line-height: 50px }
