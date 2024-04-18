export function fibPack(segment: number, segments: number[]): number[] {
  const fib: number[] = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
  removeLargerElements(fib, segment);
  let remainder = segment;
  fib.pop();
  let carry = 0;
  segments = pack(remainder, carry, segments, fib);
  return segments;
}
/*
function pack(remainder: number, segments: number[], fib: number[]) {
  let subSegment = fib[Math.floor(rand(fib.length))];
  if (remainder - subSegment > 0) {
    segments.push(subSegment);
    remainder -= subSegment;
    while (fib[fib.length - 1] > remainder) {
      fib.pop();
    }
    return pack(remainder, segments, fib);
  } else {
    segments.push(subSegment);
    return segments;
  }
}
*/
function pack(
  remainder: number,
  carry: number,
  segments: number[],
  fib: number[]
) {
  let subSegment = fib[Math.floor(rand(fib.length))];
  if (subSegment <= 2) {
    carry += subSegment;
    if (remainder - subSegment === 0) {
      segments.push(carry);
      return segments;
    }
    remainder -= subSegment;
    while (fib[fib.length - 1] > remainder) {
      fib.pop();
    }
    return pack(remainder, carry, segments, fib);
  } else {
    if (remainder - subSegment > 0) {
      segments.push(subSegment);
      remainder -= subSegment;
      while (fib[fib.length - 1] > remainder) {
        fib.pop();
      }
      return pack(remainder, carry, segments, fib);
    } else {
      segments.push(subSegment);
      segments.push(carry);
      return segments;
    }
  }
}

function removeLargerElements(arr: any[], value: number) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] <= value) return;
    else arr.pop();
  }
}
function rand(max: number = 1, min: number = 0): number {
  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }
  return Math.floor(Math.random() * (max - min) + min);
}
