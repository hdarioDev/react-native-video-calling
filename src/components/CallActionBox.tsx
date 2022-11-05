import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
    onHangupPress: () => void
}

const CallActionBox = ({ onHangupPress }: Props) => {

    const [isCameraOn, setIsCameraOn] = useState(true)
    const [isMicOn, setIsMicOn] = useState(true)

    const onReverseCamera = () => {

    }
    const onToggleCamera = () => {
        setIsCameraOn(!isCameraOn)
    }
    const onToggleMicrophone = () => {
        setIsMicOn(!isMicOn)
    }
    return (
        <View style={styles.buttonsContainer}>
            <Pressable onPress={onReverseCamera} style={styles.iconButton}>
                <MaterialCommunityIcons
                    name={"camera-party-mode"}
                    color="#f3f3f3" size={30} />
            </Pressable>
            <Pressable onPress={onToggleCamera} style={styles.iconButton}>
                <MaterialCommunityIcons
                    name={isCameraOn ? "camera-off" : "camera"}
                    color="#f3f3f3" size={30} />
            </Pressable>
            <Pressable onPress={onToggleMicrophone} style={styles.iconButton}>
                <MaterialCommunityIcons
                    name={isMicOn ? "microphone-off" : "microphone"}
                    color="#f3f3f3" size={30} />
            </Pressable>
            <Pressable onPress={onHangupPress} style={{ ...styles.iconButton, backgroundColor: 'red' }}>
                <MaterialCommunityIcons name="phone-hangup" color="#f3f3f3" size={30} />
            </Pressable>
        </View>
    )
}

export default CallActionBox

const styles = StyleSheet.create({
    buttonsContainer: {
        backgroundColor: '#222322',
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto'
    },
    iconButton: {
        backgroundColor: '#4a4a4a',
        padding: 15,
        borderRadius: 50,
    }
})