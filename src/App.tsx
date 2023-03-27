import styled from '@emotion/styled';

import Chat from './component/Chat';
import ConfirmChat from './component/ConfirmChat';

export const Container = styled.div({
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    background: '#ffa1a1',
    alignItems: 'center',
    margin: '0 auto',
});

export default function App() {
    return (
        <Container>
            <Chat />
            {/* <ConfirmChat /> */}
        </Container>
    );
}
