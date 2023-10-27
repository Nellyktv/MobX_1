import { useEffect } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import store from '../../store';
import WordsList from './Wordlist/WordsList';
import Spinner from '../Spinner/Spinner';
import styles from './Wordlist/WordsList.module.css';

const Words = observer(() => {
  useEffect(() => {
    store.wordsData.getDataFromApi();
  }, [])



  return (
    <>

      <div className={styles.App}>

        {store.wordsData.isLoading ? (
          <Spinner />
        ) : (
          <>
            {
              store.wordsData.foundErr ? (
                <p className={styles.load}>Произошла ошибка,попробуйте позже</p>
              ) : (
                <>
                  <h1 className={styles.title}>Список слов</h1>
                  <div className={styles.WordsList}>
                    <div className={classNames(`${styles.cell} ${styles.name}`)}>№</div>

                    <div className={classNames(`${styles.cell} ${styles.name}`)}>Слово</div>

                    <div className={classNames(`${styles.cell} ${styles.name}`)}>Транскрипция</div>

                    <div className={classNames(`${styles.cell} ${styles.name}`)}>Перевод</div>

                    <div className={classNames(`${styles.cell} ${styles.name}`)} />
                  </div>



                  {store.wordsData.wordsList.map((words, index) =>
                    <WordsList
                      key={index}
                      id={words.id}
                      english={words.english}
                      transcription={words.transcription}
                      russian={words.russian}
                      index={index}
                    />
                  )}
                </>
              )}
          </>
        )}
      </div>
    </>
  )
})
export default Words;
