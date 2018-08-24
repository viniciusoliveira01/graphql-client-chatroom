import React, { Component, Fragment } from 'react'

import decode from 'jwt-decode'
import Modal from 'react-responsive-modal'

import Channels from '../components/viewTeam/Channels'
import Teams from '../components/viewTeam/Teams'
import AddChannelModal from '../components/viewTeam/AddChannelModal'
import InvitePeopleModal from '../components/viewTeam/InvitePeopleModal'

import {allTeamsQuery} from '../graphql/Team'

class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openAddChannelModal: '',
      openInvitePeopleModal: ''
    }
  }

  handleOpenChannelModal = () => {
    this.setState({ openAddChannelModal: true });
  };

  handleCloseChannelModal = () => {
    this.setState({ openAddChannelModal: false });
  };

  handleOpenInvitePeopleModal = () => {
    this.setState({ openInvitePeopleModal: true });
  };

  handleCloseInvitePeopleModal = () => {
    this.setState({ openInvitePeopleModal: false });
  };

  render () {
    const { teams, team } = this.props
    const { openAddChannelModal, openInvitePeopleModal } = this.state

    let username = ''
    let isOwner = false
    try {
      const token = localStorage.getItem('token')
      const { user } = decode(token)
      // eslint-disable-next-line prefer-destructuring
      username = user.username
      isOwner = user.id === team.owner
    } catch (err) {}

    return <React.Fragment>
             <Teams key='team-sidebar' teams={teams} />
             <Channels
               key='channels-sidebar'
               teamName={team.name}
               username={username}
               teamId={team.id}
               channels={team.channels}
               isOwner={isOwner}
               users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
               onChannelAddClick={this.handleOpenChannelModal}
               onInvitePeopleClick={this.handleOpenInvitePeopleModal} />
             <Modal open={openAddChannelModal} onClose={this.handleCloseChannelModal} center>             
               <AddChannelModal teamId={team.id} onClose={this.handleCloseChannelModal}/>
             </Modal>
             <Modal open={openInvitePeopleModal} onClose={this.handleCloseInvitePeopleModal} center>             
               <InvitePeopleModal teamId={team.id} onClose={this.handleCloseInvitePeopleModal}/>
             </Modal>
           </React.Fragment>
  }
}

export default Sidebar
