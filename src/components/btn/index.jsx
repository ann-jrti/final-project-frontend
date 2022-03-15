import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import styled from 'styled-components'
import { css } from '@emotion/react';
import { Switch } from '@mui/material';


const Buttonn = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  ${props =>
        props.primary &&
        css`
      background: palevioletred;
      color: white;
    `};
`
const Text = styled.div`
    text-decoration: ${props => props.done && 'line-through'}
`

const SwitchStyled = styled(Switch)({
    color: 'red',
})

const MyComponent = styled('div')({
    color: 'darkslategray',
    backgroundColor: 'aliceblue',
    padding: 8,
    borderRadius: 4,
});

const MyComponentt = styled(Button)({
    color: 'darkslategray'
});

export default function Btn() {
    return (
        <>
            <Button color="error" variant="contained">Hello World</Button>
            <Buttonn>Boton</Buttonn>
            <MyComponent>Styled div</MyComponent>
            <MyComponentt>hds</MyComponentt>
            <SwitchStyled></SwitchStyled>
            <Text>Hola</Text>
        </>

    )
}
