import * as papaparse from "papaparse";
import User, { IUser } from "../model/User";

const toString = (field: any): string | undefined => {
  if (field) {
    return field.toString();
  }

  return undefined;
};

export interface IValidResult {
  valid: true;
  user: IUser;
}

export interface IInvalidResult {
  valid: false;
  index: number;
  message: string;
}

export type IResult = IValidResult | IInvalidResult;

export default {
  parse: (lines: string[]): IResult[] => {
    const [header, ...body] = lines;

    console.log(header);

    if (header !== "firstName,lastName,gender,email,phone") {
      return [{ valid: false, index: 0, message: 'The header should be "firstName,lastName,gender,email,phone"' }];
    }

    const rows = papaparse.parse(body.join("\n")).data;

    const results: IResult[] = rows.map((row: any[], index: number) => {
      const firstName = toString(row[0]);
      const lastName = toString(row[1]);
      const gender = toString(row[2]);
      const email = toString(row[3]);
      const phone = toString(row[4]);

      // Check < 4 and not 5 because the phone can be left empty
      if (row.length < 4) {
        return {
          valid: false,
          index: index,
          message: `Found only ${row.length} columns instead of 5. Did you missed some fields?`
        };
      }

      if (row.length > 5) {
        return {
          valid: false,
          index: index,
          message: `Found ${row.length} columns instead of 5. Did you export too much columns?`
        };
      }

      if (gender !== undefined && gender !== "m" && gender !== "f") {
        return {
          valid: false,
          index: index,
          message: `The gender must be either "f" or "m".`
        };
      }

      const user: IUser = {
        firstName,
        lastName,
        gender,
        email,
        phone
      };

      // Need to check here instead of the yup schema to avoid 'gender' type not matching
      if (gender && gender !== "m" && gender !== "f") {
        return {
          valid: false,
          index: index,
          message: `${gender} is not a valid gender, it should either be "m" or "f".`
        };
      }

      const errors = User.validate(user);

      if (errors.length > 0) {
        return {
          valid: false,
          index: index,
          message: errors[0]
        };
      }

      return {
        valid: true,
        user
      };
    });

    return results;
  }
};
