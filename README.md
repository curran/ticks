# Ticks
A utility for choosing nice tick marks or histogram intervals.

## API

`ticks(min, max, n)`

 * `min` The minimum value of the interval.
 * `max` The maximum value of the interval.
 * `n` The approximate number of desired ticks.

Returns an array of "ticks", numbers that are suitable to use as tick mark values. The first tick will be less than or equal to `min`, and the last tick will be greater than or equal to `max`.

## Usage

Install via NPM:

`npm install -S ticks`

Example use:

```javascript
var ticks = require("ticks");

ticks(0.5432, 9.543, 10); //[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
ticks(1, 10000, 5); // [ 0, 2000, 4000, 6000, 8000, 10000 ]
ticks(-1, 1, 10); // [-1,-0.8,-0.6,-0.4,-0.2,0,0.2,0.4,0.6,0.8,1]
ticks(1000, 1002, 10); //[1000,1000.2,1000.4,1000.6,1000.8,1001,1001.2,1001.4,1001.6,1001.8,1002]
```

## Algorithm
The algorithm for computing ticks is based on the idea of a "nice interval". Nice intervals can be expressed as `(base * 10^exp)`, where `exp` is some integer exponent, and `base` is either 1, 2, or 5. Examples of nice intervals are 0.1, 0.5, 10, 20, 5, 2, and 500.

The Ticks algorithm computes the exponent of the raw interval, by `Math.log10((max - min) / n)`, then computes both the floor and ceiling of this value, which are candidate exponents for use in generating nice intervals. The algorithm then tries all 6 possible combinations of the two candidate exponents with the possible bases (1, 2, and 5) to generate a set of candidate nice intervals. From the generated set of nice intervals, the one that is closest to the raw interval (`(max - min) / n`) is chosen.

Curran Kelleher June 2015
