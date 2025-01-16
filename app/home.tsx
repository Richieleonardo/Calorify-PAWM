// React Import
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

// Firebase Import
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzhdfltkBvXa64Y4p-WczOVTs6A1_aBAc",
  authDomain: "calorify-v3.firebaseapp.com",
  projectId: "calorify-v3",
  storageBucket: "calorify-v3.appspot.com",
  messagingSenderId: "437839799724",
  appId: "1:437839799724:web:559e7b6e4d1678c4bd8609",
  measurementId: "G-SQGNDN1RT7",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default function HomeScreen() {
  const [Data, setData] = useState({
    namaKegiatan: "",
    gender: "",
    intensitas: "",
    beratBadan: "",
    tinggiBadan: "",
    umur: "",
  });

  const [caloriesNeeded, setcaloriesNeeded] = useState(0);
  const [caloriesAccepted, setcaloriesAccepted] = useState(0);

  const foodData = [
    { image: require("../assets/images/fries.png"), calories: 100 },
    { image: require("../assets/images/chicken.png"), calories: 200 },
    { image: require("../assets/images/steak.png"), calories: 300 },
    { image: require("../assets/images/fruits.png"), calories: 400 },
    { image: require("../assets/images/rice.png"), calories: 500 },
    { image: require("../assets/images/salad.png"), calories: 600 },
  ];

  const handleInputChange = (name: string, value: string) => {
    setData({ ...Data, [name]: value });
  };

  const calculateCalories = () => {
    const { gender, beratBadan, tinggiBadan, umur, intensitas } = Data;
    let BMR = 0;

    if (gender === "Laki-laki") {
      BMR =
        66.5 +
        13.7 * parseFloat(beratBadan) +
        5 * parseFloat(tinggiBadan) -
        6.8 * parseFloat(umur);
    } else if (gender === "Perempuan") {
      BMR =
        655 +
        9.6 * parseFloat(beratBadan) +
        1.8 * parseFloat(tinggiBadan) -
        4.7 * parseFloat(umur);
    }

    let totalCalories = 0;
    if (intensitas === "Jarang") {
      totalCalories = BMR * 1.3;
    } else if (intensitas === "Sering") {
      totalCalories = BMR * 1.4;
    } else if (intensitas === "Hampir Tidak Pernah") {
      totalCalories = BMR * 1.2;
    }
    setcaloriesNeeded(parseFloat(totalCalories.toFixed(2)));
  };

  const handleFoodClick = (calories: number) => {
    setcaloriesAccepted(caloriesAccepted + calories);
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(database, "userData"), {
        ...Data,
        caloriesNeeded,
        caloriesAccepted,
      });
      console.log("Successfully Submitted!");
    } catch (error) {
      console.error("Error! ", error);
    }
  };

  const handleReset = () => {
    setData({
      namaKegiatan: "",
      gender: "",
      intensitas: "",
      beratBadan: "",
      tinggiBadan: "",
      umur: "",
    });
    setcaloriesNeeded(0);
    setcaloriesAccepted(0);
  };

  const statusKebutuhanKalori = () => {
    if (caloriesAccepted > caloriesNeeded) {
      return "Kebutuhan kalorimu telah melebihi target!";
    } else if (caloriesAccepted === caloriesNeeded) {
      return "Kebutuhan kalorimu belum diketahui!";
    } else {
      return "Kebutuhan kalorimu masih belum terpenuhi!";
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Top Navigation Bar */}
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle1}>
          Calori<Text style={styles.navbarTitle2}>Fy</Text>
        </Text>
      </View>

      {/* Main Business Logic */}
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerMini}>
            <Image
              source={require("../assets/images/description3.png")}
              style={styles.imgDescription}
              accessibilityLabel="Calorify Home Page Asset 1"
            />
            <Text style={styles.text1}>Apa itu CaloriFy?</Text>
            <Text style={styles.text2}>
              CaloriFy merupakan sebuah aplikasi Virtual Lab Olahraga yang
              dibuat oleh Anthony Bryant Gouw ( 18222033 ) dan Richie Leonardo (
              18222071 ) dengan tujuan utama untuk mengedukasi mahasiswa tingkat
              pertama ( TPB ) Institut Teknologi Bandung dalam menyediakan
              eksperimen virtual kebutuhan kalori ideal yang dibutuhkan oleh
              manusia per hari berdasarkan intensitas olahraga yang dilakukan
              oleh manusia. Kebutuhan kalori ini dihitung dengan menggunakan
              rumus Harris-Benedict
            </Text>
          </View>

          <Text style={styles.containerTitel}>The Lab</Text>
          <View style={styles.container2}>
            <Text style={styles.text1}>Basal Metabolism Rate (BMR)</Text>
            <View style={styles.inputGrouping}>
              <Text style={styles.label}>Nama Kegiatan</Text>
              <TextInput
                style={styles.input}
                value={Data.namaKegiatan}
                onChangeText={(value) =>
                  handleInputChange("namaKegiatan", value)
                }
              />
            </View>

            <Text style={styles.subTitle}>Gender</Text>
            <View style={styles.optionGrouping}>
              <TouchableOpacity
                onPress={() => handleInputChange("gender", "Laki-laki")}
                style={styles.optionAvail}
              >
                <View
                  style={
                    Data.gender === "Laki-laki"
                      ? styles.optionSelected
                      : styles.option
                  }
                ></View>
                <Text style={styles.labelOption}>Laki-laki</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleInputChange("gender", "Perempuan")}
                style={styles.optionAvail}
              >
                <View
                  style={
                    Data.gender === "Perempuan"
                      ? styles.optionSelected
                      : styles.option
                  }
                ></View>
                <Text style={styles.labelOption}>Perempuan</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.subTitle}>Intensitas Aktivitas Fisik</Text>
            <View style={styles.optionGrouping}>
              <TouchableOpacity
                onPress={() =>
                  handleInputChange("intensitas", "Hampir Tidak Pernah")
                }
                style={styles.optionAvail}
              >
                <View
                  style={
                    Data.intensitas === "Hampir Tidak Pernah"
                      ? styles.optionSelected
                      : styles.option
                  }
                ></View>
                <Text style={styles.labelOption}>
                  Hampir Tidak Pernah Berolahraga
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleInputChange("intensitas", "Jarang")}
                style={styles.optionAvail}
              >
                <View
                  style={
                    Data.intensitas === "Jarang"
                      ? styles.optionSelected
                      : styles.option
                  }
                ></View>
                <Text style={styles.labelOption}>Jarang Berolahraga</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleInputChange("intensitas", "Sering")}
                style={styles.optionAvail}
              >
                <View
                  style={
                    Data.intensitas === "Sering"
                      ? styles.optionSelected
                      : styles.option
                  }
                ></View>
                <Text style={styles.labelOption}>Sering Berolahraga</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.subTitle}>Data Tambahan</Text>

            <View style={styles.inputGrouping}>
              <Text style={styles.label}>Berat Badan</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={Data.beratBadan}
                onChangeText={(value) => handleInputChange("beratBadan", value)}
              />
            </View>
            <View style={styles.inputGrouping}>
              <Text style={styles.label}>Tinggi Badan</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={Data.tinggiBadan}
                onChangeText={(value) =>
                  handleInputChange("tinggiBadan", value)
                }
              />
            </View>
            <View style={styles.inputGrouping}>
              <Text style={styles.label}>Umur</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={Data.umur}
                onChangeText={(value) => handleInputChange("umur", value)}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={calculateCalories}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          {/* Bagian Game Makan */}
          <View style={styles.gameContainer}>
            {/* Bagian Kalori */}
            <View style={styles.jumlahKalori}>
              <Text style={styles.title}>Kalori yang Dibutuhkan</Text>
              <Text style={styles.nominalKalori}>
                {caloriesNeeded} kkal/hari
              </Text>
              <Text style={styles.title}>
                Kalori yang Telah Terpenuhi Hari Ini
              </Text>
              <Text style={styles.nominalKalori}>
                {caloriesAccepted} kkal/hari
              </Text>
            </View>

            {/* Food Type */}
            <View style={styles.foodContainer}>
              {foodData.map((food, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.foodItem}
                  onPress={() => handleFoodClick(food.calories)}
                >
                  <Image source={food.image} style={styles.foodImage} />
                </TouchableOpacity>
              ))}
            </View>

            {/* Human */}
            <View style={styles.manusia}>
              <Image
                source={require("../assets/images/boy.png")}
                style={styles.manusiaImage}
              />
            </View>

            {/* Analysis Result */}
            <View style={styles.hasilAnalisa}>
              <Text style={styles.analysisText}>
                Berdasarkan makanan yang telah kamu makan hari ini,{" "}
                <Text style={styles.ubahState}>{statusKebutuhanKalori()}</Text>
              </Text>
            </View>

            {/* Buttons Used */}
            <View style={styles.opsiTombol}>
              <TouchableOpacity style={styles.button} onPress={handleReset}>
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.emptySpace2}></View>
          {/* CaloriFy History */}
          <Text style={styles.historyText2}>
            Mau tahu histori kalori kamu ?
          </Text>
          <View style={styles.historyContainer}>
            <TouchableOpacity style={styles.historyText}>
              <Text style={styles.buttonText}>
                <Link href="/history">CaloriFy History {">"}</Link>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Testimony Part */}
          <Text style={styles.containerTitel2}>Testimony</Text>
          <View style={styles.testimonyContainer}>
            <Text style={styles.testimonyPerson}>Person A</Text>
            <Text style={styles.testimonyText}>"Keren banget appnya!"</Text>
          </View>
          <View style={styles.testimonyContainer}>
            <Text style={styles.testimonyPerson}>Person B</Text>
            <Text style={styles.testimonyText}>"Game Changer man"</Text>
          </View>
          <View style={styles.testimonyContainer}>
            <Text style={styles.testimonyPerson}>Person c</Text>
            <Text style={styles.testimonyText}>
              "Functional! a great app for learning PE"
            </Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Anthony Bryant Gouw ( 18222033 ), Richie Leonardo ( 18222071 )
            </Text>
          </View>
          {/* <View style={styles.emptySpace}></View> */}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    backgroundColor: "#2d3250",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  navbarTitle1: {
    color: "#6f76a0",
    fontSize: 20,
    fontWeight: "bold",
  },

  navbarTitle2: {
    color: "#ff920c",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },

  imgDescription: {
    width: 280,
    height: 280,
    resizeMode: "contain",
    marginBottom: 16,
  },

  text1: {
    fontSize: 20,
    color: "#6f76a0",
    fontWeight: "bold",
    marginBottom: 10,
  },

  text2: {
    fontSize: 15,
    color: "#6f76a0",
    textAlign: "justify",
  },

  container: {
    backgroundColor: "#212434",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  container2: {
    width: 300,
    backgroundColor: "#2d3250",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    marginBottom: 50,
    padding: 15,
    borderRadius: 8,
  },

  containerMini: {
    flexDirection: "column",
    justifyContent: "center",
    width: 280,
    marginLeft: 25,
    marginBottom: 50,
  },

  containerTitel: {
    backgroundColor: "#ff920c",
    width: 100,
    color: "#2d3250",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 3,
    marginLeft: 15,
    padding: 4,
  },

  containerTitel2: {
    backgroundColor: "#ff920c",
    width: 100,
    color: "#2d3250",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 3,
    marginTop: 20,
    padding: 4,
  },

  containerTitel3: {
    backgroundColor: "#ff920c",
    width: 135,
    color: "#2d3250",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 3,
    marginTop: 20,
    padding: 4,
  },

  inputGrouping: {
    marginBottom: 16,
  },

  label: {
    color: "#7077a1",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#d9d9d9",
    color: "#2d3250",
    fontWeight: "bold",
    padding: 8,
    borderRadius: 8,
    width: 200,
  },

  subTitle: {
    color: "#ff920c",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
  },

  optionGrouping: {
    marginBottom: 16,
  },

  optionAvail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  option: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: 8,
  },

  optionSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ff920c",
    marginRight: 8,
  },

  labelOption: {
    color: "#fff",
  },

  jumlahKalori: {
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    color: "#ff920c",
    fontWeight: "bold",
    marginBottom: 8,
  },

  nominalKalori: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },

  foodContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },

  foodItem: {
    margin: 8,
  },

  foodImage: {
    width: 80,
    height: 80,
  },

  manusia: {
    alignItems: "center",
    marginBottom: 20,
  },

  manusiaImage: {
    width: 220,
    height: 320,
  },

  hasilAnalisa: {
    alignItems: "center",
    marginBottom: 20,
  },

  analysisText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
  },

  ubahState: {
    color: "#ff920c",
    fontWeight: "bold",
  },

  opsiTombol: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

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
    fontSize: 16,
    fontWeight: "bold",
  },

  gameContainer: {
    width: 300,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  historyContainer: {
    backgroundColor: "#7077a1",
    color: "#2d3250",
    padding: 10,
    marginVertical: 10,
  },

  historyText: {
    paddingLeft: 20,
  },

  historyText2: {
    color: "#7077a1",
    fontSize: 20,
    fontWeight: "bold",
  },

  emptySpace: {
    height: 150,
  },

  emptySpace2: {
    height: 40,
  },

  testimonyContainer: {
    backgroundColor: "#7077a1",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },

  testimonyPerson: {
    color: "#2d3250",
    fontWeight: "bold",
  },

  testimonyText: {
    color: "#2d3250",
  },

  footer: {
    backgroundColor: "#2d3250",
    height: 200,
    marginTop: 50,
    width: "100%",
  },

  footerText: {
    color: "#7077a1",
    margin: 20,
    width: 250,
  },
});
