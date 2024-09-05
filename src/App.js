
import './App.css';
import React, { useReducer, useState } from 'react';
import InputButton from './InputButton';
import OutputBox from './OutputBox';

const ACTIONS = {
  ADD_OPERATION: 'add-operation',
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear', 
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

export class DoublyLinkedList {
  constructor(head = null) {
    this.head = head;
  }
}

export class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currOperand: state.justCalculated ? payload.digit : `${state.currOperand || ""}${payload.digit}`,
        justCalculated: false
      }
    case ACTIONS.ADD_OPERATION:
      let newOperand = state.currOperand 
      ? (["+", "-", "÷", "x"].includes(state.currOperand.charAt(state.currOperand.length-2))
      ? state.currOperand : `${state.currOperand} ${payload.digit} `)
      : "";
      return {
        ...state,
        currOperand: newOperand,
        justCalculated: false
      }
    case ACTIONS.CLEAR:
      return {
        ...state,
        currOperand: null
      }
    case ACTIONS.DELETE_DIGIT:
      console.log(state.currOperand.slice(-1));
      let newCurrOperand = state.currOperand 
      ? (state.currOperand.slice(-1) === " " 
      ? state.currOperand.substring(0, state.currOperand.length-3) 
      : state.currOperand.substring(0, state.currOperand.length-1))
      : ""


  
      return {
        ...state,
        currOperand: newCurrOperand
      }
    case ACTIONS.EVALUATE:

      let expression = buildLinkedList(state.currOperand);

      const result = evaluate(expression);

      return {
        ...state,
        prevOperand: `${state.currOperand} =`,
        currOperand: result,
        justCalculated: true

      }
  }

}

export function buildLinkedList(string) {
  const array = string.split(' ');
  let list = new DoublyLinkedList();
  let prevNode = null;

  for (const input of array) {
    let node = new ListNode(input);
    if (list.head === null) {
      list.head = node;
    }
    if (prevNode !== null) {
      prevNode.next = node;
      node.prev = prevNode;
    }
    prevNode = node;
  }

  return list;

}

export function evaluate(expression) {

  let afterMultDiv = handleMultAndDiv(expression);
  let calculation = handleAddAndSub(afterMultDiv);
  calculation = calculation.head.data;
  return calculation;
}

function handleMultAndDiv(expression) {
  let curr = expression.head;
  while (curr !== null) {
    if (['x', '÷'].includes(curr.data)) {
      let leftNode = curr.prev; // node left of curr
      let leftOperand = parseFloat(leftNode.data); 
      let rightNode = curr.next; // node right of curr
      let rightOperand = parseFloat(rightNode.data);
      let operator = curr.data;
      let result = '';
      switch (operator) {
        case 'x':
          result = leftOperand*rightOperand;
          break;
        case '÷':
          result = leftOperand/rightOperand;
          break;
      }
      let newNode = new ListNode(result.toString()); // new node to insert with calculated result
      if (leftNode === expression.head) {
        expression.head = newNode;
      } else {
        leftNode.prev.next = newNode;
        newNode.prev = leftNode.prev;
      }

      if (rightNode.next !== null) {
        newNode.next = rightNode.next;
        rightNode.next.prev = newNode;
      }

      curr = newNode;
    } else {
      curr = curr.next;
    }
  }

  return expression;
}

function handleAddAndSub(expression) {
  let curr = expression.head;
  while (curr !== null) {
    if (['+', '-'].includes(curr.data)) {
      let leftNode = curr.prev; // node left of curr
      let leftOperand = parseFloat(leftNode.data); 
      let rightNode = curr.next; // node right of curr
      let rightOperand = parseFloat(rightNode.data); 
      let operator = curr.data;
      let result = '';
      switch (operator) {
        case '+':
          result = leftOperand+rightOperand;
          break;
        case '-':
          result = leftOperand-rightOperand;
          break;
      }
      let newNode = new ListNode(result.toString()); // new node to insert with calculated result
      if (leftNode === expression.head) { // left operand is first node in expression
        expression.head = newNode;
      } else {  
        leftNode.prev.next = newNode;
        newNode.prev = leftNode.prev;
      }

      if (rightNode.next !== null) { // right operand is last node in expression
        newNode.next = rightNode.next;
        rightNode.next.prev = newNode;
      }

      curr = newNode;
    } else {
      curr = curr.next;
    }
    
  }

  return expression;
}


function App() {
  const [{ currOperand, prevOperand, justCalculated}, dispatch] = useReducer(reducer, {
    currOperand: '',
    prevOperand: '',
    justCalculated: false
  });
  
  return (
    <div className="calculator-grid">
      <OutputBox currOperand={currOperand} prevOperand={prevOperand} />
      <div className="top-row">
        <div className="ac highlight">
        <InputButton dispatch={dispatch} digit="AC" actionType={ACTIONS.CLEAR} />
        </div>
        <div className="del highlight">
        <InputButton dispatch={dispatch} digit="DEL" actionType={ACTIONS.DELETE_DIGIT} />
        </div>
        <div className="divide-symbol">
        <InputButton dispatch={dispatch} digit="÷" actionType={ACTIONS.ADD_OPERATION} />
        </div>
        </div>
      <div className="inputs">
        <InputButton dispatch={dispatch} digit="7" actionType={ACTIONS.ADD_DIGIT} />
        <InputButton dispatch={dispatch} digit="8" actionType={ACTIONS.ADD_DIGIT} />
        <InputButton dispatch={dispatch} digit="9" actionType={ACTIONS.ADD_DIGIT} />
        <InputButton dispatch={dispatch} digit="x" actionType={ACTIONS.ADD_OPERATION} />
        <InputButton dispatch={dispatch} digit="4" actionType={ACTIONS.ADD_DIGIT} />
        <InputButton dispatch={dispatch} digit="5" actionType={ACTIONS.ADD_DIGIT} />
        <InputButton dispatch={dispatch} digit="6" actionType={ACTIONS.ADD_DIGIT} />
        <InputButton dispatch={dispatch} digit="-" actionType={ACTIONS.ADD_OPERATION} />
        <InputButton dispatch={dispatch} digit="1" actionType={ACTIONS.ADD_DIGIT} />
        <InputButton dispatch={dispatch} digit="2" actionType={ACTIONS.ADD_DIGIT} />
        <InputButton dispatch={dispatch} digit="3" actionType={ACTIONS.ADD_DIGIT} />
        <InputButton dispatch={dispatch} digit="+" actionType={ACTIONS.ADD_OPERATION} />
      </div>
      <div className="bottom-row">
        <div className="period">
        <InputButton dispatch={dispatch} digit="." actionType={ACTIONS.ADD_DIGIT} />
        </div>
        <div className="zero">
        <InputButton dispatch={dispatch} digit="0" actionType={ACTIONS.ADD_DIGIT} />
        </div>
        <div className="equal-sign highlight">
        <InputButton dispatch={dispatch} digit="=" actionType={ACTIONS.EVALUATE} />
        </div>
      </div>
    </div>
  );
}

export default App;
