import Header from "./components/Header.jsx"
import Main from "./components/Main.jsx"
import Footer from "./components/Footer.jsx"
import BackgroundScroller from "./components/BackgroundScroller.jsx";

export default function App() {
  return(
    <div className="page-wrapper">
      <BackgroundScroller />
      <article className="app-container">
        <Header />
        <Main />
      </article>
      <Footer />
    </div>
    
  )
}