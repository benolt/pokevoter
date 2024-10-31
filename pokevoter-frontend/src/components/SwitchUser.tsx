import {
    Button,
    Container,
    Dialog,
    Flex,
    Heading,
    Section,
    Text,
    TextField,
} from '@radix-ui/themes'
import { useState } from 'react'
import useAuthContext from '../contexts/useAuthContext'

export const SwitchUser = () => {
    const { userId, changeUserId } = useAuthContext()
    const [newUserId, setNewUserId] = useState(userId ?? '')

    return (
        <Container>
            <Section pt="6" pb="4">
                <Flex
                    direction={{
                        initial: 'column',
                        md: 'row',
                    }}
                    gap="4"
                >
                    <Heading align="center">Hello {userId}!</Heading>

                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button variant="soft" color="cyan">
                                Switch Profile
                            </Button>
                        </Dialog.Trigger>

                        <Dialog.Content maxWidth="450px">
                            <Dialog.Title>Switch Profile</Dialog.Title>

                            <Flex direction="column" gap="3">
                                <label>
                                    <Text
                                        as="div"
                                        size="2"
                                        mb="1"
                                        weight="bold"
                                    >
                                        Username
                                    </Text>
                                    <TextField.Root
                                        defaultValue={userId}
                                        placeholder="Enter your username"
                                        onChange={(event) => {
                                            setNewUserId(event.target.value)
                                        }}
                                        maxLength={100}
                                    />
                                </label>
                            </Flex>

                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button
                                        disabled={newUserId === ''}
                                        onClick={() =>
                                            changeUserId &&
                                            changeUserId(newUserId)
                                        }
                                    >
                                        Save
                                    </Button>
                                </Dialog.Close>
                            </Flex>
                        </Dialog.Content>
                    </Dialog.Root>
                </Flex>
            </Section>
        </Container>
    )
}
