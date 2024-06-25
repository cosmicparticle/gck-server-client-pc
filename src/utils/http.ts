import { Superagent } from "aldehyde";

export const GET = (url: string, query?: { [key: string]: any }) => {
  return Superagent.super(
    {
      url,
      serverKey: "",
      method: "GET",
      query,
    },
    "",
    "none"
  );
};

export const POST = (url: string, data?: { [key: string]: any }) => {
  return Superagent.super(
    {
      url,
      serverKey: "",
      method: "POST",
      data,
    },
    "formdata",
    "none"
  );
};
