import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import {
    Button,
    Card,
    CardContent,
    CardGroup,
    Grid,
    GridColumn,
    Image
} from 'semantic-ui-react';
import { Photo } from '../../../app/models/user';
import { useEffect, useState } from 'react';

export const Photos = observer(() => {
    const { profileStore } = useStore();
    const { loadingProfile, profile, loadPhotos, deletePhotos } = profileStore;
    const [loading, setLoading] = useState(loadingProfile);

    useEffect(() => {
        loadPhotos();
    }, []);

    useEffect(() => {
        setLoading(loadingProfile);
    }, [loadingProfile]);

    return loading ? (
        <LoadingComponent />
    ) : (
        <Grid
            style={{
                width: '100%',
                paddingBottom: '5%'
            }}
        >
            <GridColumn floated="left" width={10}>
                <Image
                    src={'/assets/gallery.png'}
                    size="mini"
                    verticalAlign="middle"
                />
                <span
                    style={{
                        fontSize: '20px',
                        marginLeft: '2%'
                    }}
                >
                    Photos
                </span>
            </GridColumn>
            <GridColumn floated="right" width={4}>
                <Button>Add Photo</Button>
            </GridColumn>
            <CardGroup>
                {profile?.photos?.length == 0
                    ? 'Add photo'
                    : profile?.photos?.map((photo: Photo, index: number) => (
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
