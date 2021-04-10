import React from 'react'
import {View, Text, Image, Button, StyleSheet, ScrollView} from 'react-native'

import TaskExpandedComponent from '../../components/Task_expanded'
// import CalenderComponent from '../../components/Test_Calendar'
import CalendarCom from '../../components/Calendar'

const Calendar = () => {
    return (
        <View style={styles.container}>
            <CalendarCom
                data={[
                    {'2021-04-14': 'today we eat'},
                    {'2021-04-15': 'today we have fun'},
                    {'2021-04-16': 'yo bye'},
                    {'2021-04-25': 'today we eat'},
                    {'2021-04-14': 'today we eat'},
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Calendar
