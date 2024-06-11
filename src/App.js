import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [width,setwidth]=useState('');
  const [height,setheight]=useState('');
  const [link,setlink]=useState('');
  const [fullpage,setfullpage]=useState(false);
  const [mobile,setmobile]=useState(false);
  const [image,setimage]=useState(null);
  function onchange_url(event){
    setlink(event.target.value);
  }
  function onchange_width(event){
    setwidth(event.target.value);
  }
  function onchange_height(event){
    setheight(event.target.value);
  }
  function onchange_fullpg(event){
    setfullpage(event.target.checked);
  }
  function onchange_mob(event){
    setmobile(event.target.checked);
  }
  function new_search(){
    setimage(null);
  }

  function search(){
      axios.post('http://localhost:3001/screenshot',{
        "url":link,
        "screen_width":width,
        "screen_height":height,
        "ismobile":mobile,
        "fullpage":fullpage
    },{
      responseType: 'blob' // Important to specify responseType as blob
    }).then(
      (res)=>{
        // const imageBlob = res.blob();
        const imageObjectURL = URL.createObjectURL(res.data);
        setimage(imageObjectURL)
      }
    )
    
  }
  return (
    <div className="App">
      {image ? <>
      <button class="material-symbols-outlined" onClick={new_search}>
      arrow_back_ios
      </button>
<img src={image} width="100%"/></>: 
      <div className='search'>
        <h3>How Does This Website Look Like?</h3>
        <h4>Check here</h4>
        
        <input type='text' placeholder='URL https://...' onChange={onchange_url} value={link}/>
        <input type='text' placeholder='Width' onChange={onchange_width} value={width}/>
        <input type='text' placeholder='Height' onChange={onchange_height} value={height}/>
        <div>
        <label for="fullp">FullPage?</label>
        <input type='checkbox' checked={fullpage} name='fullp' onChange={onchange_fullpg}/></div>
        <div>
        <label for="mobile">Mobile?</label>
        <input type='checkbox' checked={mobile} name='mobile' onChange={onchange_mob}/></div>
        <button className='search_button' onClick={search}>Search</button>
      </div>}
  
    </div>
  );
}

export default App;
