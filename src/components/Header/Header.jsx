import styles from './Header.module.css';
import img from '../../../public/assets/icon.png';
import LightMode from '../LightMode/LightMode.jsx';
import { Link } from 'react-router-dom';


export default function Header(props) {
    return(
        <header className={styles.headerEl}>
            <img src={img} alt="TallyX Logo" className={styles.logoImg}/>
            <Link to={props.address.to} className={`${styles.titleLink} material-icons`}>{props.address.name}</Link>
            < LightMode />
        </header>
    )
}