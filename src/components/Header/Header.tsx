import './Header.css';
import Logo from '../../assets/img/LOGO_Demic.png';

const Header = () => {
    return (
        <header>
            <img src={Logo} />
            <h3>
                Líder mundial en la producción de
                componentes elastoméricos de precisión
            </h3>
        </header>
    )
}

export default Header;
