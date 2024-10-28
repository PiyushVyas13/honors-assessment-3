import { StatusBar } from 'expo-status-bar';
import {ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from "react";
import {router} from "expo-router";
import id from "./details/[id]";

const IndexPage = () => {
    const [asteroidId, setAsteroidId] = useState('');
    const [ids, setIds] = useState<number[]>([]);

    const apiKey = "RMRLHHe5rQmM2ESuw4b4PcWHLaHDrTIi5wQu5foU";

    const handleSubmit = () => {
        router.push(`/details/${asteroidId}`);
    }

    const handleRandomAsteroid = () => {
        const randomId = Math.floor(Math.random() * ids.length);
        router.push(`/details/${randomId}`);
    }

    useEffect(() => {
        const getIds = async () => {
            const response = await fetch(`https://api.nasa.gov/neo/browse?api_key=${apiKey}`);
            const data = await response.json();
            const idList = [];

            if(!data) {
                console.log(data);
                return null;
            }

            console.log(data);

            for(const asteroid of data) {
                idList.push(asteroid.id);
            }

            setIds(idList);
        };
        getIds();
    }, [ids]);

    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1770&q=80' }}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>NASA Asteroid Tracker</Text>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Asteroid ID"
                        placeholderTextColor="#A0A0A0"
                        value={asteroidId}
                        onChangeText={setAsteroidId}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity disabled={asteroidId === ""} style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.randomButton]} onPress={handleRandomAsteroid}>
                        <Text style={styles.buttonText}>Random Asteroid</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

export default IndexPage;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 40,
    },
    form: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        padding: 20,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4B0082',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    randomButton: {
        backgroundColor: '#800080',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
