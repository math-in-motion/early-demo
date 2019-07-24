/*------------------------------------------------------------------------------



------------------------------------------------------------------------------*/

/* eslint-disable no-console */
// eslint-disable-next-line no-undef

/* GLOBAL VARIABLES
---------------------------------------------------------*/
let pageContainer = document.getElementById('app-container');
let editorScreen = document.getElementById('editor-screen');

/* EDITOR PAGE — USER INPUT CONTROLLERS
---------------------------------------------------------*/
// Mathquill instance
let MQ = MathQuill.getInterface(2);

// HTML element which contains the user input field
let inputContainer = document.getElementById('user-input');

// Adds editable math field functionality to inputContainer
// NOTE: Mathquill methods are called upon this object,
// not on the HTML container.
let inputMQObject = MQ.MathField(inputContainer, {restrictMismatchedBrackets: true});

// HTML element that stores and displays the list of math expressions
let displayField = document.getElementById('display-field');

// Appends a new editable math expression to the displayField when
// the user hits the 'Enter' key
inputContainer.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    // Instantiates new editable expression and appends to displayField
    let cardBox = document.createElement('li');
    cardBox.setAttribute('class', 'card-box');
    let mathContainer = document.createElement('div');
    cardBox.appendChild(mathContainer);
    mathContainer.setAttribute('class', 'math-container');
    let latexInput = inputMQObject.latex();
    console.log(latexInput);
    let newMathExpression = MQ.MathField(mathContainer);
    newMathExpression.latex(latexInput);

    
    // Adds delete button to each new math expression
    let deleteX = document.createElement('button');
    deleteX.setAttribute('class', 'delete-x');
    cardBox.appendChild(deleteX);
    deleteX.innerHTML = 'x';
    displayField.appendChild(cardBox);
    /* cardBox.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'nearest',
    }); */
    displayField.scrollTop = displayField.scrollHeight;
    inputMQObject.latex('');
    anime({
      targets: [mathContainer],
      translateY: [-10, 0],
      scale: [0.1, 1],
      duration: 350,
      easing: 'easeOutExpo',
    });
    anime({
      targets: [deleteX],
      translateY: [-10, 0],
      translateX: [-200,0],
      scale: [0.1, 1],
      duration: 350,
      easing: 'easeOutExpo',
    });
    newMathExpression.reflow();
  }
});

// Adds delete functionality to the math expression's delete button
displayField.addEventListener('click', e => {
  if(e.target.classList.contains('delete-x')) {
    // e.target.parentElement.style.maxHeight = 'auto';
    anime({
      targets: [e.target.previousSibling],
      translateY: [0, -10],
      scale: [1, 0],
      duration: 250,
      easing: 'easeOutQuart',
    });

    anime({
      targets: [e.target],
      translateY: [0, -10],
      translateX: [0,-220],
      scale: [1, 0],
      duration: 250,
      easing: 'easeOutQuart',
    });

    anime({
      targets: e.target.parentElement,
      height: ['100%', '0%'],
      opacity: [1, 0],
      duration: 250,
      easing: 'easeOutQuart',
      complete: () => {
        e.target.previousSibling.remove();
        e.target.parentElement.remove();
      }
    });
  }
});
