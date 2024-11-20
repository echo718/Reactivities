import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Segment, Header, Comment, Form, Button } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { CustomTextArea } from '../../../app/common/form/CustomTextArea';

interface Props {
    activityId: string;
}

export default observer(function ActivityDetailedChat({ activityId }: Props) {
    const { commentStore } = useStore();

    useEffect(() => {
        if (activityId) {
            commentStore.createHubConnection(activityId);
        }

        return () => {
            commentStore.clearComments();
        };
    }, [commentStore, activityId]);

    return (
        <>
            <Segment
                textAlign="center"
                attached="top"
                inverted
                color="teal"
                style={{ border: 'none' }}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached clearing>
                <Comment.Group>
                    {commentStore.comments.map((comment) => {
                        return (
                            <Comment key={comment.id}>
                                <Comment.Avatar
                                    src={comment.image ?? '/assets/user.png'}
                                />
                                <Comment.Content>
                                    <Comment.Author
                                        as={Link}
                                        to={`/profiles/${comment.userName}`}
                                    >
                                        {comment.userName}
                                    </Comment.Author>
                                    <Comment.Metadata>
                                        <div>
                                            {comment.createdAt.toString()}
                                        </div>
                                    </Comment.Metadata>
                                    <Comment.Text>{comment.body}</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action>Reply</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>
                        );
                    })}

                    <Formik
                        onSubmit={(values: any, { resetForm }) =>
                            commentStore
                                .addComment(values)
                                .then(() => resetForm())
                        }
                        initialValues={{ body: '' }}
                    >
                        {({ isSubmitting, isValid, handleSubmit }) => (
                            <Form className="ui form" onSubmit={handleSubmit}>
                                <CustomTextArea
                                    placeholder="Add Comment"
                                    name="body"
                                    rows={2}
                                />
                                <Button
                                    loading={isSubmitting}
                                    disabled={isSubmitting || !isValid}
                                    content="Add Reply"
                                    labelPosition="left"
                                    icon="edit"
                                    primary
                                    type="submit"
                                    floated="right"
                                />
                            </Form>
                        )}
                    </Formik>
                </Comment.Group>
            </Segment>
        </>
    );
});
