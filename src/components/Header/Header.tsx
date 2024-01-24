import './Header.css';
import Logo from '../../assets/img/LOGO_Demic.png';
import SecondLogo from '../../assets/img/SegundoLogo.jpeg'; 

const Header = () => {
    return (
        <header>
            <div className='header-logos-container'>
            <img src={SecondLogo} alt="Second Logo" />
            <img src={Logo} alt="Main Logo" />
            </div>
            
            <h3>
                Líder mundial en la producción de
                componentes elastoméricos de precisión
            </h3>
        </header>
    )
}

export default Header;
