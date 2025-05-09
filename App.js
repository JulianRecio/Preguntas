import {useRef, useState} from "react"
import {View, Text, Button, Modal, StyleSheet} from "react-native"
import {questions} from "./questions";

export default function App() {
  const [questionVisible, setQuestionVisible] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0)
  const [question, setQuestion] = useState('');

    const pickQuestion = () => {
      const index = Math.floor(Math.random() * questions.length);
      setQuestionIndex(index);
      setQuestion(questions[index]);
    }

    let favoritesId = useRef([]);

    const saveForFavorites = () => {
        favoritesId.current.push(questionIndex);
        console.log("Pregunta guardada: " + questionIndex);
    }

    const showFavorites = () => {
        favoritesId.current.forEach(id => {
            console.log(id);
        });
    }

    return(
      <View style={styles.TherapyBackground}>
          <View style={styles.TitleContainer}><Text style={styles.TitleText}>Terapia</Text></View>


          <Button title="Nueva pregunta" onPress={() => {
              pickQuestion();
              setQuestionVisible(true);
          }}></Button>

          <Button title="Ver favoritos" onPress={() => {
              showFavorites();
          }}></Button>

          <Modal visible={questionVisible}
                 onRequestClose={() => setQuestionVisible(false)}
                 animationType="slide"
                 presentationStyle="pageSheet">
              <View style={styles.CardBackground}>
                  <View style={styles.CardContainer}></View>
                  <Text style={styles.CardText}>{question}</Text>
                  <Button title="Agregar a Favoritos" onPress={() => {
                      saveForFavorites();
                      console.log(favoritesId)
                  }}></Button>
                  <Button title="Cerrar" onPress={() => {
                      console.log("Card returned!");
                      setQuestionVisible(false)
                  }}></Button>
              </View>
          </Modal>
      </View>
  )
}


const styles = StyleSheet.create({
    TherapyBackground: {flex: 1, backgroundColor: "plum", padding: 60, display: "flex",justifyContent: "space-evenly"},
    TitleContainer: {width: "100%", height:"15%", justifyContent: "center", alignItems: "center"},
    TitleText: { textAlign: 'center', textAlignVertical: 'center', fontSize: 80},
    CardBackground: {flex: 1, backgroundColor: "white", padding: 60, display: "flex",justifyContent: "space-between"},
    CardContainer: {width: "100%", justifyContent: "center", alignItems: "center"},
    CardText: { textAlign: 'center', textAlignVertical: 'center', fontSize: 40}
})