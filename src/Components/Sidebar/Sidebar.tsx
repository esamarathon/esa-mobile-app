import React, {useContext} from 'react';
import {ScrollView, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';
import {DrawerNavigatorItems, DrawerContentComponentProps} from 'react-navigation-drawer';
import dayjs from 'dayjs';
import Logo from '../../Assets/Logo';
import {EventContext} from '../../App';
import {CloseIcon} from '../../Assets/Icons';

type IProps = DrawerContentComponentProps & {navigation: NavigationScreenProp<NavigationRoute>};

export default function Sidebar(props: IProps) {
    const {event} = useContext(EventContext);

    const startDate = dayjs(event.startDate);
    const endDate = dayjs(event.endDate);
    const sameMonth = startDate.month === endDate.month;

    return (
        <View style={styles.container}>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                <ScrollView style={styles.innerContainer}>
                    <View style={styles.menu}>
                        <View style={styles.topContainer}>
                            <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
                                <CloseIcon fill="#7C2DDF" size={28} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.hero}>
                            <Text style={styles.text}>{event.name}</Text>
                            <Logo size={90} />
                        </View>
                        <DrawerNavigatorItems {...props} />
                    </View>
                    <View style={styles.meta}>
                        <View style={styles.innerMeta}>
                            <Text style={styles.metaText}>
                                {startDate.format('D')}
                                {sameMonth ? '' : ' ' + startDate.format('MMM')} -{' '}
                                {endDate.format('D')} {endDate.format('MMM')}
                            </Text>
                            <Text style={styles.metaText}>{event.meta.venue.name},</Text>
                            <Text style={styles.metaText}>{event.meta.venue.city}</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1e3fd',
    },
    innerContainer: {
        height: '100%',
    },
    menu: {
        flex: 1,
        marginBottom: 40,
    },
    meta: {
        alignItems: 'center',
    },
    innerMeta: {
        borderTopColor: '#7C2DDF',
        borderTopWidth: 2,
        width: 200,
    },
    metaText: {
        color: '#7C2DDF',
        textAlign: 'center',
        paddingVertical: 8,
        fontSize: 16,
    },
    topContainer: {
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 20,
        alignItems: 'flex-end',
    },
    hero: {
        alignItems: 'center',
        marginBottom: 40,
    },
    text: {
        color: '#8424E2',
        fontSize: 18,
        marginBottom: 24,
    },
});
