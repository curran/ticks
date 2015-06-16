var assert = require("assert");
var ticks = require("./index");

describe("Ticks", function(){
  it("should compute nice interval", function(){

    assert.equal( ticks.getNiceInterval(0, 10, 10), 1);
    assert.equal( ticks.getNiceInterval(0, 10, 11), 1);
    assert.equal( ticks.getNiceInterval(0, 10, 9), 1);

    assert.equal( ticks.getNiceInterval(0, 100, 10), 10);
    assert.equal( ticks.getNiceInterval(0, 101, 10), 10);
    assert.equal( ticks.getNiceInterval(0, 99, 10), 10);

    assert.equal( ticks.getNiceInterval(0, 50, 10), 5);
    assert.equal( ticks.getNiceInterval(-50, 0, 10), 5);
  });

  it("should compute first tick value", function(){
    assert.equal( ticks.getFirstTickValue(0.324, 2), 0);
    assert.equal( ticks.getFirstTickValue(563, 5), 560);
  });

  it("should generate ticks array", function(){
    assert.deepEqual(
      ticks(0.5432, 9.543, 10),
      [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
    );
    assert.deepEqual(
      ticks(0.5432, 10.3, 10),
      [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]
    );
    assert.deepEqual(
      ticks(1, 10000, 5),
      [ 0, 2000, 4000, 6000, 8000, 10000 ]
    );
  });

  it("should swap min and max if necessary", function(){
    assert.deepEqual(
      ticks(9.543, 0.5432, 10),
      [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
    );
  });

  it("should correct floating point accumulation errors", function(){
    assert.deepEqual(
      ticks(-1, 1, 10),
      [-1,-0.8,-0.6,-0.4,-0.2,0,0.2,0.4,0.6,0.8,1]
    );
    assert.deepEqual(
      ticks(1000, 1002, 10),
      [1000,1000.2,1000.4,1000.6,1000.8,1001,1001.2,1001.4,1001.6,1001.8,1002]
    );
  });
})
