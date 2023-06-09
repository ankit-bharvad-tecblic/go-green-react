import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";
import { localStorageService } from "../../services/localStorge.service";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://192.168.0.124:8000/",
  baseUrl: process.env.REACT_APP_API_BASE_URL_LOCAL,
  // credentials: "include",
  mode: "cors",

  prepareHeaders: (headers, { getState }) => {
    let api_token = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2ODcxNjM5NTEsImlhdCI6MTY4NjI5OTk1MX0.bbecFRlkfeYGywqGq4zJfSnLbisOhyGNFGnwmn8zOKA",
    };
    // const token = localStorageService.get("GG_ADMIN")?.token;
    const token = api_token.token;

    console.log("api main slice log ---> ", token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
