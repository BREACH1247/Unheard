import React, { Component } from "react";
import { render } from "react-dom";
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl"
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormLabel } from "@material-ui/core";



export default class CreateRoomPage extends Component {
  deafultVotes = 2;
  
  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: true,
      votesToSkip: this.deafultVotes,

    };
    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this)
    this.handleVoteChange = this.handleVoteChange.bind(this)
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this)
  }
  
  handleVoteChange(e){
      this.setState({ 
        votesToSkip: e.target.value,
      })
  }

  handleGuestCanPauseChange(e){
    this.setState({ 
      guestCanPause: e.target.value === 'true' ? true : false,})
  }

  handleRoomButtonPressed(){
    const requestOptions = {
      method: 'POST', 
      headers: {'Content-Type' :'application/json' },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause

      }),
    }
    fetch('/api/create-room', requestOptions)
    .then((response) => response.json())
    .then((data) => this.props.history.push("/room/" + data.code))
  }
  render() {
    return <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant='h4'>
          Create a room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">
              Guest control of playback state
            </div>
          </FormHelperText>
          <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
          <FormControlLabel value="true" control={<Radio color="primary"/>}
            label="Play/Pause"
            labelPlacement="bottom"
            />
          <FormControlLabel value="false" control={<Radio color="secondary"/>}
            label="No control"
            labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField required={true} 
            type="number"
            onChange={this.handleVoteChange}
            defaultValue = {this.deafultVotes}
            inputProps={{
            min:1,
            style: {textAlign: 'center'}
            }}>
            </TextField>
            <FormHelperText>
                <div align="center">Votes required to skip</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
            <Button color="primary" variant="contained" onClick={this.handleRoomButtonPressed}>Create a room</Button>
        </Grid>
        <Grid item xs={12} align="center">
            <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
        </Grid>
      </Grid>
    </Grid>;
  }
}