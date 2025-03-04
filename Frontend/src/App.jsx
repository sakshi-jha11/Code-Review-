import { useState, useEffect } from 'react'
import './App.css'
import 'prismjs/themes/prism-tomorrow.css'
import Editor from "react-simple-code-editor"
import axios from 'axios'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import prism from 'prismjs'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(`function sum(){
  return 1+1;
}`)


const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  })

  const [review, setReview] = useState('')

  async function reviewCode() {
    try {
      if (!code) {
        console.error('No code provided for review')
        return
      }

      setIsLoading(true)

      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error occurred while reviewing the code:', error)
    }finally {
      // Ensure loading is set to false even if there's an error
      setIsLoading(false)
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div 
            className="code"
            style={{
              height: '100%', // Fixed height
              overflowY: 'auto', // Enable vertical scrolling
              border: '1px solid #ddd',
              borderRadius: '5px'
            }}
          >
            <Editor 
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                minHeight: '100%', // Ensure the editor can expand
                width: '100%'
              }}
            />
          </div>
          <div 
  className="review"
  onClick={reviewCode}
>
  Review Code
</div>
        </div>
        <div className={`right ${isLoading ? 'loading' : ''}`}>
          <Markdown
            rehypePlugins={[rehypeHighlight]}
          >
            {review}
          </Markdown>
        </div>
      </main>
    </>
  )
}

export default App