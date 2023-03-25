import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const Conversation = styled.div`
    height: 80vh;
    overflow: auto;
`;

export const ChatBox = styled.div`
    background-color: #f5f5f5;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 10px;
`;

export const UserMessage = styled.p`
    font-size: 1.2rem;
    margin-bottom: 5px;
`;

export const BotMessage = styled.p`
    color: #666;
    font-size: 1rem;
`;

export const Form = styled.form`
    display: flex;
    // justify-content: center;
    // align-items: center;
    margin-top: 20px;
`;

export const Input = styled.textarea`
    padding: 10px;
    font-size: 16px;
    text-align: left;
    flex: 1;

    &:focus {
        outline: none;
    }
`;
