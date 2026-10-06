
import './App.css'
import WelcomeScreen from "./components/WelcomeScreen.tsx";
import HackScreen from "./components/HackScreen.tsx";
import SuccessScreen from "./components/SuccessScreen.tsx";
import LoginForm from "./components/LoginForm.tsx";
import FailedScreen from "./components/FailedScreen.tsx";
import {useState} from "react";


function App() {
    const [screen, setScreen] = useState('hack');


  return (
    <>
        {screen === 'hack' && (
            <HackScreen onComplete={() => setScreen('success')} onFail={() => setScreen('fail')} />
        )}

        {screen === 'success' && (
            <SuccessScreen onComplete={() => setScreen('login')} />
        )}

        {screen === 'login' && (
            <LoginForm  onComplete={() => setScreen('welcome')} />
        )}

        {screen === 'welcome' && (
            <WelcomeScreen />
        )}

        {screen === 'fail' && (
            <FailedScreen />
        )}

    </>
  )
}

export default App
