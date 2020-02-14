import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import {
  Card,
  CardMedia,
  Fab,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import { CustomTextField } from './';
import { Photo, numOrNull, RootState } from '../types';
import { countries } from '../config/db.js';
import { toggleEdit } from '../redux/actions';
import { connect } from 'react-redux';

interface PhotoProps extends Photo {
  editMode: boolean;
  onCaptionEdit: (id: number, input: string) => void;
  autoFocus: boolean;
  toggleEdit: () => void;
  onEditMade: (id: number) => void;
  onDeleteMade: (id: number) => void;
}

type Props = PhotoProps;

const _PhotoCard = (props: Props): JSX.Element => {
  const {
    caption,
    imageURL,
    id,
    onCaptionEdit,
    autoFocus,
    editMode,
    onEditMade,
    onDeleteMade,
    album
  } = props;
  const classes = useStyles();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value }
    } = e;
    console.log('id', id);
    console.log('value', value);
    if (id) {
      onCaptionEdit(id, value);
      onEditMade(id);
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

  const onAlbumChange = ({ target }): void => {
    if (target.value !== album) {
      return;
    }
    return;
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
        style={{ marginBottom: '0px' }}
        id="caption"
        fullWidth
        multiline
        value={caption}
        handleInput={onInputChange}
        autoFocus={autoFocus}
        InputProps={
          !editMode
            ? {
                readOnly: true,
                disableUnderline: true
              }
            : {}
        }
        inputProps={{
          maxLength: 40
        }}
      />
      {editMode && (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={album}
          onChange={onAlbumChange}
        >
          {countries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      )}
    </Card>
  );
};

const actionCreators = {
  toggleEdit
};

export const PhotoCard = connect(null, actionCreators)(_PhotoCard);

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
    }
  })
);
