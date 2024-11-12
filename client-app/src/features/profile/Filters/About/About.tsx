import { useStore } from '../../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Button, Grid, GridColumn, Header, Image } from 'semantic-ui-react';
import { LoadingComponent } from '../../../../app/layout/LoadingComponent';
import { useEffect, useState } from 'react';

export const About = observer(
    (props: {
        userName: string;
        bio?: string;
        displayName?: string;
        isHostLogin: boolean;
    }) => {
        const { profileStore } = useStore();
        const {} = profileStore;
        const [displayName, setDisplayName] = useState(props.displayName);
        const [isHostLogin, setIsHostLogin] = useState(props.isHostLogin);

        useEffect(() => {
            setDisplayName(props.displayName);
            setIsHostLogin(props.isHostLogin);
        }, [props.displayName, props.isHostLogin]);

        return displayName ? (
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
                        <Button onClick={() => {}}>Update Profile</Button>
                    </GridColumn>
                )}
            </Grid>
        ) : (
            <LoadingComponent content="Loading profile" />
        );
    }
);
