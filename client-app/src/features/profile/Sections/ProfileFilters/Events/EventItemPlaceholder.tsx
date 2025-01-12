import _ from 'lodash';
import { Component } from 'react';
import {
    CardHeader,
    CardContent,
    PlaceholderParagraph,
    PlaceholderLine,
    PlaceholderImage,
    PlaceholderHeader,
    Card,
    Placeholder
} from 'semantic-ui-react';

export default class EventItemPlaceholder extends Component {
    state = { loading: false };

    handleLoadingClick = () => {
        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({ loading: false });
        }, 3000);
    };

    render() {
        return (
            <>
                <Card style={{ cursor: 'pointer' }}>
                    <Placeholder>
                        <PlaceholderImage rectangular />
                    </Placeholder>
                    <CardContent>
                        <CardHeader>
                            <PlaceholderHeader>
                                <PlaceholderLine length="short" />
                            </PlaceholderHeader>
                        </CardHeader>
                    </CardContent>
                    <CardContent extra>
                        <Placeholder>
                            <PlaceholderParagraph>
                                <PlaceholderLine length="short" />
                            </PlaceholderParagraph>
                        </Placeholder>
                    </CardContent>
                    <CardContent extra>
                        <Placeholder>
                            <PlaceholderParagraph>
                                <PlaceholderLine length="short" />
                            </PlaceholderParagraph>
                        </Placeholder>
                    </CardContent>
                </Card>
                <Card style={{ cursor: 'pointer' }}>
                    <Placeholder>
                        <PlaceholderImage rectangular />
                    </Placeholder>
                    <CardContent>
                        <CardHeader>
                            <PlaceholderHeader>
                                <PlaceholderLine length="very short" />
                            </PlaceholderHeader>
                        </CardHeader>
                    </CardContent>
                    <CardContent extra>
                        <Placeholder>
                            <PlaceholderParagraph>
                                <PlaceholderLine length="short" />
                            </PlaceholderParagraph>
                        </Placeholder>
                    </CardContent>
                    <CardContent extra>
                        <Placeholder>
                            <PlaceholderParagraph>
                                <PlaceholderLine length="short" />
                            </PlaceholderParagraph>
                        </Placeholder>
                    </CardContent>
                </Card>
                <Card>
                    <Placeholder>
                        <PlaceholderImage square />
                    </Placeholder>
                    <CardContent>
                        <CardHeader>
                            <PlaceholderHeader>
                                <PlaceholderLine length="very short" />
                            </PlaceholderHeader>
                        </CardHeader>
                    </CardContent>
                    <CardContent extra>
                        <Placeholder>
                            <PlaceholderParagraph>
                                <PlaceholderLine length="short" />
                            </PlaceholderParagraph>
                        </Placeholder>
                    </CardContent>
                    <CardContent extra>
                        <Placeholder>
                            <PlaceholderParagraph>
                                <PlaceholderLine length="short" />
                            </PlaceholderParagraph>
                        </Placeholder>
                    </CardContent>
                </Card>
            </>
        );
    }
}
