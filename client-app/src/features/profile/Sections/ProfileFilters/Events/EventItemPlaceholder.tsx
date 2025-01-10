import _ from 'lodash';
import { Component } from 'react';
import {
    CardMeta,
    CardHeader,
    CardGroup,
    CardDescription,
    CardContent,
    PlaceholderParagraph,
    PlaceholderLine,
    PlaceholderImage,
    PlaceholderHeader,
    Card,
    Image,
    Placeholder
} from 'semantic-ui-react';

const cards = [
    {
        avatar: '/images/avatar/large/helen.jpg',
        date: 'Joined in 2013',
        header: 'Helen',
        description: 'Primary Contact'
    },
    {
        avatar: '/images/avatar/large/matthew.png',
        date: 'Joined in 2013',
        header: 'Matthew',
        description: 'Primary Contact'
    },
    {
        avatar: '/images/avatar/large/molly.png',
        date: 'Joined in 2013',
        header: 'Molly',
        description: 'Primary Contact'
    }
];

export default class EventItemPlaceholder extends Component {
    state = { loading: false };

    handleLoadingClick = () => {
        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({ loading: false });
        }, 3000);
    };

    render() {
        const { loading } = this.state;

        return (
            <>
                <CardGroup doubling itemsPerRow={3} stackable>
                    {_.map(cards, (card) => (
                        <Card key={card.header}>
                            {loading ? (
                                <Placeholder>
                                    <PlaceholderImage square />
                                </Placeholder>
                            ) : (
                                <Image src={card.avatar} />
                            )}

                            <CardContent>
                                {loading ? (
                                    <Placeholder>
                                        <PlaceholderHeader>
                                            <PlaceholderLine length="very short" />
                                            <PlaceholderLine length="medium" />
                                        </PlaceholderHeader>
                                        <PlaceholderParagraph>
                                            <PlaceholderLine length="short" />
                                        </PlaceholderParagraph>
                                    </Placeholder>
                                ) : (
                                    <>
                                        <CardHeader>{card.header}</CardHeader>
                                        <CardMeta>{card.date}</CardMeta>
                                        <CardDescription>
                                            {card.description}
                                        </CardDescription>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </CardGroup>
            </>
        );
    }
}
