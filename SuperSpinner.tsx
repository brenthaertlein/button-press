import {StyleSheet, TouchableOpacity, View} from 'react-native';
import BigCircle from './BigCircle';
import React, {useEffect, useRef, useState} from 'react';
import RandomSpinner from './RandomSpinner';
import {Icon} from '@ui-kitten/components';
import GayCircle from './GayCircle';

type SuperSpinnerProps = {
    icon?: string,
    size: number
}

const SuperSpinner = ({icon, size}: SuperSpinnerProps) => {

    const iconRef = useRef<Icon<any>>(null)

    const [pulsing, setPulsing] = useState(false)
    const [spinning, setSpinning] = useState(false)


    useEffect(() => {
        if (spinning) {
            setTimeout(() => {
                setPulsing(false)
                setSpinning(false)
            }, 5000)

        }
    }, [spinning])

    useEffect(() => {
        if (pulsing) {
            iconRef.current?.startAnimation()
        } else {
            iconRef.current?.stopAnimation()
        }
    }, [pulsing, iconRef.current])

    const palette = [
        '#C70039', '#FF5733', '#ffbf00', '#12ba3c',
        '#19cfd5', '#2c49dc', '#641a87'
    ]
    const color: string = palette[Math.floor(Math.random() * palette.length)]
    const backgroundColor: string = '#18191A' // theme['color-basic-800']

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPressIn={() => pulsing || setPulsing(true)}
            onPressOut={() => spinning || setSpinning(true)}
        >
            {
                spinning ?
                    <RandomSpinner
                        size={size}
                        animationDuration={1500}
                        color={color}
                    />
                    :
                    <>
                        {
                            icon &&
                            <View style={styles.iconContainer}>
                              <Icon
                                  animation='pulse'
                                  animationConfig={{cycles: Infinity}}
                                  fill={color}
                                  name={icon}
                                  ref={iconRef}
                                  style={
                                      {
                                          height: size * 2,
                                          width: size * 2,
                                          alignSelf: 'center',
                                      }
                                  }
                              />
                            </View>
                        }
                        {
                            pulsing ?
                                <GayCircle
                                    backgroundColor={backgroundColor}
                                    palette={palette}
                                    size={size * 5}
                                />
                                :
                                <BigCircle
                                    backgroundColor={backgroundColor}
                                    color={'white'}
                                    size={size * 5}
                                />
                        }
                    </>
            }
        </TouchableOpacity>
    )
}

export default SuperSpinner

const styles = StyleSheet.create({
    iconContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        position: 'absolute',
    }
})
