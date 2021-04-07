import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import React, {useState} from 'react'
import Task_expanded from './Task_expanded'

import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ImageBackground,
} from 'react-native'

const Calen = ({data}) => {
    const [show, setShowState] = useState(false)
    const nextDays = []
    const [tasks,settasks] = useState([])
    const [show_date,setdate] = useState('') 
    data.forEach((day) => {
        for (const [key, value] of Object.entries(day)) {
            //console.log(`${key}`);
            nextDays.push(key)
            //console.log("well",nextDays)
        }
    })
    let newDaysObject = {}
    nextDays.forEach((day) => {
        newDaysObject[day] = {
            marked: true,
        }
    })

    return (
        <ImageBackground
            source={require('../assets/Calendar-background.png')}
            style={styles.image}
        >
            <View style={styles.container}>
                <Calendar
                    onDayPress={(day) => {
                        let arr=[]
                            
                            setdate(day.dateString)
                            data.map((item) => {
                                for (const [key, value] of Object.entries(item)) {
                                    if (key === day.dateString) {
                                        arr.push(value)
                                        console.log("SSSSSSSSSSSSSSSSSSS",arr)
                                    }
                                }
                            })
                            if(show === true && day.dateString === show_date){
                                setShowState(false)
                            }
                            else if(show === false){
                                setShowState(true)
                            }
                            settasks(arr)
                    }}
                    onMonthChange={(month) => {
                        console.log('month changed', month)
                    }}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    onPressArrowLeft={(subtractMonth) => subtractMonth()}
                    onPressArrowRight={(addMonth) => addMonth()}
                    enableSwipeMonths={true}
                    markedDates={newDaysObject}
                    theme={{
                        backgroundColor: 'transparent',
                        calendarBackground: 'transparent',
                        textSectionTitleColor: '#ffffff',
                        textSectionTitleDisabledColor: '#ffffff',
                        selectedDayBackgroundColor: '#ffffff',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#ffffff',
                        textDisabledColor: '#ffffff',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: '#ffffff',
                        disabledArrowColor: '#ffffff',
                        monthTextColor: '#ffffff',
                        indicatorColor: 'blue',
                        textDayFontFamily: 'monospace',
                        textMonthFontFamily: 'monospace',
                        textDayHeaderFontFamily: 'monospace',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16,
                    }}
                />
                <Task_expanded show={show} DATA = {tasks}/>
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
    },
    image: {
        // flex: 1,
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        overflow: 'hidden',
    },
})
export default Calen
