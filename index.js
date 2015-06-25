var bases = [1, 2, 5];

function ticks(min, max, n){

  // Swap min and max if necessary;
  if(min > max){
    var temp = min;
    min = max;
    max = temp;
  }

  var interval = getNiceInterval(min, max, n);
  var value = getFirstTickValue(min, interval);

  var ticks = [value];
  while(value < max){
    value += interval;
    ticks.push(value);
  }

  return ticks.map(precision(interval));
}

// This eliminates floating point errors otherwise accumulated
// by repeatedly adding the computed interval.
function precision(interval){
  var multiplier = Math.pow(10, Math.ceil(Math.log10(interval)) + 1);
  return function (value){
    return Math.round(value * multiplier) / multiplier;
  };
}

function getNiceInterval(min, max, n) {

  var rawInterval = (max - min) / n;
  var rawExponent = Math.log10(rawInterval);

  // One of these two integer exponents, in conjunction with one of the bases,
  // will yield the nicest interval.
  var exponents = [Math.floor(rawExponent), Math.ceil(rawExponent)];

  var nicestInterval = Infinity;
  bases.forEach(function (base){
    exponents.forEach(function (exponent){

      // Try each combination of base and interval.
      var currentInterval = base * Math.pow(10, exponent);

      // Pick the combination that yields the nice interval that
      // most closely matches the raw interval.
      var currentDeviation = Math.abs(rawInterval - currentInterval);
      var nicestDeviation  = Math.abs(rawInterval - nicestInterval);

      if ( currentDeviation < nicestDeviation ){
        nicestInterval = currentInterval;
      }
    });
  });

  return nicestInterval;
}

function getFirstTickValue(min, interval){
  return Math.floor(min / interval) * interval;
}

ticks.getNiceInterval = getNiceInterval;
ticks.getFirstTickValue = getFirstTickValue;

export default ticks;
