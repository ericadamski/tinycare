import { Observable } from "rxjs";

import tinycare, {
  emitCanStartTimer,
  _canStartTimer$,
  startTimer
  _breakTaken$,
} from "../tinycare";

describe("tinycare", () => {
  const CONFIG = {
    twitter: {
      apiKey: "",
      apiSecret: "",
      consumerKey: "",
      consumerSecret: ""
    },
    time: 1
  };

  it("should be a function with arity 1", () => {
    // Assert
    expect(tinycare).toBeInstanceOf(Function);
    expect(tinycare).toHaveLength(1);
  });

  describe("utils", () => {
    describe("emitCanStartTimer", () => {
      it("should be a function with arity 1", () => {
        // Assert
        expect(emitCanStartTimer).toBeInstanceOf(Function);
        expect(emitCanStartTimer).toHaveLength(1);
      });

      it("should throw an error is you call emitCanStartTimer without calling tinycare first", () => {
        // Assert
        expect(() => emitCanStartTimer()).toThrow(
          "Please make sure you call tinycare(options) first."
        );
      });

      it("should cause canStartTimer$ to emit the value that passed next", () => {
        // Arrange
        tinycare();

        // Async Assert
        const p = new Promise((resolve, reject) =>
          _canStartTimer$.subscribe(
            value => (expect(value).toBeFalsy(), resolve()),
            reject
          )
        );

        // Act
        emitCanStartTimer(false);

        return p;
      });
    });
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
            apiKey: "",
            apiSecret: "",
            consumerKey: "",
            consumerSecret: ""
          }
        })
      ).not.toThrow();
    });
  });

  describe("timer", () => {
    it("should be a function with arity 1", () => {
      // Assert
      expect(timer).toBeInstanceOf(Function);
      expect(timer).toHaveLength(1);
    });

    it("should return a function of that returns an observable", () => {
      let fn;

      // Assert
      expect((fn = timer(1))).toBeInstanceOf(Function);
      expect(fn()).toBeInstanceOf(Observable);
    });

    it("should emit until _breakTaken$ emits", () => {});
  });

  describe("break", () => {
    it("should call takeBreak when timer reaches 0", () => {});

    it("should call canStartTimer after takeBreak has been called", () => {});
  });
});
