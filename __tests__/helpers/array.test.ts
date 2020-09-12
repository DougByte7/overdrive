import { newArray } from "@/helpers/array";

describe("Array Helper", () => {
  describe("With only length param", () => {
    it("should create an ordered value array", () => {
      const arr = newArray(5);
      const ordered = [0, 1, 2, 3, 4];
      expect(arr).toEqual(ordered);
    });
  });

  describe("With mapFn", () => {
    it("should transform the values", () => {
      const arr = newArray<number>(5, (_, i) => i * 2);
      const double = [0, 2, 4, 6, 8];
      expect(arr).toEqual(double);
    });

    it("should transform the values into objects", () => {
      const arr = newArray<{ value: number }>(3, (_, i) => ({ value: i }));
      const newArr = [{ value: 0 }, { value: 1 }, { value: 2 }];
      expect(arr).toEqual(newArr);
    });
  });
});
