import React, { PureComponent } from 'react';
import { TextField, Button, Typography } from '../';
import Container from '@material-ui/core/Container';
import ReactS3 from 'react-s3';
import { S3Config } from '../../config';
import { getMeals } from '../../api';

interface State {
  titleInput: string;
  priceInput: string;
  descriptionInput: string;
  fileInput: File | undefined;
  [key: string]: string | File | undefined;
}

export class NewDish extends PureComponent<{}, State> {
  state = {
    titleInput: '',
    priceInput: '',
    descriptionInput: '',
    fileInput: undefined
  };

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { id, value }
    } = e;
    this.setState({ [id]: value });
  };

  componentDidMount() {
    getMeals();
  }

  upload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e && e.target && e.target.files) {
      this.setState({ fileInput: e.target.files[0] });
    }
    // ReactS3.uploadFile(e.target.files[0], S3Config)
    //   .then((data: any) => {
    //     console.log('data', data);
    //     alert('Upload Successful');
    //     const imageURL = data.location;
    //   })
    //   .catch((err) => console.log('err', err));
  };

  onPost = () => {
    const { titleInput, priceInput, descriptionInput, fileInput } = this.state;
  };

  render(): JSX.Element {
    const { titleInput, priceInput, descriptionInput } = this.state;

    console.log('RENDER', this.state);
    return (
      <Container maxWidth="sm">
        <Typography text="New Menu Item" variant="h4" />
        <TextField
          label="Title"
          handleInput={this.onInputChange}
          value={titleInput}
        />
        <TextField
          label="Price"
          preLabel="$"
          handleInput={this.onInputChange}
          value={priceInput}
        />
        <TextField
          label="Description"
          multiline
          handleInput={this.onInputChange}
          value={descriptionInput}
        />
        <input type="file" onChange={this.upload} />
        <div style={{ marginTop: 40 }}>
          <Button
            onClick={() => alert('clicked')}
            color="primary"
            label="create"
          />
        </div>
      </Container>
    );
  }
}
