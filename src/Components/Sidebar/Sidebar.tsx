import React from 'react';
import {ScrollView, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {DrawerNavigatorItems} from 'react-navigation-drawer';

import EsaSvg from '../../Assets/Logos/esa';

// @TODO Fix the prop type, no clue how, can't find a fitting one...
export const SidebarContent = (props: any) => (
    <ScrollView style={styles.container}>
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
            <View>
                <View style={styles.menu}>
                    <View style={styles.topContainer}>
                        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
                            <Text style={styles.button}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.hero}>
                        <Text style={styles.text}>ESA Summer Marathon</Text>
                        <EsaSvg width={90} height={90} />
                    </View>
                    <DrawerNavigatorItems {...props} />
                </View>
                <View style={styles.meta}>
                    <Text>15-22 Feb</Text>
                    <Text>Quality Hotel View</Text>
                    <Text>Malmö</Text>
                </View>
            </View>
        </SafeAreaView>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFE4FB',
        position: 'relative',
    },
    menu: {
        flex: 1,
    },
    meta: {
        flex: 1,
        position: 'absolute',
        bottom: 12,
    },
    topContainer: {
        paddingRight: 12,
        alignItems: 'flex-end',
    },
    button: {
        color: '#7C2DDF',
        fontSize: 18,
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
