import { useState } from 'react'
import Card from './Card';
import styles from './Card.module.css';
import classNames from 'classnames';
import store from '../../store';

const CardWords = () => {
  const [indexCard, setIndexCard] = useState(0);
  const [clickBtn, setClickBtn] = useState(true);
  const [count, setCount] = useState(0);
  let [arr, setArr] = useState([]);
  // eslint-disable-next-line
  const [buttonActive, buttonDeactivation] = useState('enable');

  let disabledBtn = () => {
    buttonDeactivation('disable');
  }

  let next = () => {
    if (indexCard < store.wordsData.wordsList.length - 1) {
      setIndexCard(indexCard + Number(1));
    }
    setClickBtn(true);
  };

  const prev = () => {
    if (indexCard === 0) {
      setIndexCard(store.wordsData.wordsList.length - 1);

    } else if (indexCard > 0) {
      setIndexCard(indexCard - 1);

    }
    setClickBtn(true);
  };

  const countWords = () => {
    if (count !== store.wordsData.wordsList.length - 1) {
      setCount(count + 1);
    }
  };

  const newGame = () => {
    setIndexCard(0);
    setClickBtn(true);
    arr = [];
    setCount(0);
  }

  let stylePrevBtn = styles.nextprevbtn;

  return (
    <div className={styles.containercard}>

      {indexCard !== 0 ? (
        <button className={classNames(`${styles.nextprevbtn} ${styles.prev}`)} onClick={prev}>Назад</button>
      ) : ''}

      <Card
        id={store.wordsData.wordsList[indexCard].id}
        english={store.wordsData.wordsList[indexCard].english}
        transcription={store.wordsData.wordsList[indexCard].transcription}
        russian={store.wordsData.wordsList[indexCard].russian}
        clickBtn={clickBtn}
        setClickBtn={setClickBtn}
        countWords={countWords}
        arr={arr}
        setArr={setArr}
        count={count}
      />

      {indexCard === store.wordsData.wordsList.length - 1 ? stylePrevBtn = styles.btnCardsLengthEnd : ''}
      {indexCard === store.wordsData.wordsList.length - 1 ? next = disabledBtn : ''}

      <button className={classNames(`${stylePrevBtn} ${styles.next}`)} onClick={next}>Вперед</button>

      {indexCard === store.wordsData.wordsList.length - 1 ? (
        <button className={classNames(`${styles.nextprevbtn} ${styles.newGame}`)} onClick={newGame}>Начать игру
          заново</button>
      ) : ''}
    </div>
  )
}

export default CardWords;
