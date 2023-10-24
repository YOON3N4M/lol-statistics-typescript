import { createGlobalStyle } from 'styled-components'

const color = {
	orange: '#f06f00',
	sky: '#0093ff',
	mint: '#00bba3',
	red: '#d31a45',
}

export const variable = {
	color,
}

export const GlobalStyles = createGlobalStyle`
  :root{
    --color-orange : "#f06f00";
    --color-sky :"#0093ff";
    --color-mint: "#00bba3";
    --color-red: "#d31a45"
  }

  body{
    padding:0;
    margin:0;
    background-color: #ebeef1;
  }
  ul{
    padding: 0 0;
    margin: 0px
  }
  li{
    list-style: none;
  }

`
