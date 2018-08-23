import React, { Component, Fragment } from 'react'

import decode from 'jwt-decode'
import Modal from 'react-responsive-modal'

import Channels from '../components/viewTeam/Channels'
import Teams from '../components/viewTeam/Teams'
import AddChannelModal from '../components/viewTeam/AddChannelModal'

import {allTeamsQuery} from '../graphql/Team'

class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openAddChannelModal: ''
    }
  }

  onOpenModal = () => {
    this.setState({ openAddChannelModal: true });
  };

  onCloseModal = () => {
    this.setState({ openAddChannelModal: false });
  };

  render () {
    const { teams, team } = this.props
    const { openAddChannelModal } = this.state

    let username = ''
    try {
      const token = localStorage.getItem('token')
      const { user } = decode(token)
      // eslint-disable-next-line prefer-destructuring
      username = user.username
    } catch (err) {}

    return <React.Fragment>
             <Teams key='team-sidebar' teams={teams} />
             <Channels
               key='channels-sidebar'
               teamName={team.name}
               username={username}
               teamId={team.id}
               channels={team.channels}
               users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
               onChannelAddClick={this.onOpenModal} />
             <Modal open={openAddChannelModal} onClose={this.onCloseModal} center>             
               <AddChannelModal teamId={team.id} onClose={this.onCloseModal}/>
             </Modal>
           </React.Fragment>
  }
}

export default Sidebar
