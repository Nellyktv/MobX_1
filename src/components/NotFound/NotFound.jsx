import { Link } from 'react-router-dom';
import notFoundCat from './NotFoundCat.png';

import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container_notfound}>
      <h1 className={styles.title_notfound}>404</h1>

      <p className={styles.text}>Page not found</p>

      <img src={notFoundCat} className={styles.img} alt="404Cat"/>

      <Link className={styles.link} to="/"> Go to the homepage</Link>
    </div>
  )
}

export default NotFound;
