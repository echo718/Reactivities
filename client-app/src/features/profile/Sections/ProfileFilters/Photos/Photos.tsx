import { observer } from 'mobx-react-lite';
import {
    Button,
    Card,
    CardContent,
    CardGroup,
    Grid,
    GridColumn,
    Header,
    Image
} from 'semantic-ui-react';
import { DropZone } from './DropZone';
import { Photo, Profile } from '../../../../../app/models/user';
import { useStore } from '../../../../../app/stores/store';

export const Photos = observer((props: { profile: Profile | null }) => {
    const { profileStore, commonStore, userStore } = useStore();
    const { deletePhotos, setMain } = profileStore;

    return (
        <Grid
            style={{
                width: '100%',
                paddingBottom: '5%'
            }}
        >
            <GridColumn floated="left" width={10}>
                <Header as="h2">
                    {' '}
                    <Image
                        src={'/assets/gallery.png'}
                        size="mini"
                        verticalAlign="middle"
                    />
                    Photos
                </Header>
            </GridColumn>
            <GridColumn floated="right" width={4}>
                <DropZone />
            </GridColumn>
            <CardGroup>
                {props.profile?.photos?.map((photo: Photo, index: number) => (
                    <Card key={index}>
                        <CardContent>
                            <Image src={photo.url} />
                        </CardContent>
                        <CardContent extra>
                            <div className="ui two buttons">
                                <Button
                                    basic
                                    color="green"
                                    disabled={photo.isMain}
                                    onClick={() => {
                                        setMain(photo.id);
                                        //location.reload();
                                    }}
                                >
                                    Set to Main
                                </Button>
                                <Button
                                    icon="trash"
                                    basic
                                    color="red"
                                    onClick={() => deletePhotos(photo.id)}
                                ></Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </CardGroup>
        </Grid>
    );
});
