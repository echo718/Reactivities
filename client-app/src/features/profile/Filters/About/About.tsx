import { observer } from 'mobx-react-lite';
import { Button, Grid, GridColumn, Header, Image } from 'semantic-ui-react';
import { LoadingComponent } from '../../../../app/layout/LoadingComponent';
import { useEffect, useState } from 'react';
import { UpdateProfileForm } from './UpdateProfileForm';

interface AboutProps {
    userName: string;
    bio?: string;
    displayName?: string;
    isHostLogin: boolean;
}

export const About = observer((props: AboutProps) => {
    const [displayName, setDisplayName] = useState(props.displayName);
    const [bio, setBio] = useState(props.bio);
    const [isHostLogin, setIsHostLogin] = useState(props.isHostLogin);
    const [showUpdateProfileForm, setShowUpdateProfileForm] = useState(false);

    useEffect(() => {
        setDisplayName(props.displayName);
        setIsHostLogin(props.isHostLogin);
        setBio(props.bio);
    }, [props.displayName, props.isHostLogin, props.bio]);

    return displayName ? (
        <>
            <Grid
                style={{
                    width: '100%',
                    paddingBottom: '5%'
                }}
            >
                <GridColumn floated="left" width={10}>
                    <Header as="h2">
                        <Image
                            src={'/assets/AboutImage.jpg'}
                            size="mini"
                            verticalAlign="middle"
                        />
                        {props.displayName} Profile
                    </Header>
                </GridColumn>
                {isHostLogin && (
                    <GridColumn floated="right" width={4}>
                        <Button
                            onClick={() => {
                                setShowUpdateProfileForm(true);
                            }}
                        >
                            Update Profile
                        </Button>
                    </GridColumn>
                )}
            </Grid>
            {showUpdateProfileForm && (
                <UpdateProfileForm
                    displayName={displayName}
                    bio={bio}
                    onCancel={() => setShowUpdateProfileForm(false)}
                />
            )}
        </>
    ) : (
        <LoadingComponent content="Loading profile" />
    );
});
