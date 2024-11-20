import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Segment, Header, Comment, Form, Loader } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import { Field, FieldProps, Formik } from 'formik';
import * as yup from 'yup';
import { formatDistanceToNow } from 'date-fns';

interface Props {
    activityId: string;
}

export default observer(function ActivityDetailedChat({ activityId }: Props) {
    const { commentStore } = useStore();
    const { createHubConnection, clearComments } = commentStore;

    useEffect(() => {
        if (activityId) {
            createHubConnection(activityId);
        }

        return () => {
            clearComments();
        };
    }, [createHubConnection, activityId]);

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
                <Formik
                    onSubmit={(values: any, { resetForm }) =>
                        commentStore.addComment(values).then(() => {
                            resetForm();
                        })
                    }
                    initialValues={{ body: '' }}
                    validationSchema={yup.object({
                        body: yup.string().required()
                    })}
                >
                    {({ isSubmitting, isValid, handleSubmit }) => (
                        <Form className="ui form" onSubmit={handleSubmit}>
                            <Field name="body">
                                {(props: FieldProps) => (
                                    <div style={{ position: 'relative' }}>
                                        <Loader active={isSubmitting} />
                                        <textarea
                                            placeholder="Enter your comment (Enter to submit,SHIFT + ENTER FOR NEW LINE)"
                                            rows={2}
                                            {...props.field}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === 'Enter' &&
                                                    e.shiftKey
                                                ) {
                                                    return;
                                                }
                                                if (
                                                    e.key === 'Enter' &&
                                                    !e.shiftKey
                                                ) {
                                                    e.preventDefault();
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
                <Comment.Group>
                    {commentStore.comments.map((comment) => {
                        return (
                            <Comment key={comment.id}>
                                {/* <Comment> */}
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
                                            {formatDistanceToNow(
                                                comment.createdAt
                                            )}{' '}
                                            ago
                                        </div>
                                    </Comment.Metadata>
                                    <Comment.Text
                                        style={{ whiteSpace: 'pre-wrap' }}
                                    >
                                        {comment.body}
                                    </Comment.Text>
                                </Comment.Content>
                            </Comment>
                        );
                    })}
                </Comment.Group>
            </Segment>
        </>
    );
});
