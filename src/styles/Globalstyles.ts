import { createGlobalStyle } from 'styled-components'

const color = {
	orange: '#f06f00',
	sky: '#0093ff',
	mint: '#00bba3',
	red: '#d31a45',
	gray: '#9AA4AF',
	border: '#ebeef1',
	selectBgBlue: '#ecf2ff',
	selectFontBlue: '#4171d6',
	selectBgRed: 'rgb(255, 241, 243)',
	selectFontRed: 'rgb(211, 26, 69)',
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
