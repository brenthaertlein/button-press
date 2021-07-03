import {LinearGradient} from 'expo-linear-gradient';
import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import BetterPulsingCircle from './BetterPulsingCircle';

type GayCircleProps = {
    backgroundColor: string,
    palette?: string[],
    size: number
}

const GayCircle = ({
                       backgroundColor,
                       palette = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'],
                       size
                   }: GayCircleProps) => {

    const styles = style({size})

    const borderWidthFactor = 40;

    const rotation = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(
                    rotation,
                    {
                        toValue: 0.5,
                        duration: 2000,
                        delay: 100,
                        easing: Easing.linear,
                        useNativeDriver: false
                    }
                ),
                Animated.timing(
                    rotation,
                    {
                        toValue: 1,
                        duration: 3000,
                        easing: Easing.linear,
                        useNativeDriver: false
                    }
                )
            ])
        ).start()
    }, [])

    return (
        <Animated.View
            style={
                {
                    height: size,
                    width: size,
                    transform: [{
                        rotate: rotation.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg']
                        })
                    }],
                }
            }
        >
            <LinearGradient
                start={[1, 1]}
                end={[1, 0]}
                colors={palette}
                style={styles.gradient}
            >
                <BetterPulsingCircle
                    backgroundColor={backgroundColor}
                    borderWidth={size / borderWidthFactor}
                    size={size}
                />
            </LinearGradient>
        </Animated.View>
    )
}

export default GayCircle

type GayCircleStyle = { size: number }

const style = ({size}: GayCircleStyle) => {

    return StyleSheet.create({
        gradient: {
            position: 'absolute',
            borderRadius: size,
            height: size,
            width: size,
        }
    })
}
