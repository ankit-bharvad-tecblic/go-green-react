import { toast } from "react-toastify";

export function showToastByStatusCode(statusCode, msg) {
  let message = "Something went wrong";

  switch (statusCode) {
    case 200:
      okay(msg);
      break;
    case 201:
      okay(msg);
      break;
    case 400:
      badRequest(msg);
      break;
    case 401:
      message = "Unauthorized";
      break;
    case 403:
      message = "Forbidden";
      break;
    case 404:
      message = "Not Found";
      break;
    case 500:
      message = "Internal Server Error";
      break;
    default:
      defaultToast(message);
      break;
  }
}

const okay = (obj) => {
  toast.success(obj?.msg || obj);
};

const defaultToast = (message) => {
  toast.error(message);
};

const badRequest = (message) => {
  toast.error(message || "Bad Request");
};
