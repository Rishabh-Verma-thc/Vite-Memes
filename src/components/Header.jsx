import thisIsFine from "../assets/meme_this_is_fine_dog.png"

export default function Header() {
    return(
        <header className="header">
            <a href="https://github.com/Rishabh-Verma-thc/Vite-Memes.git" target="_blank"><img src={thisIsFine} /></a>
            <h1>Meme Generator</h1>
        </header>
    )
}