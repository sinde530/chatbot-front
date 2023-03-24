/* eslint-disable react/no-array-index-key */
import styled from '@emotion/styled';

import { useEffect, useRef, useState } from 'react';

import { sendMessage } from 'src/api/message';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Conversation = styled.div`
    height: 80vh;
    overflow: auto;
`;

const ChatBox = styled.div`
    background-color: #f5f5f5;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 10px;
`;

const UserMessage = styled.p`
    font-size: 1.2rem;
    margin-bottom: 5px;
`;

const BotMessage = styled.p`
    color: #666;
    font-size: 1rem;
`;

const Form = styled.form`
    display: flex;
    // justify-content: center;
    // align-items: center;
    margin-top: 20px;
`;

const Input = styled.textarea`
    padding: 10px;
    font-size: 16px;
    text-align: left;
    flex: 1;

    &:focus {
        outline: none;
    }
`;

// const Input = styled.textarea`
//     // flex: 1;
//     // margin-right: 10px;
//     resize: none;
//     height: 52px;
//     text-align: left;
//     font-size: 16px;
//     padding: 10px;
//     border: 2px solid rgb(90, 103, 234);

//     &:focus {
//         outline: none;
//     }
// `;

// const Input = styled.input`
//     flex: 1;
//     padding: 10px;
//     font-size: 16px;
//     text-align: left;

//     &:focus {
//         outline: none;
//     }
// `;

// const Button = styled.button`
//     background-color: #2ecc71;
//     border: none;
//     border-radius: 5px;
//     color: white;
//     cursor: pointer;
//     padding: 10px;
// `;

export default function Chat() {
    const [userInput, setUserInput] = useState('');
    const [conversation, setConversation] = useState<
        { user: string; bot: string }[]
    >([]);
    const conversationRef = useRef<HTMLDivElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    };

    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();

    //     try {
    //         const botResponse = await sendMessage(
    //             new FormData().append('user_input', userInput),
    //         );
    //         console.log('botResponse', botResponse);

    //         setConversation([
    //             ...conversation,
    //             { user: userInput, bot: botResponse },
    //         ]);
    //         setUserInput('');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop =
                conversationRef.current.scrollHeight;
        }
    }, [conversation]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const botResponse = await sendMessage(userInput);
            console.log('botResponse', botResponse);

            setConversation([
                ...conversation,
                { user: userInput, bot: botResponse.bot_response },
            ]);
            setUserInput('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
        }
    };

    return (
        <Container>
            <Conversation ref={conversationRef}>
                {conversation.map((items, index) => (
                    <ChatBox key={index}>
                        <UserMessage>User: {items.user}</UserMessage>
                        <BotMessage>Bot: {items.bot}</BotMessage>
                    </ChatBox>
                ))}
            </Conversation>

            <Form onSubmit={handleSubmit}>
                <Input
                    value={userInput}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
                {/* <Button type="submit">Send</Button> */}
            </Form>
        </Container>
    );
}
