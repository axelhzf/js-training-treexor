const expect = require("chai").expect;

describe("async/await", () => {
  
  it("should wait", async () => {
    const result = await Promise.resolve(5);
    expect(result).to.equal(5);
  });

});