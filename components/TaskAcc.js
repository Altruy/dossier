import React, {useState} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ImageBackground,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import Colors from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Alert } from "react-native";
import {useAuth} from '../auth_providers/Auth'

export default Accordian = ({ data , navigation}) => {
  const [showInfo, setShowInfo] = useState(false);
  const {
    id,
    collab,
    title,
    assignees,
    assigner,
    deadline,
    description,
    completed,
  } = data;
  const { realm , username , collabId} = useAuth();

  const handleEdit = ()=>{
    navigation.navigate('EditTask',{
      id : id
    })
  }

  const alertDelete = () => {
    Alert.alert(
      `Delete '${title}'`,
      `Are you sure you want to delete this task?\nThis cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'Delete', onPress: () => handleDelete() }
      ],
      { cancelable: false }
    );
  }

  const handleDelete = () => {
    let tas = realm.objects('tas').filtered(`id = "${id}"`)[0]
    realm.write(() => {
      realm.delete(tas);
    });
    navigation.replace('Tasks') // check
  }

  const handleDone = () =>{
    let tas = realm.objects('task').filtered(`id = "${id}"`)[0]
    realm.write(() => {
      tas.completed = !completed;
    });
    (!completed)?Alert.alert(`${title} marked as complete`):Alert.alert(`${title} marked as incomplete`)
    navigation.replace('Tasks')
  }
 
  return (
    <TouchableOpacity
      style={styles.accordian}
      onPress={() => setShowInfo(!showInfo)}
    >
      <View style={styles.box}>
        <View style={styles.dropdown}>
          <Text style={(!completed)?styles.title:styles.titleDon}>{title}</Text>
          <View style={styles.btn}>
            <Icon
              style={styles.clip}
              name="clipboard-check"
              size={30}
              color="white"
              onPress={()=>handleDone()}
            />
            { (username===assigner) &&
              <Icon style={styles.edit} name="edit" size={30} color="white" onPress={()=>handleEdit()}/>
            }
            { (username===assigner) &&
            <Icon style={styles.times} name="times" size={30} color="white" onPress={()=>alertDelete()}/>
            }
          </View>
        </View>

        {showInfo && (
          <View style={styles.answers}>
            <Text style={styles.answer}>Co-Assignees: {assignees.join(' , ')}</Text>
            <Text style={styles.answer}>Deadline: {Date(deadline).slice(0,Date(deadline).indexOf('GMT'))} </Text>
            <Text style={styles.answer}>Description: {description} </Text>
            <Text style={styles.answer}>Assigner: {assigner} </Text>
          </View>
        )}
        {showInfo ? (
          <Icon name="angle-up" size={18} style={styles.icon} color="white" />
        ) : (
          <Icon name="angle-down" size={18} style={styles.icon} color="white" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeback,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.5,
    width: "100%",
  },
  dropdown: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    alignItems: "center",
  },
  box: {
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "90%",
    borderRadius: 15,
    alignItems: "flex-start",
  },
  title: {
    // alignItems: "flex-start",
    color: "white",
    fontSize: 22,
    paddingTop: 0,
    paddingBottom: 0,
  },
  titleDon: {
    // alignItems: "flex-start",
    color: "white",
    fontSize: 22,
    paddingTop: 0,
    paddingBottom: 0,
    textDecorationLine:'line-through',
    textDecorationStyle:'solid',
  },
  answer: {
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 7,
    color: "white",
    fontSize: 17,
  },
  answers: {
    paddingTop: 10,
  },
  icon: {
    position: "relative",
    alignSelf: "center",
  },
  accordian: {
    width: "100%",
    alignItems: "center",
  },
  clip: {
    // position: "absolute",
    padding: 3,
    // left: "69%",
  },
  edit: {
    // position: "absolute",
    padding: 3,
    marginLeft:'5%'
    // right:'31%'
    // left: "81%",
  },
  times: {
    // position: "absolute",
    padding: 4,
    // right: "5%",
  },
  btn : {
    position: "absolute",
    right:'-80%',
    flexDirection : 'row',
    width:'33%',
    justifyContent:'flex-end'
  }
});
