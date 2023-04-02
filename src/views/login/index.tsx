import './login.scss';
import LoginBg from '../../assets/img.png';
import Logo from '../../assets/logo.png';
import LoginForm from './components/loginForm';

const styleLoginBg = {
  backgroundImage:`url(${LoginBg})`,
  backgroundRepeat:'no-repeat',
  backgroundSize: 'cover'
}
function Login(){
  return (
    <div className="login-container" style={styleLoginBg}>
      <div className="login-wrap">
        <div className="login-form">
          <img src={Logo} alt="Croix Rouge"/>
        <h1>Login</h1>
          <LoginForm />
        </div>
      </div>


    </div>
  )
}

export default Login

