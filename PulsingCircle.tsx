import {Animated, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

type PulsingCircleProps = {
    backgroundColor: string,
    borderWidth: number,
    size: number,
    animationConfig?: Animated.TimingAnimationConfig
}

const PulsingCircle = ({
                           backgroundColor,
                           borderWidth: initialBorderWidth,
                           size
                       }: PulsingCircleProps) => {

    const [styles, setStyles] = useState(style({
        backgroundColor,
        borderWidth: initialBorderWidth,
        size
    }))

    const borderWidthFactor = size / initialBorderWidth;

    const [borderWidth, setBorderWidth] = useState(initialBorderWidth)

    const borderWidthAnimatedValue = useRef(new Animated.Value(borderWidth)).current

    useEffect(() => {
        borderWidthAnimatedValue.addListener(({value}) => setBorderWidth(value))
        pulse(
            borderWidthAnimatedValue,
            [size / (borderWidthFactor * 2), size / borderWidthFactor]
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

    useEffect(() => {
        setStyles(style({backgroundColor, borderWidth, size}))
    }, [backgroundColor, borderWidth, size])

    return (
        <Animated.View style={styles.circle}/>
    )
}

export default PulsingCircle

type PulsingCircleStyle = { backgroundColor: string, borderWidth: number, size: number }

const style = ({backgroundColor, borderWidth, size}: PulsingCircleStyle) => StyleSheet.create({
    circle: {
        position: 'absolute',
        margin: borderWidth,
        borderRadius: size - (borderWidth * 2),
        height: size - (borderWidth * 2),
        width: size - (borderWidth * 2),
        backgroundColor,
    },
})
