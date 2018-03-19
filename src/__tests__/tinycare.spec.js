import tinycare from "../tinycare";

describe("tinycare", () => {
  it("should be a function with arity 1", () => {
    // Assert
    expect(tinycare).toBeInstanceOf(Function);
    expect(tinycare).toHaveLength(1);
  });

  describe("missing twitter config", () => {
    it("should throw an exception when twitter options are empty", () => {
      // Assert
      expect(() => tinycare({})).toThrow(
        "Missing or incorrect Twitter config."
      );
    });

    it("should thow an exception when twitter options are missing keys", () => {
      // Assert
      expect(() => tinycare({ twitter: { apiKey: "" } })).toThrow(
        "Missing or incorrect Twitter config."
      );
    });

    it("should NOT thow an exception when twitter options are correct", () => {
      // Assert
      expect(() =>
        tinycare({
          twitter: {
            accessToken: "",
            accessSecret: "",
            consumerKey: "",
            consumerSecret: ""
          }
        })
      ).not.toThrow();
    });
  });
});
