import React from 'react';
import logo from './logo.svg';
import './App.css';
import {toPng} from 'html-to-image'

const memeSize : number[] = [240,480,512,600,768,1024]

export default function App() {
  const [image, setImage] = React.useState<string>("")
  const [finished, setFinished] = React.useState<boolean>(false)
  const [size, setSize] = React.useState<number>(600)
  const [meme, setMeme] = React.useState<string>("")
  const [memeFontSize, setMemeFontSize] = React.useState<number>(1)

  const change = (e:any) : void => e.target.files[0] && setImage(URL.createObjectURL(e.target.files[0]))
  
  const downloadImage = () => {
    let meme = document.getElementById("meme")
    meme && toPng(meme).then((content) => {
      setImage(content)
      setFinished(true)
    })
  }
  
  return (
    <div>
      {memeSize.map((s:number,i:number) => (
        <button key={i} onClick={() => {setSize(s); setMemeFontSize(i+1)}}> {s} </button>
      ))}
      <input type="file" onChange={change}/>
      <input type="text" value={meme} onChange={(e) => setMeme(e.target.value.toUpperCase())}/>
      <div id="meme" className="meme-bg" style={{
        backgroundImage:`url(${image})`, 
        width:size, 
        height:size, 
        backgroundRepeat:'no-repeat', 
        backgroundSize:'cover',
        backgroundPositionX:'center',
        backgroundPositionY:'center',
        fontSize:`${memeFontSize * 1.25}rem`
      }}>
        {!finished && <p> {image && meme && meme} </p>}
      </div>
      <button onClick={downloadImage}> finished </button>
      {finished && <a href={image} type='image/png' download> download </a>}
    </div>
  );
}