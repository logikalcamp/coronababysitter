import styled from 'styled-components'

export const Collapsable = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:white;
    border-radius: 8px;
    box-shadow: 0px 0px 8px rgba(0,0,0,0.2);
    height: auto;
    clear:both;
    padding: 20px 10px 20px 10px;
    margin-bottom: 20px;
    flex-direction:column;
`
export const ButtonsContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    width: 100%;
`

export const CollapsableHeader = styled.div`
    width: 100%;
    display:flex;
    justify-content: space-between;
    align-items:center;
    height: 30px;
    border-bottom: 1px solid gray;
    padding-bottom:5px;
`

export const Title = styled.div`
    font-size: 24px;
    
`

export const CollapsableContent = styled.div`
    height:100%;
    width: 100%;
    clear:both;

    animation: ${props => props.open ? "toggle-down 0.5s forwards" : "toggle-up 0.5s forwards"};
    -webkit-animation: ${props=> props.open ? "toggle-down 0.5s forwards" : "toggle-up 0.5s forwards"};

    @keyframes toggle-up {
        0% {height: 500px; }
        100% { height: 0px; }
    }
    
    @-webkit-keyframes toggle-up {
        0% {height: 500px; }
        100% { height: 0px; }
    }
        
    @keyframes toggle-down {
        0% {height: 0px; }
        100% { height: 500px; }
    }
    
    @-webkit-keyframes toggle-down {
        0% {height: 0px; }
        100% { height: 500px; }
    }

    & .grid-wrapper {
        height: 100%;
      }

    .ag-body-viewport {
        &::-webkit-scrollbar {
            width: 5px;
        }
        /* Track */
        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
    
        /* Handle */
        &::-webkit-scrollbar-thumb {
            background: #00C2CB;
        }
    
        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    }
`

export const Button = styled.div`
    width: 100px;
    height: 35px;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : '#00C2CB'};
    display:flex;
    align-items:center;
    justify-content:center;
    color:${props => props.color ? props.color : 'whitesmoke'};;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 400;
    cursor:pointer;
    margin-left: 10px;
`

export const ModalBackdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.35);
    top: 0;
    left: 0;
    display:${props=>props.open ? "flex":"none"};
    justify-content: center;
    align-items: center;
    z-index:1000;
`

export const Modal = styled.div`
    width: 550px;
    background-color:white;
    height: 150px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px gray;
    padding: 15px;
    display:${props=>props.open ? "flex":"none"};
    flex-direction: column;
    align-items:center;
    justify-content:space-between;
    @media(max-width:800px){

}
`

export const ContainerTitle = styled.div`
    margin-bottom: 30px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`