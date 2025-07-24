import { useEffect, useState } from "react"

export default function BackgroundScroller() {
  const [rowsData, setRowsData] = useState([])

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => {
        const memes = data.data.memes.slice(0, 100) // Get 100 memes
        const chunkSize = 16
        const chunks = []

        for (let i = 0; i < memes.length; i += chunkSize) {
          const chunk = memes.slice(i, i + chunkSize).map(meme => meme.url)
          chunks.push(chunk)
        }

        setRowsData(chunks.slice(0, 6)) // Use only 6 rows
      })
  }, [])

  return (
    <div className="bg-scroller">
      {rowsData.map((rowMemes, rowIndex) => (
        <div className="bg-row" key={rowIndex}>
          {[...rowMemes, ...rowMemes].map((url, index) => (
            <img key={index} src={url} alt="" loading="lazy" />
          ))}
        </div>
      ))}
    </div>
  )
}