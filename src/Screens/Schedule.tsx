import React from "react";
import {Button, Image, StyleSheet, View} from "react-native";

export default class ScheduleScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Schedule',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={{uri: "https://cdn3.iconfinder.com/data/icons/menu-icons-1/100/menu-512.png"}}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        ),
    };

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Go back home"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'tomato',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 24,
        height: 24,
    },
});
