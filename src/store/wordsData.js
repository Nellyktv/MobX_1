import { makeAutoObservable } from 'mobx';
import axios from "axios";

class WordsData {
  wordsList = [];
  isLoading = true;
  foundErr = false;

  constructor() {
    makeAutoObservable(this);
  }

  getDataFromApi = async () => {
    this.foundErr = false;
    this.isLoading = true;
  
    try {
      const data = await axios.get('http://itgirlschool.justmakeit.ru/api/words');
      this.wordsList = data.data;
      this.isLoading = false;
      // console.log(data.data);
    } catch (err) {
      this.isLoading = false;
      this.foundErr = true;
      console.log(`Извините,произошла ошибка,попробуйте позже. Подробнее: ${err}`)
    }
  }

addNewWordToApi = async (engNewWord, transcriptionNewWord, rusNewWord) => {
  const lastWordId = this.wordsList[this.wordsList?.length - 1].id;
  const newWordId = Number(lastWordId) + 1;
  let newWordAdd = {
    id: newWordId,
    english: engNewWord,
    transcription: transcriptionNewWord,
    russian: rusNewWord,
  };

  const res = await axios.post('http://itgirlschool.justmakeit.ru/api/words/add', JSON.stringify(newWordAdd));

  console.log(res);

  try{console.log(newWordAdd);
  }
  catch(err){
  console.log(err)
  }
}


  add = (engNewWord, transcriptionNewWord, rusNewWord) => {
    const lastWordId = this.wordsList[this.wordsList?.length - 1].id;
    const newWordId = Number(lastWordId) + 1;
     this.wordsList.push({
      id: newWordId,
      english: engNewWord,
      transcription: transcriptionNewWord,
      russian: rusNewWord,
    })
  
  }


  // change = async(engNewWord,transcriptionNewWord, rusNewWord) =>{

  //   // let idOfObject = this.wordsList.find((item) => item.id === id);
  //   // let wordIdDel = idOfObject.id;
  
  //   let changeWord = ({
  //     english: engNewWord,
  //     transcription: transcriptionNewWord,
  //     russian: rusNewWord,
  //   })

  //   // console.log(changeWord);

  //   try {
  //     const response = await axios.post('http://itgirlschool.justmakeit.ru/api/words/14656/update', JSON.stringify(changeWord));

  //     console.log(response.data); 
  //     } catch (error) {
  //     console.error(error);
  //     }

  // }


  delete = async(id) =>{

    let idOfObject = this.wordsList.find((item) => item.id === id);
    let wordIdDel = idOfObject.id;
    console.log(wordIdDel)
   
    try {
      const response = await axios.post(`http://itgirlschool.justmakeit.ru/api/words/  ${wordIdDel}  /delete`, JSON.stringify(idOfObject));
      
      console.log(response.data); 
      } catch (error) {
      console.error(error);
      }
    }
   
    }
    
  

export default WordsData;
