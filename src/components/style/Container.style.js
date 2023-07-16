import styled from 'styled-components';


export const AppContainer  = styled.div`
    width: 100%;
    background-color: #e1e1e1;
`
export const Logo = styled.img`
    width: 100px;
`

export const CustomDiv = styled.div`
    width: ${(props)=> props.width}px;
    padding: ${(props)=> props.padding}px;   
    margin: ${(props)=> props.margin};         
    text-align: ${(props) => props.textAlign};
    border: ${(props) => props.border};
    border-radius: ${(props) => props.borderR};
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
    font-size: 22px;
    font-weight: bold;
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
    margin: ${(props)=> props.margin};

    @media screen and (max-width: 720px) {
        width: 100%;
    } 
`

export const Button = styled.button`
    width: ${(props) => props.width}px;
    height: 50px;
    margin: ${(props) => props.margin};
    background-color: #9619de;
    color: #ffffff;
    border: none;
    border-radius: ${(props) => props.borderR};
    cursor: pointer;
    padding: 10px;
    &:hover{
        background-color: #8400af;
    }
`

export const CustomButton = styled.button`
    width: ${(props) => props.width}px;
    height: 50px;
    margin: ${(props) => props.margin};
    background-color: ${(props) => props.bgc};
    color: #ffffff;
    border: none;
    border-radius: ${(props) => props.borderR};
    cursor: pointer;
    padding: 10px;
    &:hover{
        background-color: #8400af;
    }
`
export const FlexForm = styled.form`
    display: flex;
    justify-content: ${(props)=> props.js};    
    align-items: ${(props)=> props.ai};
    flex-direction: ${(props)=> props.flexdr};
    width: ${(props)=> props.width};
    margin: ${(props)=> props.margin};
`
export const Input = styled.input`
    padding: 12px;
    font-size: 16px;
    width: 300px;
    margin: 12px 0;
    border: none;
    border-radius: 5px;
`

export const P = styled.p`
    margin: ${(props)=> props.margin};
    padding: ${(props)=> props.padding};   
    text-align: ${(props) => props.textAlign};
    font-size: ${(props) => props.fontSize};
`

export const Modal = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;

&.hidden {
  display: none;
}
`;

export const HiddenModal = styled(Modal)`
  display: none;
`;
