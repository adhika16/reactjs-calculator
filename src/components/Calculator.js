import React, { Component } from 'react';
import { Grid, Button } from '@mui/material';
import "./Calculator.css"

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
      <div className="Calculator-header">
        <h1 className="text-center mb-4 text-3xl font-bold">React Calculator</h1>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <div className="card mx-auto">
              <div id="display" className="card-body text-right">
                {this.state.display}
              </div>
              <div className="calculator-buttons card-footer">
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <Button className="w-full" variant="outlined" onClick={() => this.handleDigitClick("7")} id="seven">
                      7
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="w-full" variant="outlined" onClick={() => this.handleDigitClick("8")} id="eight">
                      8
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="w-full" variant="outlined" onClick={() => this.handleDigitClick("9")} id="nine">
                      9
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="w-full" variant="contained" color="primary" onClick={() => this.handleOperatorClick("+")} id="add">
                      +
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="w-full" variant="outlined" onClick={() => this.handleDigitClick("4")} id="four">
                      4
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="w-full" variant="outlined" onClick={() => this.handleDigitClick("5")} id="five">
                      5
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="w-full" variant="outlined" onClick={() => this.handleDigitClick("6")} id="six">
                      6
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="w-full" variant="contained" color="primary" onClick={() => this.handleOperatorClick("-")} id="subtract">
                      -
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="w-full" variant="outlined" onClick={() => this.handleDigitClick("1")} id="one">
                      1
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="w-full" variant="outlined" onClick={() => this.handleDigitClick("2")} id="two">
                      2
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="w-full" variant="outlined" onClick={() => this.handleDigitClick("3")} id="three">
                      3
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="w-full" variant="contained" color="primary" onClick={() => this.handleOperatorClick("*")} id="multiply">
                      *
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="w-full" variant="outlined" onClick={() => this.handleDigitClick("0")} id="zero">
                      0
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="w-full" variant="outlined" onClick={this.handleDecimalClick} id="decimal">
                      .
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="w-full" variant="outlined" color="error" onClick={this.handleClearClick} id="clear">
                      C
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className="w-full" variant="contained" color="primary" onClick={() => this.handleOperatorClick("/")} id="divide">
                      /
                    </Button>
                  </Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={6}>
                    <Button className="w-full" variant="contained" color="success" onClick={this.handleEqualsClick} id="equals">
                      =
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Calculator;
