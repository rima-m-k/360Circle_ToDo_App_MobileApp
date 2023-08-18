import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { addTodo, fetchTodo, removeTodo, updateTodo } from '../services/userServices';

const ToDo = () => {
    const [todos, setTodos] = useState([
        {
          creationDate: "",
          isComplete: "",
          taskName: "",
        },
      ]);
      const [newTodo, setNewTodo] = useState('');


    useEffect(() => {
        fetchTodo()
            .then((res) => {
                setTodos(res.data.tasks);
            })
            .catch((err) => {
            });
    }, [todos]);



    const handleInputChange = (fieldName, text) => {
        setFormData({
            ...formData,
            [fieldName]: text,
        });
    };

    const handleSubmit = () => {
        const todoData = { todo: newTodo };
        setTodos([...todos, { taskName: newTodo }]);
        addTodo(todoData);
        setNewTodo('');
    };

    const remove = (index) => {
        removeTodo(index);
        // const updatedTodos = todos.filter((_, i) => i !== index);
        // setTodos(updatedTodos);
    };


    const complete = (index) => {
        updateTodo({ taskID: index });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Todo List</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a new todo..."
                    value={newTodo}
                    onChangeText={(text) => setNewTodo(text)}
                />
                <Button title="Add" onPress={handleSubmit} />
            </View>
            <View>
                <Text style={styles.subheading}>Incomplete Tasks</Text>
                {todos
                    .filter((item) => item.isComplete === false)
                    .map((todo, index) => (
                        <View key={index} style={styles.taskContainer}>
                            <View style={styles.checkboxContainer}>
                               
                                <Text>{todo.taskName}</Text>
                            </View>
                            <View style={styles.actionsContainer}>
                                <Button
                                    title="Remove"
                                    color="red"
                                    onPress={() => remove(todo._id)}
                                />
                                <Button title="Complete" color="green" onPress={() => complete(todo._id)} />
                            </View>
                        </View>
                    ))}
                {todos.length === 0 && (
                    <Text style={styles.noTasksText}>No tasks to display</Text>
                )}
            </View>
            <View>
                <Text style={styles.subheading}>Completed Tasks</Text>
                {todos
                    .filter((item) => item.isComplete === true)
                    .map((todo, index) => (
                        <View key={index} style={styles.taskContainer}>
                            <View style={styles.checkboxContainer}>
                               
                                <Text>{todo.taskName}</Text>
                            </View>
                            <View style={styles.actionsContainer}>
                                <Button
                                    title="Remove"
                                    color="red"
                                    onPress={() => remove(todo._id)}
                                />
                            </View>
                        </View>
                    ))}
                {todos.length === 0 && (
                    <Text style={styles.noTasksText}>No tasks to display</Text>
                )}
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subheading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginRight: 8,
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        paddingVertical: 8,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionsContainer: {
        flexDirection: 'row', 
    },
    noTasksText: {
        color: 'gray',
    },
});

export default ToDo;
