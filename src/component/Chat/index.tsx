/* eslint-disable react/no-array-index-key */
import styled from '@emotion/styled';

import { useState } from 'react';

import { sendMessage } from 'src/api/message';

export const Container = styled.div({
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    background: 'red',
    alignItems: 'center',
    margin: '0 auto',
});

export const ChatBox = styled.div({
    width: 'calc(100% - 115px)',
    // maxWidth: '1728px',
    // background: 'blue',
    // width: 'auto',
});

export default function Chat() {
    const [userInput, setUserInput] = useState('');
    const [conversation, setConversation] = useState<
        { user: string; bot: string }[]
    >([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    return (
        <Container>
            {conversation.map((items, index) => (
                <ChatBox key={index}>
                    <p>User: {items.user}</p>
                    <p>Bot: {items.bot}</p>
                </ChatBox>
            ))}

            <form onSubmit={handleSubmit}>
                <input type="text" value={userInput} onChange={handleChange} />
                <button type="submit">Send</button>
            </form>
        </Container>
    );
}
