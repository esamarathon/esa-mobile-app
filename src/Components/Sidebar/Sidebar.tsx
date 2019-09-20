import React from 'react';
import {ScrollView, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {DrawerNavigatorItems} from 'react-navigation-drawer';

import {Logo} from '../../Assets/Logo';

// @TODO Fix the prop type, no clue how, can't find a fitting one...
export const SidebarContent = (props: any) => (
    <ScrollView style={styles.container}>
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.container}>
                <View style={styles.menu}>
                    <View style={styles.topContainer}>
                        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
                            <Text style={styles.button}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.hero}>
                        <Text style={styles.text}>ESA Summer Marathon</Text>
                        <Logo size={90} />
                    </View>
                    <DrawerNavigatorItems {...props} />
                </View>
                <View style={styles.meta}>
                    <View style={styles.innerMeta}>
                        <Text style={styles.metaText}>15-22 Feb</Text>
                        <Text style={styles.metaText}>Quality Hotel View</Text>
                        <Text style={styles.metaText}>Malmö</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFE4FB',
    },
    menu: {
        flex: 1,
    },
    meta: {
        flex: 1,
        alignItems: 'center',
        marginTop: 120,
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
