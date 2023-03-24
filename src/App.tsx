import styled from '@emotion/styled';

import Chat from './component/Chat';

export const Container = styled.div({
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    background: 'red',
    alignItems: 'center',
    margin: '0 auto',
});

export default function App() {
    return (
        <Container>
            <Chat />
        </Container>
    );
}
