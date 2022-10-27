const App = () => {
  const initialState = `This is a paragraph

  # This is a h1
  ## This is a h2

  **This is a bolded text**

  > Block Quotes!

  - list Item 1
  - list Item 2
  - list Item 3

  [FreeCodeCamp](www.freecodecamp.com)

  This is a inline \`<div></div>\`

  This is a block of code:
  \`\`\`
  <h1>Hi!</h1>
  <p>Freecodecamp is awesome</p>
  \`\`\`

  ![React](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png)
    `
  const [text, setText] = React.useState(initialState)

  const handleText = (e) => {
    setText(e.target.value)
  }
  console.log(text)
  return (
    <div className="container-fluid">
      <div id="header" className="row text-center py-1 text-white mb-4">
        <h1 className="col">Markdown Previewer</h1>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="col-10 col-lg-11 mx-auto">
            <p className="text-center">MARKDOWN</p>
            <textarea onChange={handleText} className="form-control" id="editor" value={text}></textarea>
          </div>
        </div>
        <div className="col-12 col-lg-6 my-4 my-lg-0">
          <div className="col-10 col-lg-11 mx-auto">
            <p className="text-center">PREVIEW</p>
            <Preview text={text} />
          </div>
        </div>
      </div>
    </div>
  )
}

const Preview = ({ text }) => {
  const markdown = marked.parse(text, {breaks: true})
  return (
    <div dangerouslySetInnerHTML={{__html: markdown}} id="preview" className="form-control">
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />)
