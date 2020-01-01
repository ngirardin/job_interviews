describe("The collage test", () => {
  it("wider, maxdim less thant h and w", () => expect(scaleImage(200, 100, 50)).toEqual([50, 25]));
  it("wider, maxdim more thant h and w", () => expect(scaleImage(200, 100, 400)).toEqual([400, 200]));
  it("taller, maxdim less thant h and w", () => expect(scaleImage(100, 200, 50)).toEqual([25, 50]));
  it("taller, maxdim more thant h and w", () => expect(scaleImage(100, 200, 400)).toEqual([200, 400]));
});

function scaleImage(width, height, maxdim) {
  var scale = width > height ? maxdim / width : maxdim / height;
  return [scale * width, scale * height];
}
