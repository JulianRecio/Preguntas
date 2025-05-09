import {useEffect, useRef, useState} from "react"
import {View, Text, Button, Modal, StyleSheet, ScrollView} from "react-native"
import {Questions} from "./Questions";

export default function App() {
  const [questionVisible, setQuestionVisible] = useState(false);
  const [questionId, setQuestionId] = useState(0);
  const [questionText, setQuestionText] = useState('');
  const [deck, setDeck] = useState(Questions);
  const [index, setIndex] = useState(0);
  const [favoriteList, setFavoriteList] = useState([]);
  const [favoritesVisible, setFavoritesVisible] = useState(false);


    let favoritesId = useRef([]);

    const shuffleDeck = () => {
        const shuffledDeck = [...Questions]
        for (let i = shuffledDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
        }
        setDeck(shuffledDeck)
        console.log("Deck shuffled")
    }

    const drawQuestion = () => {
        const question = deck[index];
        setQuestionId(question.id);
        setQuestionText(question.text);
    }

    const saveForFavorites = () => {
        favoritesId.current.push(questionId);
        console.log("Pregunta guardada: " + questionId);
    }

    const showFavorites = () => {
        const favoriteQuestions = deck.filter(q => favoritesId.current.includes(q.id))
        setFavoriteList(favoriteQuestions);
        favoritesId.current.forEach(id => {
            console.log(id);
        });
    }

    useEffect(() => {
        shuffleDeck();
    }, []);


    const displaySavedCard = (id, text) => {
        setQuestionId(id);
        setQuestionText(text);
    }

    return(
      <View style={styles.TherapyBackground}>
          <View style={styles.TitleContainer}><Text style={styles.TitleText}>Terapia</Text></View>

          <Button title="Nueva pregunta" onPress={() => {
              drawQuestion();
              setQuestionVisible(true);
          }}></Button>

          <Button title="Ver favoritos" onPress={() => {
              showFavorites();
              setFavoritesVisible(true);
          }}></Button>

          <Modal visible={questionVisible}
                 onRequestClose={() => setQuestionVisible(false)}
                 animationType="slide"
                 presentationStyle="pageSheet">
              <View style={styles.CardBackground}>
                  <View style={styles.CardContainer}></View>
                  <Text style={styles.CardText}>{questionId}.</Text>
                  <Text style={styles.CardText}>{questionText}</Text>
                  <Button title="Agregar a Favoritos" onPress={() => {
                      saveForFavorites();
                      console.log(favoritesId)
                  }}></Button>
                  <Button title="Volver a la anterior" onPress={() => {

                  }
                  }
                  ></Button>
                  <Button title="Cerrar" onPress={() => {
                      console.log("Card returned!");
                      setQuestionVisible(false)
                  }}></Button>
              </View>
          </Modal>

          <Modal visible={favoritesVisible}
                 onRequestClose={() => setFavoritesVisible(false)}
                 animationType="slide"
                 presentationStyle="pageSheet">

              <View style={styles.FavoritesBackground}>

                  <ScrollView style={{flex: 1}}>
                      {favoriteList.length > 0 ? (
                          favoriteList.map((fav, idx) => (
                              <View key={idx} style={styles.FavoriteBox}>
                                  <Text style={styles.FavoriteText} numberOfLines={2} ellipsizeMode="tail" onPress={() =>
                                    {
                                        displaySavedCard(fav.id, fav.text)
                                        setQuestionVisible(true)
                                    }
                                  }>
                                      {fav.id}. {fav.text}
                                  </Text>

                                  <Modal visible={questionVisible}
                                         onRequestClose={() => setQuestionVisible(false)}
                                         animationType="slide"
                                         presentationStyle="pageSheet">
                                      <View style={styles.CardBackground}>
                                          <View style={styles.CardContainer}></View>
                                          <Text style={styles.CardText}>{questionId}.</Text>
                                          <Text style={styles.CardText}>{questionText}</Text>
                                          <Button title="Agregar a Favoritos" onPress={() => {
                                              saveForFavorites();
                                              console.log(favoritesId);
                                          }}></Button>
                                          <Button title="Cerrar" onPress={() => {
                                              console.log("Card returned!");
                                              setQuestionVisible(false);
                                          }}></Button>
                                      </View>
                                  </Modal>
                              </View>
                          ))
                      ) : (
                          <Text style={styles.CardText}>No hay favoritos aún.</Text>
                      )}
                  </ScrollView>
                  <Button title="Cerrar" onPress={() => {
                      console.log("Favs closed");
                      setFavoritesVisible(false);
                  }}></Button>
              </View>
          </Modal>
      </View>
  )
}


const styles = StyleSheet.create({
    TherapyBackground: {flex: 1, backgroundColor: "plum", padding: 60, display: "flex", justifyContent: "space-evenly"},
    TitleContainer: {width: "100%", height:"15%", justifyContent: "center", alignItems: "center"},
    TitleText: { textAlign: 'center', textAlignVertical: 'center', fontSize: 80},
    CardBackground: {flex: 1, backgroundColor: "white", padding: 60, display: "flex",justifyContent: "space-between"},
    CardContainer: {width: "100%", justifyContent: "center", alignItems: "center"},
    CardText: { textAlign: 'center', textAlignVertical: 'center', fontSize: 40},
    FavoritesBackground: {flex:1, backgroundColor: "white", display: "flex", justifyContent: "space-evenly"},
    FavoriteBox: {  borderTopWidth: 2, borderTopColor: 'Black', paddingVertical: 15, paddingHorizontal: 10, justifyContent: 'center'},
    FavoriteText: { fontSize: 25, textAlign: 'center',},
})