import axios from 'axios';
import { get, merge } from 'lodash';

interface Options {
  method?: string;
  authHeader?: any;
  data?: object;
}

const request = async (url: string, options?: Options) => {
  const defaults = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache no-store must-revalidate',
      Pragma: 'no-cache',
    },
  };
  let data;
  const formData = get(options, 'data');

  try {
    ({ data } = await axios({
      url,
      ...merge(defaults, options),
      ...(formData &&
        formData instanceof FormData !== true && {
          data: formData,
        }),
    }));
  } catch (err) {
    console.log(err);
    throw err;
  }

  return data;
};

export default request;
