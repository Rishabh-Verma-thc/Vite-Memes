import { useState, useEffect, useRef } from "react"
import html2canvas from "html2canvas"
import Draggable from 'react-draggable'

export default function Main() {

    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk in the Mordor",
        imgURL: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = useState([])

    const memeRef = useRef(null)
    const fileInputRef = useRef(null)

    const topTextRef = useRef(null)
    const bottomTextRef = useRef(null)

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(result => result.json())
            .then(data => setAllMemes(data.data.memes))
    },[])

    function handleChange(event) {
        const { name, value } = event.currentTarget
        setMeme(prevMeme => ({...prevMeme,
            [name]: value
        }))
    }

    function getMemeImg() {
        const randomNo = Math.floor(Math.random() * allMemes.length)
        const newMemeURL = allMemes[randomNo].url
        setMeme(prevMeme => ({
            ...prevMeme,
            imgURL: newMemeURL
        }))
    }

    function downloadMeme() {
        if(!memeRef.current) return;

        html2canvas(memeRef.current,{
            useCORS: true,
            allowTaint : false,
            logging: true
        })
            .then(canvas => {
                const link = document.createElement("a")
                link.download = "meme.png"
                link.href = canvas.toDataURL("image/png")
                link.click()
            })
    }

    function uploadMeme(event) {
        const file = event.target.files[0]
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMeme(prevMeme => ({
                    ...prevMeme,
                    imgURL: reader.result
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    return(
        <main>
            <div className="form">
                <label>Top Text
                <input 
                    type="text"
                    placeholder="One does not simply"
                    name="topText"
                    id="topText"
                    value={meme.topText}
                    onChange={handleChange}
                    autoComplete="off"
                />
                </label>

                <label>Bottom Text
                <input 
                    type="text"
                    placeholder="Walk into Mordor"
                    name="bottomText"
                    id="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                    autoComplete="off"
                />
                </label>
                <button onClick={getMemeImg}>Get a new meme image 🖼</button>
            </div>

            <input 
                type="file"
                accept="image/*"
                onChange={uploadMeme}
                ref={fileInputRef}
                style={{ display: "none" }} 
            />
            <button className="uploadBtn" onClick={() => fileInputRef.current.click()}>Upload your own image ⬆️</button>

            <div className="meme" ref={memeRef}>
                <img src={meme.imgURL} crossOrigin="anonymous" alt="meme"/>
                <Draggable nodeRef={topTextRef} bounds="parent" defaultPosition={{ x: 0, y: 0 }}>
                    <span ref={topTextRef} className="draggable-text top">
                        {meme.topText}
                    </span>
                </Draggable>

                <Draggable nodeRef={bottomTextRef} bounds="parent" defaultPosition={{ x: 0, y: 0 }}>
                    <span ref={bottomTextRef} className="draggable-text bottom">
                        {meme.bottomText}
                    </span>
                </Draggable>
            </div>

            <button className="downloadBtn" onClick={downloadMeme}>Download Meme ⬇️</button>
        </main>
    )
}