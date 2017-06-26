/* Clarence.jsx */
import React from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const CardExampleWithAvatar = () => (
  <MuiThemeProvider>
    <Card>
      <CardHeader
        title="URL Avatar"
        subtitle="Subtitle"
        avatar="images/jsa-128.jpg"
      />
      <CardMedia
        overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
      >
        <img src="http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Reptiles/A-G/desert%20tortoise%20eating.ngsversion.1454538378008.adapt.1900.1.jpg" alt="" />
      </CardMedia>
      <CardTitle title="Desert Tortoises are really really cool" subtitle="Card subtitle" />
      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>
      <CardActions>
        <FlatButton label="Action1" onTouchTap={() => console.log('action one clicked')} />
        <FlatButton label="Action2" />
      </CardActions>
    </Card>
  </MuiThemeProvider>
);

export default CardExampleWithAvatar;
