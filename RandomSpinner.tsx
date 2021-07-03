import {
    EpicSpinnersProps,
    FulfillingBouncingCircleSpinner,
    SemipolarSpinner,
    SpringSpinner,
    HalfCircleSpinner,
    FulfillingSquareSpinner
    // @ts-ignore
} from 'react-native-epic-spinners';
import React from 'react';

const RandomSpinner = (props: EpicSpinnersProps) => {

    const spinners = [
        (<FulfillingBouncingCircleSpinner{...props}/>),
        (<SemipolarSpinner{...props}/>),
        (<SpringSpinner{...props}/>),
        (<HalfCircleSpinner{...props}/>),
        // (<FulfillingSquareSpinner {...props}/>),
    ]

    return spinners[Math.floor(Math.random() * spinners.length)]
}

export default RandomSpinner
