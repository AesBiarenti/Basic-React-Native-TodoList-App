import { useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { TaskItem } from "./components/task-item";
import { Task } from "./models/Task";
import { v4 as uuidv4 } from 'uuid';

export default function app() {
    const [task, setTask] = useState<Task[]>([]);
    const [input, setInput] = useState<string>("");
    const addTask = () => {
        if (!input.trim()) return;
        const newTask: Task = {
            id: Date.now().toString(),
            content: input,
            isCompleted: false,
            timeStamp: Date.now(),
        };
        setTask((prev) => [newTask, ...prev]);
        setInput("");
    };
    const toggleComplete = (id: string) => {
        setTask((prev) =>
            prev.map((task) =>
                task.id === id
                    ? { ...task, isCompleted: !task.isCompleted }
                    : task
            )
        );
    };
    return (
        <SafeAreaView style={styles.main}>
            {" "}
            <Text style={styles.title}>Görevlerim</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Yeni görev gir..."
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: "#ccd1d3",
                        width: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 8,
                    }}
                    onPress={addTask}
                >
                    <Text style={{ fontWeight: "500", fontSize: 15 }}>
                        Ekle
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={task}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        key={item.id}
                        onToggle={() => toggleComplete(item.id)}
                        task={item}
                    ></TaskItem>
                )}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#131313",
    },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    inputContainer: { flexDirection: "row", marginBottom: 15 },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginRight: 10,

        backgroundColor: "#ccd1d3",
    },
    taskItem: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
    },
    taskText: { fontSize: 16 },
    completed: { textDecorationLine: "line-through", color: "gray" },
    timestamp: { fontSize: 12, color: "gray", marginTop: 5 },
});
