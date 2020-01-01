import CSVParser from "./CSVParser";

describe("The CSVParser", () => {
  it("should parse a valid csv file", () => {
    const results = CSVParser.parse([
      "firstName,lastName,gender,email,phone",
      "Nicolas,Girardin,m,ngirardin@gmail.com,0673325657",
      "first two,last two,f,two@gmail.com,+33611111111",
      "first three,last three,m,three@gmail.com,+44222222222"
    ]);

    const expected = [
      {
        valid: true,
        user: {
          firstName: "Nicolas",
          lastName: "Girardin",
          gender: "m",
          email: "ngirardin@gmail.com",
          phone: "0673325657"
        }
      },
      {
        valid: true,
        user: {
          firstName: "first two",
          lastName: "last two",
          gender: "f",
          email: "two@gmail.com",
          phone: "+33611111111"
        }
      },
      {
        valid: true,
        user: {
          firstName: "first three",
          lastName: "last three",
          gender: "m",
          email: "three@gmail.com",
          phone: "+44222222222"
        }
      }
    ];

    expect(results).toEqual(expected);
  });

  it("should accept empty fields", () => {
    const results = CSVParser.parse([
      "firstName,lastName,gender,email,phone",
      ",Girardin,m,ngirardin@gmail.com,0673325657",
      "Nicolas,,m,ngirardin@gmail.com,0673325657",
      "Nicolas,Girardin,,ngirardin@gmail.com,0673325657",
      "Nicolas,Girardin,m,@gmail.com,0673325657",
      "Nicolas,Girardin,m,ngirardin@gmail.com,"
    ]);

    const expected = [
      {
        valid: true,
        user: {
          firstName: undefined,
          lastName: "Girardin",
          gender: "m",
          email: "ngirardin@gmail.com",
          phone: "0673325657"
        }
      },
      {
        valid: true,
        user: {
          firstName: "Nicolas",
          lastName: undefined,
          gender: "m",
          email: "ngirardin@gmail.com",
          phone: "0673325657"
        }
      },
      {
        valid: true,
        user: {
          firstName: "Nicolas",
          lastName: "Girardin",
          gender: undefined,
          email: "ngirardin@gmail.com",
          phone: "0673325657"
        }
      },
      {
        // Weird but the email address can't be optional even if it's marked optional in the schema
        valid: false,
        index: 3,
        message: "This doesn't look like a valid email address."
      },
      {
        valid: true,
        user: {
          firstName: "Nicolas",
          lastName: "Girardin",
          gender: "m",
          email: "ngirardin@gmail.com",
          phone: undefined
        }
      }
    ];

    expect(results).toEqual(expected);
  });

  it("should reject invalid fields", () => {
    const results = CSVParser.parse([
      "firstName,lastName,gender,email,phone",
      "Nicolas,Girardin,x,ngirardin@gmail.com,0673325657",
      "Nicolas,Girardin,m,invalid mail,0673325657",
      "Nicolas,Girardin,m,ngirardin@gmail.com,invalid tel"
    ]);

    const expected = [
      {
        index: 0,
        message: 'The gender must be either "f" or "m".',
        valid: false
      },
      {
        index: 1,
        message: "This doesn't look like a valid email address.",
        valid: false
      },
      {
        index: 2,
        message: "This doesn't look like a valid phone number.",
        valid: false
      }
    ];

    expect(results).toEqual(expected);
  });

  it("should reject an invalid header", () => {
    const results = CSVParser.parse([
      "firstName,lastName,gender,phone,email",
      "Nicolas,Girardin,x,ngirardin@gmail.com,0673325657"
    ]);

    const expected = [
      {
        index: 0,
        message: 'The header should be "firstName,lastName,gender,email,phone"',
        valid: false
      }
    ];

    expect(results).toEqual(expected);
  });
});
