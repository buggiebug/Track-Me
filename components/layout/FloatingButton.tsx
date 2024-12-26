import React from 'react'
import { TouchableOpacity, Dimensions } from 'react-native'

const FloatingButton = ({ children, style, handlePress }: any) => {
    const { height } = Dimensions.get('window');
    return (
        <>
            <TouchableOpacity
                style={{
                    top: height - 150,
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9,
                    ...style
                }}
                onPress={() => {handlePress()}}
            >
                {children}
            </TouchableOpacity>
        </>
    )
}

export default FloatingButton

