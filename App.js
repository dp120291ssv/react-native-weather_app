import React, {useState} from "react";
import {useEffect} from "react";
import {Alert} from "react-native";
import * as Location from "expo-location";
import Loading from "./Loading";
import Weather from "./Weather";

const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export default function App() {
    const [state, setState] = useState({isLoading: true, temp: 0});
    const [stateAddress, setStateAddress] = useState("");

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        try {
            await Location.requestForegroundPermissionsAsync();
            const {
                coords: {latitude, longitude},
            } = await Location.getCurrentPositionAsync();
            const response = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });
            await getWeather(latitude, longitude);
            setStateAddress(`${response[0].country}, ${response[0].city}`);
        } catch (error) {
            Alert.alert("Ups, failed to load");
        }
    };

    const getWeather = async (latitude, longitude) => {
        const response = await fetch(
            `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}4&current_weather=true`
        );
        const weather = await response.json().then((data) => data);
        setState({isLoading: false, temp: weather.current_weather.temperature});
        console.log("*** WEATHER *** : ", weather, latitude, longitude);
        return weather;
    };

    return state.isLoading ? (
        <Loading/>
    ) : (
        <Weather address={stateAddress} temp={state.temp}/>
    );
}
