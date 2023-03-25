/* eslint-disable react/no-array-index-key */

import { useRef, useState } from 'react';

import { sendMessage1 } from 'src/api/message';
import {
    BotMessage,
    ChatBox,
    Container,
    Conversation,
    Form,
    Input,
    UserMessage,
} from './styled';

export default function ConfirmChat() {
    const [userInput, setUserInput] = useState('');
    const [conversation, setConversation] = useState<
        { user: string; bot: string }[]
    >([]);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [newData, setNewData] = useState('');
    const conversationRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const botResponse = await sendMessage1(userInput);
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

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
        if (confirmMessage) {
            console.log('33');
            setNewData('yes');
        }
    };

    // const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setUserInput(event.target.value);
    // };

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
            </Form>
        </Container>
    );
}
