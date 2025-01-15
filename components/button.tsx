import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ width = 150, height = 47, title = "Button", onPress }: { width?: number; height?: number; title?: string; onPress: () => void }) => {
    return (
            <TouchableOpacity style={[styles.button, { width, height }]} onPress={onPress}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#7077a1",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        borderRadius: 4,
        alignItems: "center",
      },
    
      buttonText: {
        color: "#2d3250",
        fontSize: 18,
        fontWeight: "bold",
      },
});

export default Button;