import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface UserCaloryAnalysis {
    Calory: number;
    CaloriesCount: number;
    NamaKegiatan: string;
    CreatedAt: { toDate: () => Date };
    User: string;
}

const SavedData = ({ userCaloryAnalysis }: { userCaloryAnalysis: UserCaloryAnalysis[] }) => {
    const resultJson = userCaloryAnalysis.map(data => ({
        Calory: data.Calory,
        CaloriesCount: data.CaloriesCount,
        NamaKegiatan: data.NamaKegiatan,
        CreatedAt: data.CreatedAt.toDate(),
        User: data.User,
      }));

    return (
        <View style = { {flex: 1, gap: 10} }>
            {resultJson.map((item, index) => (
                <View key={index} style = {styles.savedDataBox}>
                <Text style = {[styles.textBox, { fontWeight: 'bold', fontSize: 24, textAlign: 'left' }]}>{item.NamaKegiatan}</Text>
                <Text style = {[styles.textBox, { fontSize: 15, textAlign: 'left'}]}>{item.CreatedAt.toLocaleDateString()}</Text>
                <View style = { {flexDirection: 'row', alignItems: 'center' } }> 
                    <Text style = {[styles.textBox, {fontWeight: 'bold', textAlign: 'left'}]}>
                        Kalori yang dibutuhkan: 
                    </Text>
                    <Text style = {[styles.text, { fontSize: 15, fontWeight:'medium', color: '#212434'}]}>{Number(item.Calory).toFixed(2)}</Text>
                </View>
                <View style = { {flexDirection: 'row', alignItems: 'center' } } >
                    <Text style = {[styles.textBox, {fontWeight: 'bold', textAlign: 'left'}]}> 
                    Kalori yang dikonsumsi: 
                    </Text>
                    <Text style = {[styles.text, { fontSize: 15, fontWeight:'medium', color: '#212434'}]}>{item.CaloriesCount}</Text>
                </View>
                </View>  
            ))};
        </View>
    );

};

const styles = StyleSheet.create({
    savedDataBox: {
        // justifyContent: 'center',
        // alignItems: 'center',
        width: 370,
        height: 130,
        borderRadius: 15.2,
        backgroundColor: '#7077A1',
    },
    text: {
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: '#7077A1',
        // paddingLeft: 10,
    },
    textBox: {
        fontSize: 14,
        fontFamily: 'Inter',
        color: '#212434',
        textAlign: 'center',
        padding: 5,
    },
});

export default SavedData;