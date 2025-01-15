import { View, Text, StyleSheet } from 'react-native';

const Calorify = ({ fontSize = 24 }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.firstText, { fontSize }]}>Calori</Text>
            <Text style={[styles.secondText, { fontSize }]}>Fy</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    firstText: {
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#7077A1',
    },
    secondText: {
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#FF920C',
    },
});

export default Calorify;
