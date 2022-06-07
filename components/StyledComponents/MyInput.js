import styled from 'styled-components/native';
import { Dimensions } from "react-native";

const MyInput = styled.TextInput.attrs({
    placeholderTextColor: "white"})`
    border-width: 0;
    border-Bottom-Color: white;
    border-bottom-width: ${Dimensions.get('window').width/300};
    width: ${(80 * Dimensions.get('window').width)/100};
    height: ${(6 * Dimensions.get('window').height)/100};
    justify-content: center;
    align-items: center; 
    padding-left: 10;
    font-size: 24;
    color: white;
`;

export default MyInput;