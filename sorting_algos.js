console.log('Sorting Algorithms');


let unsortedArray = [8,6,4,2,0,9,7,5,3,1];


// ** Merge Sort **
// 
// split arr recursively in half until you have only single element arrays
// compare the first two values, form a new, sorted 2-element array
// repeat with the rest of the array
// compare the first two 2-element arrays, iterate through them simultaneously,
// taking the next highest value, merging into one 4-element array
// continue until arr is completely re-merged together
// how does control flow decide when to split, when to merge?
// does it always take and return a 1D array?
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  } else {
    let arr1 = mergeSort(arr.slice(0, arr.length / 2)); // 1,2
    let arr2 = mergeSort(arr.slice(arr.length / 2));    // 3,4
    return merge(arr1, arr2);
  }
  // if (arr.length == 2) {
  //   let arr1 = arr.slice(0, arr.length / 2); // 1
  //   let arr2 = arr.slice(arr.length / 2);    // 2
  //   return merge(arr1, arr2);
  // }
  // if (arr.length == 3) {
  //   let arr1 = arr.slice(0, arr.length / 2); // 1
  //   let arr2 = mergeSort(arr.slice(arr.length / 2));    // 3,2
  //   return merge(arr1, arr2);
  // }
  // if (arr.length == 4) {
  //   let arr1 = mergeSort(arr.slice(0, arr.length / 2)); // 1,2
  //   let arr2 = mergeSort(arr.slice(arr.length / 2));    // 3,4
  //   return merge(arr1, arr2);
  // }
  // if (arr.length == 5) {
  //   let arr1 = arr.slice(0, arr.length / 2); // 1,2
  //   let arr2 = arr.slice(arr.length / 2);    // 3,4,5
  //   return merge(arr1, arr2);
  // }
  // if (arr.length == 6) {

  // }
}




// function mergeSort(arr) {
//   let mergeSize = 2;
//   let merged;
//   let arr1;
//   let arr2;
//   counter = 0;
//   while (mergeSize <= arr.length && counter < 100) {
//     merged = [];
//     for (let i = 0; i * mergeSize <= arr.length; i += 1) {
//       arr1 = arr.slice(i * mergeSize, (i + 1) * mergeSize / 2);
//       arr2 = arr.slice((i + 1) * mergeSize / 2, (i + 1) * mergeSize);
//       merged = merged.concat(merge(arr1, arr2));
//     }
//     mergeSize *= 2;
//     arr = merged.slice();
//     console.log('arr', arr);
//     counter += 1;
//   }
//   return arr;
// }

function merge(arr1, arr2) {
  // let arr1 = arr.slice(0, arr.length / 2);
  // let arr2 = arr.slice(arr.length / 2);
  console.log(`Merging ${arr1} and ${arr2}`);
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

arrAssert(mergeSort(unsortedArray), `mergeSort, ${unsortedArray.length} elements unsorted`);

// Insertion Sort


// Bubble Sort
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

arrAssert(bubbleSort(unsortedArray), 'bubbleSort, 10 elements unsorted');


// Quicksort


// Heapsort


// Counting Sort



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

function arrAssert(result, test = '') {
  if (arrIsSorted(result)) {
    console.log('PASS:', test)
  } else {
    console.error(`FAILED: Got ${JSON.stringify(result)}`);
  }
}

function arrIsSorted(arr) {
  for (let i = 0; i < arr.length - 1; i += 1) {
    if (arr[i] > arr[i+1]) {
      return false;
    }
  }
  return true;
}