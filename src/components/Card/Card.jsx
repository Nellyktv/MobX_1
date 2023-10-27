import { useEffect, useRef } from 'react';
import store from '../../store';
import styles from './Card.module.css';

const Card = ({id, english, transcription, russian, clickBtn, setClickBtn, countWords, arr, count}) => {
  const bntRef = useRef(null);

  const handleChange = () => {
    setClickBtn(!clickBtn);
    if (!arr.includes(id)) {
      arr.push(id);
      countWords();
    }
  };

  useEffect(() => {
    if (arr.includes(id)) {
      setClickBtn(!clickBtn);
    }

    bntRef.current.focus();
    // eslint-disable-next-line
  }, [id, bntRef])

  return (
    <div>
      <div className={styles.Card}>
        <p className={styles.wordStyle}>{english}</p>
        <p className={styles.transcriptionStyle}>{transcription}</p>

        {!clickBtn ? (
          <p className={styles.translateStyle}>{russian}</p>
        ) : (
          <button ref={bntRef} className={styles.buttonCheck} onClick={handleChange}>Проверить</button>
        )}

        <p>Изучено {count} из {store.wordsData.wordsList.length} </p>

      </div>
    </div>
  );
};

export default Card;
