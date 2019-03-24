import React from 'react';
import { Container, TypeTitle, TypeDescription, TypeImage, RequestButton, RequestButtonText } from './style';
import ubserxImage from '../../assets/uberx.png';

export default class Details extends React.Component {
    render()  {
        return (
            <Container >
                <TypeTitle>Economy</TypeTitle>
                <TypeDescription>Affordable, compact rides</TypeDescription>
                <TypeImage source={ubserxImage} />
                <TypeTitle>UberX</TypeTitle>
                <TypeDescription>₹ 60.00</TypeDescription>

                <RequestButton onPress={() => {}} >
                    <RequestButtonText>Continue with uber</RequestButtonText>
                </RequestButton>
            </Container>
        )
    }
}

