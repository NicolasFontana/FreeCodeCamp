const App = () => {
  const [answer, setAnswer] = React.useState(0)
  const [expression, setExpression] = React.useState('')

  const display = (input) => {
    // DOT CONTROLLER
    if(/\./.test(answer)) {
      if(input == ".") {
        return null
      }
    }
    // DISPLAY EXPRESSION
    if(/\*|\//gm.test(expression[expression.length - 1]) && /\-/gm.test(input)) {
      setExpression(prev => prev + input)
    } else if (/\*/gm.test(expression[expression.length - 2]) && /\-/gm.test(expression[expression.length - 1]) && /\-|\+|\*|\//gm.test(input)) {
      setExpression(prev => prev.slice(0, prev.length - 2) + input)
    } else if(/\-|\+|\*|\//gm.test(expression[expression.length - 1]) && /\-|\+|\*|\//gm.test(input)) {
      setExpression(prev => prev.slice(0, prev.length - 1) + input)
    } else {
      setExpression((prev) => prev + input)
    }
    if(expression[expression.length - 1] == "=") {
      if(/[1-9.]/.test(input)) {
        setExpression(input)
      } else {
        setExpression(answer + input)
      }
    }
    // DISPLAY ANSWER
    if(answer == 0) {
      if (input == ".") {
        setAnswer(prev => prev + input)
      } else {
        setAnswer(input)
      }
    } else if(/\-|\+|\*|\//gm.test(input)) {
      return null
    } else if(/\-|\+|\*|\//gm.test(expression[expression.length - 1])) {
      setAnswer(input)
    } else if(expression[expression.length - 1] == "=") {
      setAnswer(input)
    } else if(answer != 0) {
      setAnswer(prev => prev + input)
    }
  }


  const calculate = () => {
    if(/\-|\+|\*|\/|\=/gm.test(expression[expression.length - 1])) {
      return null
    }
    setAnswer(eval(expression))
    setExpression((prev) => prev + "=")
  }

  const clear = () => {
    setExpression('')
    setAnswer(0)
  }

  return (
    <div id="container" className="container-fluid d-flex justify-content-center align-items-center bg-light">
      <div id="calculator" className="container">
        <div className="dis">
          <input type="text" value={expression} placeholder="0" disabled/>
          <div id="display" className="total">{answer}</div>
        </div>
        <div id="clear" onClick={clear} className="padButton">AC</div>
        <div id="divide" onClick={() => display("/")} className="padButton">/</div>
        <div id="multiply" onClick={() => display("*")} className="padButton">X</div>
        <div id="seven" onClick={() => display("7")} className="padButton">7</div>
        <div id="eight" onClick={() => display("8")} className="padButton">8</div>
        <div id="nine" onClick={() => display("9")} className="padButton">9</div>
        <div id="subtract" onClick={() => display("-")} className="padButton">-</div>
        <div id="four" onClick={() => display("4")} className="padButton">4</div>
        <div id="five" onClick={() => display("5")} className="padButton">5</div>
        <div id="six" onClick={() => display("6")} className="padButton">6</div>
        <div id="add" onClick={() => display("+")} className="padButton">+</div>
        <div id="one" onClick={() => display("1")} className="padButton">1</div>
        <div id="two" onClick={() => display("2")} className="padButton">2</div>
        <div id="three" onClick={() => display("3")} className="padButton">3</div>
        <div id="equals" onClick={calculate} className="padButton">=</div>
        <div id="zero" onClick={() => display("0")} className="padButton">0</div>
        <div id="decimal" onClick={() => display(".")} className="padButton">.</div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)