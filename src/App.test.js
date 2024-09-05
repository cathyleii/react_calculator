import { render, screen } from '@testing-library/react';
import App, { evaluate, buildLinkedList, DoublyLinkedList, ListNode } from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('build linkedlist', () => {
  let string = "1 + 3 x 4 + 5";
  let node1 = new ListNode('1');
  let node2 = new ListNode('+');
  let node3 = new ListNode('3');
  let node4 = new ListNode('x');
  let node5 = new ListNode('4');
  let node6 = new ListNode('+');
  let node7 = new ListNode('5');

  let solution = new DoublyLinkedList(node1);
  node1.next = node2;
  node2.prev = node1;
  node2.next = node3;
  node3.prev = node2;
  node3.next = node4;
  node4.prev = node3;
  node4.next = node5;
  node5.prev = node4;
  node5.next = node6;
  node6.prev = node5;
  node6.next = node7;
  node7.prev = node6;

  expect(buildLinkedList(string)).toStrictEqual(solution)
  }
)
test('all addition', () => {
  let string = "3 + 5 + 9 + 10";
  let expression = buildLinkedList(string);
  expect(evaluate(expression)).toBe("27");
})

test('all multiplication', () => {
  let string = "1 x 3 x 4 x 11";
  let expression = buildLinkedList(string);
  expect(evaluate(expression)).toBe("132");
})

test('multiply by zero', () => {
  let string = "0 x 1 x 10000";
  let expression = buildLinkedList(string);
  expect(evaluate(expression)).toBe("0");

  string = "1 + 2 ÷ 10 x 0";
  expression = buildLinkedList(string);
  expect(evaluate(expression)).toBe("1");
})

test('all division', () => {
  let string = "100 ÷ 2 ÷ 5 ÷ 4";
  let expression = buildLinkedList(string);
  expect(evaluate(expression)).toBe("2.5");
})

test('divide by one', () => {
  let string = "12345 ÷ 1";
  let expression = buildLinkedList(string);
  expect(evaluate(expression)).toBe("12345");
})

test('divide by itself', () => {
  let string = "1835 ÷ 1835";
  let expression = buildLinkedList(string);
  expect(evaluate(expression)).toBe("1");
})

test ('mixed', () => {
  let string = "162 ÷ 8 + 4 - 100 x 9 + 0.5 x 1.3918";
  let expression = buildLinkedList(string);
  expect(evaluate(expression)).toBe("-875.0541");
})

