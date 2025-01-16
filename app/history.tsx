import React, { useEffect } from 'react';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app, autentikasi } from '../firebaseConfig';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Component 
import SavedData from '../components/savedData';

export default function HistoryScreen() {
  //Firebase 
  const db = getFirestore(app);

  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting item:', error);
      return null;
    }
  };
  const [email, setEmail] = React.useState('');
  const [dayCalory, setDayCalory] = React.useState(0); 
  const [dayNotCalory, setDayNotCalory] = React.useState(0);
  const [totalDay, setTotalDay] = React.useState(0);
  const [userCaloryAnalysis, setUserCaloryAnalysis] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchData = async ()=> {
      try {
        const fetchEmail = await getData('email');
        setEmail(fetchEmail || 'No Email');
      }
      catch(error){
        console.error('Error fetching email:', error);
      }
    }
    fetchData();
  }, []);

  //Calory analysis (Firebase)
  onAuthStateChanged(autentikasi, async (user) => {
    if (user) {
      try {
        const emailUser = email;
        const userQuery = query(collection(db, 'savedata_users'), where('User', '==', emailUser));

        const execQuery = await getDocs(userQuery);
        setTotalDay(execQuery.size);
        // console.log('Total Day:', totalDay);

        setUserCaloryAnalysis(execQuery.docs.map(doc => doc.data()));
        // const userCaloryAnalysis = execQuery.docs.map(doc => doc.data());

        // Cek percentage of days calories fulfilled and not
        const totalDayFulfilled = userCaloryAnalysis.filter(data => parseFloat(data.Calory) <= parseFloat(data.CaloriesCount)).length;
        setDayCalory((totalDayFulfilled/totalDay)*100);
        setDayNotCalory(100-dayCalory);
      }
      catch(error){
        alert('Failed to get user analysis: ');

      }
    }
    else{
      alert("User is not logged in");
    }
  });

  return (
    <ScrollView stickyHeaderIndices={[0]} style={styles.container}>
      <View style={styles.header}>
        <Link href="/home">
          <View style={styles.containerImage}>
            <Image style={styles.arrow} source={require('./../assets/images/back_arrow.png')} />
          </View>
        </Link>
        {/* <Text style={styles.text}>{email}</Text> // Debugging  */}
      </View>

      <View style={styles.mainContainer}>

        <View style={styles.mainContainer}>
          <Text style={styles.text}>Calory Analysis</Text>

          <View style={styles.boxContainer}>
            <View style={[styles.box, {backgroundColor: '#BF594D'}]}>
              <Text style={styles.textBox}>Persentase Hari Kalori Terpenuhi</Text>
              <Text style={[styles.textBox, { fontWeight: 'bold', fontSize: 24 }]}>{dayCalory.toFixed(2)}%</Text>
            </View>
            <View style={[styles.box, {backgroundColor: '#FFAF5D'}]}>
              <Text style={styles.textBox}>Persentase Hari Kalori Tidak Terpenuhi</Text>
              <Text style={[styles.textBox, { fontWeight: 'bold', fontSize: 24 }]}>{dayNotCalory.toFixed(2)}%</Text>
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

        {/* Dynamic View of the Saved Data that is stored inside resultJson */}
        <View style={{ gap: 10}}>
          <SavedData userCaloryAnalysis={userCaloryAnalysis} />
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
    position: 'absolute',
    zIndex: 10,
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
    paddingTop: 77,
  },
  savedData: {
    paddingLeft: 20,
    width: '100%',
    justifyContent: 'flex-start',
  },
  savedDataBox: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 370,
    height: 130,
    borderRadius: 15.2,
    backgroundColor: '#7077A1',
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
