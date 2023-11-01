import React, { Component } from 'react';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      currentInput: '',
      lastOperator: '',
      previousOperator: '',
      lastResult: null,
    };
  }

  handleDigitClick = (digit) => {
    const { display, currentInput } = this.state;
    this.setState({
      display: currentInput === '0' ? digit : currentInput + digit,
      currentInput: currentInput === '0' ? digit : currentInput + digit,
    });
  };

  handleOperatorClick = (operator) => {
    const { currentInput, lastOperator, lastResult, previousOperator } = this.state;
    let newResult = parseFloat(currentInput);
    
    if (!isNaN(lastResult) && lastOperator) {
      if (lastOperator === '+') {
        newResult = lastResult + newResult;
      } else if (lastOperator === '-') {
        newResult = lastResult - newResult;
      } else if (lastOperator === '*') {
        newResult = lastResult * newResult;
      } else if (lastOperator === '/') {
        newResult = lastResult / newResult;
      }
    }

    this.setState({
      display: !isNaN(newResult) ? newResult.toString() : lastResult.toString(),
      currentInput: '',
      lastOperator: operator,
      previousOperator: lastOperator !== '' ? lastOperator : '',
      lastResult: !isNaN(newResult) ? newResult : lastResult,
    });
  };

  handleEqualsClick = () => {
    const { currentInput, lastOperator, lastResult, previousOperator } = this.state;
    let newResult = parseFloat(currentInput);
    let _lastOperator = lastOperator;
    if (lastOperator === '-' && previousOperator !== '') {
      newResult = -newResult;
      _lastOperator = previousOperator;
    }

    if (!isNaN(lastResult) && _lastOperator) {
      if (_lastOperator === "+") {
        newResult = lastResult + newResult;
      } else if (_lastOperator === "-") {
        newResult = lastResult - newResult;
      } else if (_lastOperator === "*") {
        newResult = lastResult * newResult;
      } else if (_lastOperator === "/") {
        newResult = lastResult / newResult;
      }

      this.setState({
        display: newResult.toString(),
        currentInput: '0',
        lastOperator,
        previousOperator,
        lastResult: newResult, // Apply the last operator when equals is pressed
      });
    }
  };

  handleClearClick = () => {
    this.setState({
      display: '0',
      currentInput: '',
      lastOperator: '',
      previousOperator: '',
      lastResult: null,
    });
  };

  handleDecimalClick = () => {
    const { display, currentInput } = this.state;

    if (currentInput.includes('.')) {
      return;
    }

    this.setState({
      display: currentInput === '0' ? '0.' : currentInput + '.',
      currentInput: currentInput === '0' ? '0.' : currentInput + '.',
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center mt-4 mb-4">React Calculator</h1>
        <div className="calculator card mx-auto">
          <div id="display" className="card-body text-right">
            {this.state.display}
          </div>
          <div className="calculator-buttons card-footer">
            <div className="row">
              <div className="col-5">
                <div className="row">
                  <div className="col-3">
                    <button className="btn btn-light" onClick={() => this.handleDigitClick('7')} id='seven'>7</button>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-light" onClick={() => this.handleDigitClick('8')} id='eight'>8</button>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-light" onClick={() => this.handleDigitClick('9')} id='nine'>9</button>
                  </div>

                </div>
                <div className="row">
                  <div className="col-3">
                    <button className="btn btn-light" onClick={() => this.handleDigitClick('4')} id='four'>4</button>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-light" onClick={() => this.handleDigitClick('5')} id='five'>5</button>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-light" onClick={() => this.handleDigitClick('6')} id='six'>6</button>
                  </div>

                </div>
                <div className="row">
                  <div className="col-3">
                    <button className="btn btn-light" onClick={() => this.handleDigitClick('1')} id='one'>1</button>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-light" onClick={() => this.handleDigitClick('2')} id='two'>2</button>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-light" onClick={() => this.handleDigitClick('3')} id='three'>3</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <button className="btn btn-light" onClick={() => this.handleDigitClick('0')} id='zero'>0</button>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-light" onClick={this.handleDecimalClick} id='decimal'>.</button>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-danger" onClick={this.handleClearClick} id='clear'>C</button>
                  </div>

                </div>
                <div className="row">
                  <div className="col-3">
                    <button className="btn btn-primary" onClick={() => this.handleOperatorClick('+')} id='add'>+</button>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-primary" onClick={() => this.handleOperatorClick('-')} id='subtract'>-</button>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-primary" onClick={() => this.handleOperatorClick('*')} id='multiply'>*</button>
                  </div>

                </div>
                <div className="row">
                  <div className="col-3">
                    <button className="btn btn-primary" onClick={() => this.handleOperatorClick('/')} id='divide'>/</button>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-success" onClick={this.handleEqualsClick} id='equals'>=</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
