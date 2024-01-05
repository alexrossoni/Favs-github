import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
}

html, body, #root {
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

body {
  background: #0d2636;
  font-size: 14px;
  -webkit-font-smoothing: antialiased !important;
}

body, input, button {
  color: #222;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
}

button {
  cursor: pointer;
}

// Estilização da barra de rolagem lateral
::-webkit-scrollbar {
    width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    -webkit-border-radius: 10px;
    border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}
`;