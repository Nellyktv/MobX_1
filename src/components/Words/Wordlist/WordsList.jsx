import React, { useState } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import store from '../../../store';

import styles from './WordsList.module.css';

const russianLetterRegex = /[а-яёА-ЯЁ]/;
const englishWordRegex = /^[a-zA-Z]+$/;



const WordsList = observer(({ id, russian, transcription, english }) => {
  const [edit, setEdit] = useState(false);
  const [validationRus, setValidationRus] = useState(false);
  const [validationEng, setValidationEng] = useState(false);
  const [validationTranscription, setValidationTranscription] = useState(false);
  const [changeRussian, setChangeRussian] = useState('');
  const [changeEnglish, setChangeEnglish] = useState('');
  const [changeTranscription, setChangeTranscription] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [inpRedRus, setInpRedRus] = useState('');
  const [inpRedTrans, setInpRedTrans] = useState('');
  const [inpRedEng, setInpRedEng] = useState('');

  const handleChangeRussian = (e) => {
    setChangeRussian(e.target.value);
    setValidationRus(russianLetterRegex.test(e.target.value));

    if (russianLetterRegex.test(e.target.value)) {
      setChangeRussian(e.target.value);
      setInpRedRus('');
      setDisabledBtn(false);
    } else {
      setChangeRussian('');
      setInpRedRus(styles.redCellInp);
    }
  };

  const handleChangeEnglish = (e) => {
    setChangeEnglish(e.target.value);
    setValidationEng(englishWordRegex.test(e.target.value));

    if (englishWordRegex.test(e.target.value)) {
      setChangeEnglish(e.target.value);
      setInpRedEng('');
      setDisabledBtn(false);
    } else {
      setChangeEnglish('');
      setInpRedEng(styles.redCellInp);
    }
  };


  const handleChangeTranscription = (e) => {
    setChangeTranscription(e.target.value);

    if (!e.target.value?.length) {
      setInpRedTrans(styles.redCellInp);
    } else {
      setInpRedTrans('');
      setValidationTranscription(true);
      setDisabledBtn(false);
    }
  };

  const checkInpWordRus = () => {
    if (!changeRussian?.length) {
      setDisabledBtn(true);
      setInpRedRus(styles.redCellInp);
    } else {
      setValidationRus(true);
    }
  }

  const checkInpWordTrans = () => {
    if (!changeTranscription?.length) {
      setDisabledBtn(true);
      setInpRedTrans(styles.redCellInp);
    } else {
      setValidationTranscription(true);
    }
  }

  const checkInpWordEng = () => {
    if (!changeEnglish?.length) {
      setDisabledBtn(true);
      setInpRedEng(styles.redCellInp);
    } else {
      setValidationEng(true);
    }
  }

  const checkInpWord = () => {
    checkInpWordEng();
    checkInpWordTrans();
    checkInpWordRus();
  }

  const handleChangeCancel = () => {
    setEdit(!edit);
    setDisabledBtn(false);
    setInpRedRus('');
    setInpRedTrans('');
    setInpRedEng('');
    setChangeRussian('');
    setChangeEnglish('');
    setChangeTranscription('');
  };

  const onClickSave = () => {
    if (validationRus && validationTranscription && validationEng) {
      store.wordsData.addNewWordToApi(changeEnglish, changeTranscription, changeRussian);
    } else {
      checkInpWord();
    }
  }


  // const onClickSaveEdit = () => {
  //   console.log(changeEnglish,changeTranscription,changeRussian);

  //   if (validationRus && validationTranscription && validationEng) {
  //     store.wordsData.change(changeRussian,changeEnglish,changeTranscription);
  //   } else {
  //     checkInpWord();
  //   }
  // }

  if (edit === false) {
    return (
      <div>
        <div className={styles.WordsList}>
          <div className={classNames(`${styles.cell} ${styles.name}`)}>{id}</div>

          <div className={styles.cell}>{russian}</div>

          <div className={styles.cell}>{transcription}</div>

          <div className={styles.cell}>{english}</div>

          <div className={styles.cell}>
            <button className={classNames(`${styles.buttonEdit} ${styles.buttonsChange}`)}
              onClick={handleChangeCancel}>Edit</button>
            <button className={classNames(`${styles.buttonSave} ${styles.buttonsChange}`)}>Save</button>
            <div className={styles.cell}><button className={classNames(`${styles.buttonDelAll} ${styles.buttonsChange}`)} onClick={() => store.wordsData.delete(id)}>Delete</button></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.WordsList}>
        <div className={classNames(` ${styles.cell} ${styles.name}`)}>{id}</div>

        <input
          type='text'
          value={changeRussian}
          onChange={handleChangeRussian}
          className={classNames(` ${styles.name} ${inpRedRus}`)}
        />

        <input
          type='text'
          value={changeTranscription}
          onChange={handleChangeTranscription}
          className={classNames(` ${styles.name} ${inpRedTrans}`)}
        />
        <input
          type='text'
          value={changeEnglish}
          onChange={handleChangeEnglish}
          className={classNames(` ${styles.name} ${inpRedEng}`)}
        />

        <div className={styles.cell}>
          <button
            className={classNames(` ${styles.buttonsChange} ${styles.buttonDel}`)}
            onClick={handleChangeCancel}
          >
            Отмена
          </button>

          <div className={styles.cell}><button className={classNames(`${styles.buttonDelAll} ${styles.buttonsChange}`)}>Delete</button></div>

          {disabledBtn ? (
            <button
              className={classNames(`${styles.buttonDisabled} ${styles.buttonsChange}`)}
              onClick={checkInpWord}
              disabled={disabledBtn}
            >
              Save
            </button>
          ) : (
            <button
              className={classNames(`${styles.buttonSave} ${styles.buttonsChange}`)}
              onClick={onClickSave}
            >
              Save
            </button>

          )}
        </div>
      </div>
    );
  }
});

export default WordsList;
