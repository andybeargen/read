// https://github.com/mui/material-ui/blob/master/examples/material-ui-remix-ts/app/src/ClientStyleContext.tsx

import { createContext } from "react";

export interface ClientStyleContextData {
  reset: () => void;
}

export default createContext<ClientStyleContextData>({
  reset: () => {},
});
