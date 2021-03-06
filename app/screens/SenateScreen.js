import React, { useState, useEffect } from "react";
import Card from "/Users/cwefso/projects/WhoDatReactNative/app/components/Card.js";
import shuffle from "shuffle-array";
import { Text, View} from "react-native";

const SenateScreen = ({navigation}) => {
  const [allMembers, setAllMembers] = useState([])
  const [selectedMember, setSelectedMember] = useState({})

  useEffect(() => {
    loadMembers();
  }, []);
  
  useEffect(() => {
    if(allMembers){
      setSelectedMember(shuffle.pick(allMembers))
    }
  },[allMembers])
  
  const handleReset = () => {
    setSelectedMember(shuffle.pick(allMembers))
  }

  const loadMembers = () => {
    var myHeaders = new Headers();
    myHeaders.append("X-API-Key", "uFMDoeej59MBKmv2peA9Sxnt2bHEReqwp9blNDFG");
    
    fetch("https://api.propublica.org/congress/v1/117/Senate/members.json", {
      method: 'GET',
      headers: myHeaders
    })
      .then(response => response.json())
      .then(result => setAllMembers(result.results[0].members))
      .catch(error => console.log('error', error));
  };

  if(!selectedMember){
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  } else {

    return (
      <View>
      <Card id={selectedMember.id} chamber={"Senate"} handleReset={handleReset} navigation={navigation}/>
		</View>
	);
}
};

export default SenateScreen;
