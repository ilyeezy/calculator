if (typeof document !== "undefined" && document) {
  let runningTotal = 0;
  let buffer = "0";
  let previousOperator;
  const screen = document.querySelector(".wrapper__screen");

  function buttonClick(value) {
    if (isNaN(value)) {
      handleSymbol(value);
    } else {
      handleNumber(value);
    }
    screen.innerText = addThousandSeparators(buffer);
  }

  function addThousandSeparators(numberString) {
    numberString = numberString.replace(/\s/g, "");
    const parts = numberString.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
  }

  function handleSymbol(symbol) {
    switch (symbol) {
      case "C":
        buffer = "0";
        runningTotal = 0;
        break;
      case "=":
        if (previousOperator === null) {
          return;
        }
        flushOperation(parseFloat(buffer));
        previousOperator = null;
        buffer = String(runningTotal);
        runningTotal = 0;
        break;
      case "←":
        if (buffer.length === 1) {
          buffer = "0";
        } else {
          buffer = buffer.substring(0, buffer.length - 1);
        }
        break;
      case ",":
        if (!buffer.includes(".")) {
          buffer += ".";
        }
        break;
      case "±":
        toggleSign();
        break;
      case "%":
        precent();
        break;
      case "+":
      case "−":
      case "×":
      case "÷":
        handleMath(symbol);
        break;
    }
  }

  function toggleSign() {
    buffer = String(parseFloat(buffer) * -1);
  }

  function precent() {
    buffer = String(parseFloat(buffer / 100));
  }

  function handleMath(symbol) {
    if (buffer === "0") {
      return;
    }
    const intBuffer = parseFloat(buffer);
    if (runningTotal === 0) {
      runningTotal = intBuffer;
    } else {
      flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = "0";
  }

  function flushOperation(intBuffer) {
    if (previousOperator === "+") {
      runningTotal += parseFloat(intBuffer);
    } else if (previousOperator === "−") {
      runningTotal -= parseFloat(intBuffer);
    } else if (previousOperator === "×") {
      runningTotal *= parseFloat(intBuffer);
    } else if (previousOperator === "÷") {
      runningTotal /= parseFloat(intBuffer);
    }
  }

  function handleNumber(numberString) {
    if (buffer === "0") {
      buffer = numberString;
    } else {
      buffer += numberString;
    }
  }

  function init() {
    document
      .querySelector(".screen__calc-buttons")
      .addEventListener("click", function (event) {
        buttonClick(event.target.innerText);
      });
  }

  init();
}
