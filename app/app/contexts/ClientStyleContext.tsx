// https://github.com/mui/material-ui/issues/30436#issuecomment-1003339715

import { createContext } from "react";

export interface ClientStyleContextData {
  reset: () => void;
}

export default createContext<ClientStyleContextData>({
  reset: () => {},
});
