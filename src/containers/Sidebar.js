import React, { Component, Fragment } from 'react'

import decode from 'jwt-decode'
import Modal from 'react-responsive-modal'

import Channels from '../components/viewTeam/Channels'
import Teams from '../components/viewTeam/Teams'
import AddChannelModal from '../components/viewTeam/AddChannelModal'
import InvitePeopleModal from '../components/viewTeam/InvitePeopleModal'
import DirectMessageModal from '../components/viewTeam/DirectMessageModal'

import {allTeamsQuery} from '../graphql/Team'

class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openAddChannelModal: '',
      openInvitePeopleModal: '',
      openDirectMessageModal: ''
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

  handleOpenDirectMessageModal = () => {
    this.setState({ openDirectMessageModal: true });
  };

  handleCloseDirectMessageModal = () => {
    this.setState({ openDirectMessageModal: false });
  };

  render () {
    const { teams, team, username } = this.props
    const { openAddChannelModal, openInvitePeopleModal, openDirectMessageModal } = this.state

    return <React.Fragment>
             <Teams key='team-sidebar' teams={teams} />
             <Channels
               key='channels-sidebar'
               teamName={team.name}
               username={username}
               teamId={team.id}
               channels={team.channels}
               isOwner={team.admin}
               users={team.directMessageMembers}
               onChannelAddClick={this.handleOpenChannelModal}
               onInvitePeopleClick={this.handleOpenInvitePeopleModal}
               onDirectMessage={this.handleOpenDirectMessageModal} />
             <Modal open={openAddChannelModal} onClose={this.handleCloseChannelModal} center>             
               <AddChannelModal teamId={team.id} onClose={this.handleCloseChannelModal}/>
             </Modal>
             <Modal open={openInvitePeopleModal} onClose={this.handleCloseInvitePeopleModal} center>             
               <InvitePeopleModal teamId={team.id} onClose={this.handleCloseInvitePeopleModal}/>
             </Modal>
             <Modal open={openDirectMessageModal} onClose={this.handleCloseDirectMessageModal} center>             
               <DirectMessageModal teamId={team.id} onClose={this.handleCloseDirectMessageModal}/>
             </Modal>
           </React.Fragment>
  }
}

export default Sidebar
