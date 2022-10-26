const Preloader = () => {
  return (
    <div className="lds-hourglass"></div>
  )
}

const App = () => {

  const [quotes, setQuotes] = React.useState('')
  const [randomQuote, setRandomQuote] = React.useState('')
  const [randomColor, setRandomColor] = React.useState('')
  const [isHover, setIsHover] = React.useState(false)
  const [isHoverLink, setIsHoverLink] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const getQuotes = async () => {
      const response = await fetch('https://type.fit/api/quotes')
      const data = await response.json();
      setQuotes(data)

      const randomIndex = Math.floor(Math.random() * data.length)
      const randomIndexColors = Math.floor(Math.random() * colors.length)
      setRandomQuote(data[randomIndex])
      setRandomColor(colors[randomIndexColors])
      setLoading(false)
    }
    getQuotes();
  }, [])

  const getNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setRandomQuote(quotes[randomIndex])
    const randomIndexColors = Math.floor(Math.random() * colors.length)
    setRandomColor(colors[randomIndexColors])
  }

  const linkTwitter = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22${encodeURIComponent(randomQuote.text)}%22%20${encodeURIComponent(randomQuote.author)}`

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  const handleMouseEnterLink = () => {
    setIsHoverLink(true)
  }

  const handleMouseLeaveLink = () => {
    setIsHoverLink(false)
  }

  const buttonStyle = {
    backgroundColor: isHover ? 'transparent' : randomColor,
    borderColor: randomColor,
    color: isHover ? randomColor : '#FFF'
  }

  const linkStyle = {
    backgroundColor: isHoverLink ? 'transparent' : randomColor,
    borderColor: randomColor,
    color: isHoverLink ? randomColor : '#FFF'
  }

  const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ]

  return loading ? (
    <div id="bgPrealoader" className='container-fluid d-flex justify-content-center align-items-center'>
      <Preloader />
    </div>
  ) : (
    <div id="bg" className="container-fluid d-flex justify-content-center align-items-center" style={{backgroundColor: randomColor}}>
        <div id="card" className="card text-center bg-light">
          <div id="quote-box" className="card-body d-flex flex-column justify-content-center">
            <h5 id="text" className="card-title">"{randomQuote.text}"</h5>
            <p id="author" className="card-text">- {randomQuote.author ? randomQuote.author : "Unknown"}</p>
            <div className="d-flex justify-content-end">
              <a id="tweet-quote" onMouseEnter={handleMouseEnterLink} onMouseLeave={handleMouseLeaveLink} style={linkStyle} className="btn btn-primary inline" href={linkTwitter} target="_blank"><i className="fa-brands fa-twitter"></i></a>
              <button id="new-quote" onClick={getNewQuote} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="btn btn-primary inline ms-2" style={buttonStyle}>New quote</button>
            </div>
          </div>
        </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<App/>)
