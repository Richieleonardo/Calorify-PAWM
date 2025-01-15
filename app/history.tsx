import React from 'react';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function HistoryScreen() {
  const [dayCalory, setDayCalory] = React.useState(0); 
  const [dayNotCalory, setDayNotCalory] = React.useState(0);
  const [totalDay, setTotalDay] = React.useState(0);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Link href="/home">
        <View style={styles.containerImage}>
          <Image style={styles.arrow} source={require('./../assets/images/back_arrow.png')} />
        </View>
        </Link>
      </View>

      <View style={styles.mainContainer}>

        <View style={styles.mainContainer}>
          <Text style={styles.text}>Calory Analysis</Text>

          <View style={styles.boxContainer}>
            <View style={[styles.box, {backgroundColor: '#BF594D'}]}>
              <Text style={styles.textBox}>Persentase Hari Kalori Terpenuhi</Text>
              <Text style={[styles.textBox, { fontWeight: 'bold', fontSize: 24 }]}>{dayCalory}%</Text>
            </View>
            <View style={[styles.box, {backgroundColor: '#FFAF5D'}]}>
              <Text style={styles.textBox}>Persentase Hari Kalori Tidak Terpenuhi</Text>
              <Text style={[styles.textBox, { fontWeight: 'bold', fontSize: 24 }]}>{dayNotCalory}%</Text>
            </View>
            <View style={[styles.box, {backgroundColor: '#025C87'}]}>
              <Text style={styles.textBox}>Jumlah Hari Yang Dianalisa</Text>
              <Text style={[styles.textBox, { fontWeight: 'bold', fontSize: 24 }]}>{totalDay}</Text>
            </View>
          </View>
        </View>

        <View style={styles.savedData}>
          <Text style={styles.text}>Saved Data</Text>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212434',
  },
  header:{
    flex: 1,
    width: '100%',
    backgroundColor: '#212434',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212434',
  },
  savedData: {
    paddingLeft: 20,
    width: '100%',
    justifyContent: 'flex-start',
  },
  containerImage: {
    width: '100%',
    padding: 10,
    paddingLeft: 10,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  box: {
    width: 109,
    height: 139,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    gap: 5,
  },
  arrow: {
    width: 40,
    height: 40,
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
