import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';

type BigCircleProps = {
    backgroundColor: string,
    color: string,
    gradient?: string[],
    size: number
}

const BigCircle = ({backgroundColor, color, size}: BigCircleProps) => {

    const borderWidth = useRef(new Animated.Value(size / 40)).current

    useEffect(() => {
        pulse(
            borderWidth,
            [size / 80, size / 40]
        ).start()
    }, [])

    const pulse = (
        property: Animated.Value,
        valueMatrix: string[] | number[],
        config: Animated.TimingAnimationConfig = {} as Animated.TimingAnimationConfig
    ): Animated.CompositeAnimation =>
        Animated.loop(
            Animated.sequence(
                // @ts-ignore
                valueMatrix.map((toValue: string | number) =>
                    Animated.timing(property, {
                        duration: 700,
                        delay: 100,
                        ...config,
                        toValue,
                        useNativeDriver: false
                    } as Animated.TimingAnimationConfig)
                )
            )
        )

    // @ts-ignore
    return (
        <>
            <View
                style={
                    {
                        height: size,
                        width: size,
                        backgroundColor,
                    }
                }
            >

                <Animated.View
                    style={
                        {
                            borderColor: color,
                            borderRadius: size,
                            borderWidth,
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            backgroundColor
                        }
                    }
                />
            </View>
        </>
    )
}

export default BigCircle
