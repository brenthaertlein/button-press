import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {theme} from './theme';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import {StyleSheet, View} from 'react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {StatusBar} from 'expo-status-bar';

import SuperSpinner from './SuperSpinner';

export default () => {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    const dynamicTheme = colorScheme === 'light' ? theme.light : theme.dark;

    if (!isLoadingComplete) {
        return null;
    }
    return (
        <SafeAreaProvider>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider {...theme} theme={dynamicTheme}>
                <View style={styles.container}>
                    <SuperSpinner
                        // icon={'activity-outline'}
                        size={45}
                    />
                </View>
            </ApplicationProvider>
            <StatusBar/>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#18191A' // '#222B45'
    }
});
