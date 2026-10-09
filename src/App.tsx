
import './App.css'
import WelcomeScreen from "./components/WelcomeScreen.tsx";
import HackScreen from "./components/HackScreen.tsx";
import SuccessScreen from "./components/SuccessScreen.tsx";
import LoginForm from "./components/LoginForm.tsx";
import FailedScreen from "./components/FailedScreen.tsx";
import {useState} from "react";
import InjectionScreen from "./components/InjectingScreen.tsx";


function App() {
    const [screen, setScreen] = useState('injecting');


  return (
    <>
        {screen === 'injecting' && (
            <InjectionScreen onComplete={() => setScreen('hack')} />
        )}

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
