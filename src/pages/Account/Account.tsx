import Header from '../../components/Header/Header'
import Title from '../../components/Title/Title'
import "./Account.css"

export const Account = () => {


    function isAdmin() {

        return (
            <section className='admin-account'>
                <form className='admin-account-form'>
                    <label >
                        E-mail:
                        <input type='email' name='admin-email' id='admin-email' placeholder='example@gmail.com' />
                    </label>
                    <label>
                        Contraseña:
                        <input type='password' name='admin-password' id='admin-password' placeholder='*******'/>
                    </label>
                    <label>
                        Nombre:
                        <input type='text' name='admin-name' id='admin-name' placeholder='nombre' />
                    </label>
                   
                </form>
            </section>
        )
    }

    return (
        <>
            <Header />
            <Title text='Cuenta' />
            {isAdmin()}

        </>
    )
}
