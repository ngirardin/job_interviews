import md5 from "md5";

const url = "https://www.gravatar.com/avatar";

export default {
  getUrl: (email: string, size: number): string => {
    const hash = md5(email.trim());
    return `${url}/${hash}?size=${size}`;
  }
};
