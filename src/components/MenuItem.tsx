import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';

interface Props {
  price: number;
  title: string;
  description: string;
  image: string;
}

export const MenuItem = (props: Props): JSX.Element => {
  const { price, title, description, image } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card} raised>
      <CardMedia className={classes.media} image={image} />
      <CardContent>
        <div className={classes.titleContainer}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography> {price && `$${price}`}</Typography>
        </div>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          startIcon={<ShoppingCartRoundedIcon />}
        >
          Order
        </Button>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});
