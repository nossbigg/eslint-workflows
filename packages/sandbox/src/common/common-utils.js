const noop = () => undefined;

const someFn = (input) => {
  switch (input) {
    case "a": {
      noop();
    }
    default: {
      noop();
    }
  }
};

exports.someFn = someFn;
