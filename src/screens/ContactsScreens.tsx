import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import dummyContacts from '../assets/data/contacts.json'
import { IContact } from '../interfaces';

const ContactsScreens = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [filterContatcs, setFilterContatcs] = useState(dummyContacts)

    const navigation = useNavigation<any>()

    useEffect(() => {
        const newContacts =
            dummyContacts.filter(
                contact =>
                    contact.user_display_name.includes(searchTerm)
            )
        setFilterContatcs(newContacts)
    }, [searchTerm])

    const handleCallUser = (user: IContact) => {
        console.log(user);
        navigation.navigate('Calling', user)
    }

    return (
        <View style={styles.page}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                onChangeText={(e) => {
                    setSearchTerm(e)
                    console.log(' e -> ', e);
                }}
            />
            <FlatList
                data={filterContatcs}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.75} onPress={() => handleCallUser(item)}>
                        <Text
                            style={styles.contactName}
                        > {item.user_display_name} </Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                )}
            />
        </View>
    )
}

export default ContactsScreens

const styles = StyleSheet.create({
    page: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
    },
    contactName: {
        fontSize: 16,
        marginVertical: 5
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#CECECE'
    },
    searchInput: {
        backgroundColor: '#C1C1C1',
        height: 40,
        borderRadius: 8,
        padding: 12
    }
})