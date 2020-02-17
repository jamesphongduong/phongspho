import React, { useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import { Card, CardMedia, Fab, MenuItem, TextField } from '@material-ui/core';
import { CustomTextField, AppContext } from './';
import { Photo } from '../types';

interface PhotoProps extends Photo {
  editMode: boolean;
  toggleEdit?: () => void;
  onDeleteMade: (id: number) => void;
  onEdit: (id: number, prop: string, newValue: string) => void;
}

type Props = PhotoProps;

export const PhotoCard = (props: Props): JSX.Element => {
  const contextValue = useContext(AppContext);
  const albums = contextValue ? contextValue.state.albums : [];
  const {
    caption,
    imageURL,
    id,
    editMode,
    onDeleteMade,
    album,
    onEdit
  } = props;
  const classes = useStyles();

  const onInputChange = (e): void => {
    const { target } = e;
    console.log('target', target);
    // if album
    if (target.name === 'album') {
      if (target.value !== album) {
        if (id) return onEdit(id, 'album', target.value);
        return;
      }
      return;
    }

    // if caption
    if (target.getAttribute('id') === 'caption') {
      if (id) return onEdit(id, 'caption', target.value);
      return;
    }
  };

  const onDelete = (): void => {
    if (id) onDeleteMade(id);
  };

  const renderDeleteButton = (): JSX.Element => {
    return (
      <Fab
        onClick={onDelete}
        color="secondary"
        aria-label="delete"
        size="medium"
      >
        <Delete />
      </Fab>
    );
  };

  return (
    <Card className={classes.card} raised>
      <div>
        <div className={editMode ? classes.editButtonContainer : classes.hide}>
          {renderDeleteButton()}
        </div>
        <CardMedia className={classes.media} image={imageURL} />
      </div>
      <CustomTextField
        label="Caption"
        id="caption"
        fullWidth
        multiline
        value={caption}
        handleInput={onInputChange}
        InputProps={
          !editMode
            ? {
                readOnly: true,
                disableUnderline: true
              }
            : {}
        }
        InputLabelProps={{
          style: !editMode
            ? {
                display: 'none'
              }
            : {}
        }}
        inputProps={{
          maxLength: 40
        }}
      />
      {editMode && (
        <TextField
          className={classes.inputMargin}
          select
          fullWidth
          name="album"
          label="Album"
          value={album}
          onChange={onInputChange}
        >
          {albums.map((album) => (
            <MenuItem key={album} value={album}>
              {album}
            </MenuItem>
          ))}
        </TextField>
      )}
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    card: {
      position: 'relative',
      margin: 16,
      padding: 16,
      overflow: 'visible',
      alignSelf: 'flex-start'
    },
    media: {
      minHeight: 300,
      minWidth: 300
    },
    hideCaption: {
      display: 'none'
    },
    editButtonContainer: {
      position: 'absolute',
      right: '25px',
      top: '25px'
    },
    hide: {
      display: 'none'
    },
    inputMargin: {
      marginTop: 16
    }
  })
);
