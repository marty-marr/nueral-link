
import './App.css'
import WelcomeScreen from "./components/WelcomeScreen.tsx";
import Home from "./pages/Home.tsx";
import LoginForm from "./components/LoginForm.tsx";


function App() {


  return (
    <>
        <LoginForm/>
      <WelcomeScreen />

        <Home />

    </>
  )
}

export default App
