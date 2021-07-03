import {Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';

type PulsingCircleProps = {
    backgroundColor: string,
    borderWidth: number,
    size: number,
    animationConfig?: Animated.TimingAnimationConfig
}

type Property = {
    animatedValue: Animated.Value,
    values: string[] | number[]
}

const pulse = (
    properties: Property[],
    config: Animated.TimingAnimationConfig = {} as Animated.TimingAnimationConfig
): Animated.CompositeAnimation =>
    Animated.loop(
        Animated.parallel(
            properties.flatMap(property =>
                // @ts-ignore
                sequence(property.animatedValue, property.values, config)
            )
        )
    )

const sequence = (
    property: Animated.Value,
    values: string[] | number[],
    config: Animated.TimingAnimationConfig = {} as Animated.TimingAnimationConfig
) =>
    Animated.sequence(
        // @ts-ignore
        values.map((toValue: string | number) =>
            Animated.timing(property, {
                duration: 700,
                delay: 100,
                ...config,
                toValue,
                useNativeDriver: false
            } as Animated.TimingAnimationConfig)
        )
    )

const PulsingCircle = ({
                           backgroundColor,
                           borderWidth: initialBorderWidth,
                           size
                       }: PulsingCircleProps) => {

    const borderWidthFactor = size / initialBorderWidth;
    const innerCircleSize = size - (initialBorderWidth * 2)

    const borderWidthAnimatedValue = useRef(new Animated.Value(initialBorderWidth)).current
    const sizeAnimatedValue = useRef(new Animated.Value(innerCircleSize)).current
    const borderRadiusAnimatedValue = useRef(new Animated.Value(innerCircleSize)).current

    useEffect(() => {
        pulse(
            [
                {
                    animatedValue: borderWidthAnimatedValue,
                    values: [initialBorderWidth * 0.5, initialBorderWidth]
                },
                {
                    animatedValue: sizeAnimatedValue,
                    values: [(size - initialBorderWidth), innerCircleSize]
                },
                {
                    animatedValue: borderRadiusAnimatedValue,
                    values: [innerCircleSize - (initialBorderWidth * 2), innerCircleSize]
                },
            ]
        ).start()
    }, [])

    return (
        <Animated.View style={
            {
                position: 'absolute',
                margin: borderWidthAnimatedValue,
                borderRadius: borderRadiusAnimatedValue,
                height: sizeAnimatedValue,
                width: sizeAnimatedValue,
                backgroundColor,
                opacity: 1
            }
        }/>
    )
}

export default PulsingCircle
