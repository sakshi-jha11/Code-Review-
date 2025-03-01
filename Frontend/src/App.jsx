import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'prismjs/themes/prism-tomorrow.css'; // Correct spelling
import Editor from "react-simple-code-editor"
import axios from 'axios'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

 

import prism from 'prismjs'

function App() {
  const [count, setCount] = useState(0)
  const [code,setCode] = useState(`
                function sum(){
                return 1+1;
                }`)

  useEffect(() => {
    prism.highlightAll()

  })

  const [review, setReview] = useState('');

  async function reviewCode() {
    try {
      // Check if code is defined
      if (!code) {
        console.error('No code provided for review');
        return;
      }
  
      // Make the POST request
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
  
      // Assuming you have set up the state for review like: const [review, setReview] = useState('');
      setReview(response.data); // Set the review response in state
  
      console.log(response.data); // Log the response data
  
    } catch (error) {
      // Handle errors gracefully
      console.error('Error occurred while reviewing the code:', error);
    }
  }
  



  return (
    <>
    <main>
      <div className="left">
        <div className="code"> 
       <Editor value= {code}
       onValueChange={code => setCode(code)}
       highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
       padding={10}
       style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
        border: "1px solid #ddd",
        borderRadius: "5px",
        height: "100%",
        width: "100%"
       }}
       
       />
        </div>
          <div className="review"
          onClick={reviewCode}>
            Review
          </div>
      </div>
      <div className="right">
       <Markdown
       rehypePlugins={[rehypeHighlight]}
       >{review}</Markdown>
      </div>
    </main>
    </>
  )
}

export default App
