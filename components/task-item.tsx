import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Task } from "../models/Task";

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
    return (
        <View style={styles.taskItem}>
            <TouchableOpacity
                onPress={() => onToggle(task.id)}
                style={[
                    styles.radioCheck,
                    task.isCompleted && styles.radioChechCompleted,
                ]}
            ></TouchableOpacity>
            <Text
                style={[
                    styles.conentText,
                    task.isCompleted && styles.completed,
                ]}
            >
                {task.content}
            </Text>
            <Text style={styles.timeStampText}>
                {new Date(task.timeStamp).toLocaleDateString()}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    taskItem: {
        margin: 10,
        height: 80,
        borderRadius: 10,
        backgroundColor: "#ccd1d3",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30,
    },
    radioCheck: {
        height: 20,
        width: 20,
        borderColor: "#131313",
        borderWidth: 2,
        borderRadius: 100,
        marginRight: 20,
    },
    radioChechCompleted: {
        height: 20,
        width: 20,
        backgroundColor: "#131313",
        borderRadius: 100,
        marginRight: 20,
    },
    conentText: {
        color: "#131313",
        fontSize: 16,
    },
    completed: {
        textDecorationLine: "line-through",
        color: "gray",
    },
    timeStampText: {
        fontSize: 12,
    },
});
