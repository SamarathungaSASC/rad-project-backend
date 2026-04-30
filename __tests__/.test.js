// example.test.js — comprehensive Jest test file for a Node.js project

// ─── Module under test (inline for demo; replace with require('./your-module')) ───

function add(a, b) { return a + b; }
function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}
async function fetchUser(id) {
  if (!id) throw new Error("ID required");
  return { id, name: "Alice", role: "admin" };
}
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

//Basic unit tests 

describe("add()", () => {
  test("adds two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("handles negative numbers", () => {
    expect(add(-1, -4)).toBe(-5);
  });

  test("adds zero without changing value", () => {
    expect(add(7, 0)).toBe(7);
  });
});

//Exception handling 

describe("divide()", () => {
  test("divides correctly", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("throws on division by zero", () => {
    expect(() => divide(10, 0)).toThrow("Division by zero");
  });

  test("throws an Error instance", () => {
    expect(() => divide(5, 0)).toThrow(Error);
  });
});

//Async / Promise tests 

describe("fetchUser()", () => {
  test("returns user object for valid ID", async () => {
    const user = await fetchUser(1);
    expect(user).toEqual({ id: 1, name: "Alice", role: "admin" });
  });

  test("rejects when ID is missing", async () => {
    await expect(fetchUser(null)).rejects.toThrow("ID required");
  });

  test("returned object has required shape", async () => {
    const user = await fetchUser(42);
    expect(user).toMatchObject({ id: 42 });
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("role");
  });
});

//Mock functions

describe("Mock function basics", () => {
  test("tracks calls and arguments", () => {
    const mockFn = jest.fn((x) => x * 2);

    mockFn(3);
    mockFn(5);

    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenCalledWith(3);
    expect(mockFn).toHaveBeenLastCalledWith(5);
    expect(mockFn(4)).toBe(8);
  });

  test("mock resolves a promise", async () => {
    const mockAsync = jest.fn().mockResolvedValue({ ok: true });
    const result = await mockAsync();
    expect(result).toEqual({ ok: true });
  });

  test("mock throws on demand", () => {
    const mockFail = jest.fn().mockImplementation(() => {
      throw new Error("network error");
    });
    expect(() => mockFail()).toThrow("network error");
  });
});

//Spying on methods

describe("jest.spyOn()", () => {
  test("spies on Date.prototype.toISOString", () => {
    const spy = jest
      .spyOn(Date.prototype, "toISOString")
      .mockReturnValue("2024-06-15T00:00:00.000Z");

    expect(formatDate(new Date())).toBe("2024-06-15");
    expect(spy).toHaveBeenCalled();

    spy.mockRestore(); // always restore after spying
  });
});

//Object / array matchers

describe("Matchers showcase", () => {
  test("array contains expected items", () => {
    const fruits = ["apple", "banana", "cherry"];
    expect(fruits).toContain("banana");
    expect(fruits).toHaveLength(3);
    expect(fruits).toEqual(expect.arrayContaining(["cherry", "apple"]));
  });

  test("object has expected keys and values", () => {
    const config = { host: "localhost", port: 3000, debug: false };
    expect(config).toHaveProperty("port", 3000);
    expect(config).toMatchObject({ host: "localhost" });
    expect(Object.keys(config)).toHaveLength(3);
  });

  test("number is within range", () => {
    const value = 0.1 + 0.2;
    expect(value).toBeCloseTo(0.3, 5);
    expect(value).toBeGreaterThan(0);
    expect(value).toBeLessThan(1);
  });
});

//beforeEach / afterEach lifecycle

describe("Lifecycle hooks", () => {
  let counter;

  beforeEach(() => {
    counter = { value: 0 };
  });

  afterEach(() => {
    // cleanup if needed
  });

  test("starts at zero", () => {
    expect(counter.value).toBe(0);
  });

  test("increments independently", () => {
    counter.value += 1;
    expect(counter.value).toBe(1);
  });
});

//Parameterised tests

describe("add() parameterised", () => {
  test.each([
    [1, 2, 3],
    [0, 0, 0],
    [-5, 5, 0],
    [100, -50, 50],
  ])("add(%i, %i) === %i", (a, b, expected) => {
    expect(add(a, b)).toBe(expected);
  });
});

//Snapshot test

describe("Snapshot", () => {
  test("user object matches snapshot", async () => {
    const user = await fetchUser(1);
    expect(user).toMatchSnapshot();
    // Run with --updateSnapshot (-u) to refresh the stored snapshot
  });
});

//Timer mocks

describe("Fake timers", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test("setTimeout callback is called after delay", () => {
    const cb = jest.fn();
    setTimeout(cb, 1000);

    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});