import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { produce } from "immer";

export default function App() {
    const [nextId, setNextId] = useState(3);
    const [activities, setActivities] = useState([
        { id: 1, name: "aaa" },
        { id: 2, name: "bbb" },
    ]);

    const addActivity = () => {
        setActivities(
            produce(activities, (draft) => {
                draft.push({ id: nextId });
            })
        );
        setNextId(nextId + 1);
    };

    const changeActivity = (activity, event) => {
        const nextActivities = produce(activities, (draftActivities) => {
            const index = draftActivities.findIndex(draftActivity => draftActivity.id === activity.id);

            console.log(event);
            draftActivities[index].name = event.nativeEvent.text;
        });

        setActivities(nextActivities);
    };

    const renderActivities = () => {
        return (
            <>
                {activities.map((activity) => (
                    <TextInput
                        key={activity.id}
                        onChange={(event) => changeActivity(activity, event)}
                        value={activity.name}
                        placeholder="type in activity name"
                    />
                ))}
            </>
        );
    };

    return (
        <View style={styles.container}>
            <Text>Hello</Text>
            {renderActivities()}
            <Button onPress={addActivity} title="+" />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
