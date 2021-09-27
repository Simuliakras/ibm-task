import AnnotatedImage from "./components/AnnotatedImage";
import Header from "./components/Header";
import UploadInput from "./components/UploadInput";
import "./styles/App.scss"

function App() {
  return (
    <div className="App">
      <Header />
      <UploadInput />
      <AnnotatedImage />
    </div>
  );
}

export default App;
