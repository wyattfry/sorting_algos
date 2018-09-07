console.log('Sorting Algorithms');

let unsortedArray = [8,6,4,2,0,9,7,5,3,1];
let expect = [0,1,2,3,4,5,6,7,8,9];

// ** Merge Sort **
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  } else {
    let arr1 = mergeSort(arr.slice(0, arr.length / 2));
    let arr2 = mergeSort(arr.slice(arr.length / 2));
    return merge(arr1, arr2);
  }
}
function merge(arr1, arr2) {
  let i = 0;
  let j = 0;
  let output = []
  while (i < arr1.length || j < arr2.length) {
    if (j >= arr2.length || arr1[i] < arr2[j]) {
      output.push(arr1[i]);
      i += 1;
    } else if (i >= arr1.length || arr2[j] < arr1[i]) {
      output.push(arr2[j]);
      j += 1;
    } else {
      output.push(arr1[i], arr2[j]);
      i += 1;
      j += 1;
    }
  }
  return output;
}

// ** Insertion Sort - Array Version **
function insertionSort(arr) {
  let sorted = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (i == 0) { // first element from src automatically goes to sorted
      sorted.push(arr[i]);
    } else {
      for (let j = sorted.length - 1; j >= 0; j -= 1) {
        if (arr[i] >= sorted[j]) {
          sorted = sorted.slice(0,j+1).concat(arr[i], sorted.slice(j+1));
          break;
        } else if (j == 0) {
          sorted = [arr[i]].concat(sorted);
        }
      }
    }
  }
  return sorted;
}

// ** Insertion Sort - LinkedList version **
function insertionSortLL(arr) {
  let sorted = new LinkedList();
  let current;
  for (let i = 0; i < arr.length; i += 1) {
    const nodeToInsert = new Node(arr[i]);
    if (i == 0) { // first element from src automatically goes to sorted
      sorted.push(nodeToInsert);
    } else {
      current = sorted.tail;
      while (current != null) {
        if (arr[i] >= current.value) {
          sorted.insertAfter(current, nodeToInsert);
          break;
        } else if (current.prev == null) {
          sorted.unshift(nodeToInsert)
          break;
        }
        current = current.prev;
      }
    }
  }
  return sorted.toArray();
}

function Node(val) {
  this.prev = null;
  this.next = null;
  this.value = val;
};

function LinkedList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
  this.push = function(n) {
    if (this.length == 0) {
      this.head = n;
      this.tail = n;
    } else {
      n.prev = this.tail;
      this.tail.next = n;
      this.tail = n;
    }
    this.length += 1;
  };
  this.insertAfter = function(nodeInList, nodeToInsert) {
    if (nodeInList.next == null) {
      this.push(nodeToInsert);
    } else {
      const nextNode = nodeInList.next;
      nodeToInsert.next = nodeInList.next;
      nodeToInsert.prev = nodeInList;
      nextNode.prev = nodeToInsert;
      nodeInList.next = nodeToInsert;
    }
  }
  this.unshift = function(n) {
    n.next = this.head;
    this.head.prev = n;
    this.head = n;
    this.length += 1;
  };
  this.toArray = function () {
    let output = [];
    let current = this.head;
    while (current != null) {
      output.push(current.value);
      current = current.next;
    }
    return output;
  };
};

// ** Bubble Sort **
function bubbleSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  arr = arr.slice();
  let sorted;
  let temp;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < arr.length - 1; i += 1) {
      if (arr[i] > arr[i + 1]) {
        sorted = false;
        temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
  return arr;
}

// ** Quicksort **


// ** Heapsort **
function heapSort(arr) {
  const heap = new Heap();
  const sorted = [];
  for (let i = 0; i < arr.length; i += 1) {
    heap.push(arr[i]);
  }

  for (let i = arr.length - 1; i >= 0; i -= 1) {
    // swap first and last element
    sorted[i] = heap.toArray()[0];
  }
}

function Heap() {
  this.heap = [];
  this.push = function(val) {
    this.heap.push(val);
    let childIdx = this.heap.length - 1;
    let parentIdx = Number.parseInt((childIdx - 1) / 2);
    let temp;
    while (this.heap.length > 1 && this.heap[childIdx] > this.heap[parentIdx]) {
      temp = this.heap[childIdx];
      this.heap[childIdx] = this.heap[parentIdx];
      this.heap[parentIdx] = temp;
      if (parentIdx == 0) {
        break;
      }
      childIdx = parentIdx;
      parentIdx = Number.parseInt((childIdx - 1) / 2);
    }
  };
  this.pop = function() {
    const oldHead = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    let parentIdx = 0;
    let childIdx = 1;
    if (this.heap[0] < this.heap[1] || this.heap[0] < this.heap[2]) {
      while (this.heap[parentIdx] < this.heap[childIdx]) {
        if (this.heap[0] < this.heap[1]) {
          childIdx = 1;
        } else {
          childIdx = 2;
        }
        
      }
    }
    return oldHead
  }
  this.toArray = function() {
    return this.heap;
  }
}


// Counting Sort


// ** Tests **
function runTests() {
  arrAssert(expect, mergeSort(unsortedArray), `mergeSort, ${unsortedArray.length} elements unsorted`);
  arrAssert(expect, insertionSort(unsortedArray), `insertionSort, ${unsortedArray.length} elements unsorted`);
  arrAssert(expect, bubbleSort(unsortedArray), `bubbleSort, ${unsortedArray.length} elements unsorted`);
}

// runTests();

// Assert
function arrayEquals(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

function arrAssert(expect, result, test = '') {
  const RED = "\u001b[31m";
  const GREEN = "\u001b[32m";
  const RESET = "\u001b[0m";
  if (arrayEquals(expect, result)) {
    console.log(`${GREEN}PASS:${RESET} ${test}`)
  } else {
    console.error(`${RED}FAILED:${RESET} Got ${JSON.stringify(result)}`);
  }
}

// ** Performance Tests **
function timerDecorator(fn) {
  return function(arg) {
    let startTime = Date.now();
    fn(arg);
    let finishTime = Date.now();
    return finishTime - startTime + ' ms';
  };
}


function runPerformanceTests() {
  const arraySize = 2e4;
  console.log(`Making ${arraySize.toLocaleString()} element array of random ints`);
  let largeArray = [];
  for (let i = 0; i < arraySize; i++) {
    largeArray.push(Math.floor(Math.random() * arraySize));
  }

  console.log(`- mergeSort\t\t${timerDecorator(mergeSort)(largeArray)}`);
  console.log(`- insertionSort\t\t${timerDecorator(insertionSort)(largeArray)}`);
  console.log(`- insertionSortLL\t${timerDecorator(insertionSortLL)(largeArray)}`);
  console.log(`- bubbleSort\t\t${timerDecorator(bubbleSort)(largeArray)}`);
}

// runPerformanceTests();