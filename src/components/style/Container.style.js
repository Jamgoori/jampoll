import styled from 'styled-components';


export const AppContainer  = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #e1e1e1;
`
export const Logo = styled.img`
    width: 100px;
`

export const CustomDiv = styled.div`
    width: ${(props)=> props.width}px;
    padding: ${(props)=> props.padding}px;   
    margin: ${(props)=> props.margin};     
    @media screen and (max-width: 720px) {
        width: 100%;
    } 
`
export const FlexBetweenDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.width}px;
  margin: 0 auto;
`
export const H1 = styled.h1`
    text-align: center;
    margin : ${(props)=> props.margin};
`
export const Header2 = styled.header`
    width: 100%;
    background-color: #dedede;
    height: 60px;
`

export const FlexDiv = styled.div`
    display: flex;
    justify-content: ${(props)=> props.js};    
    align-items: ${(props)=> props.ai};
    flex-direction: ${(props)=> props.flexdr};
    width: ${(props)=> props.width};
`

export const Button = styled.button`
    width: ${(props) => props.width}px;
    height: 50px;
    margin: ${(props) => props.margin}px;
    background-color: #9619de;
    color: #ffffff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    padding: 10px;
    &:hover{
        background-color: #8400af;
    }
`

export const Input = styled.input`
    height: 30px;
    padding-left: 16px;
    width: 300px;
`
