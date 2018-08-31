import React from 'react'
import Downshift from 'downshift'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const DirectMessageModal = ({history, teamId, data: { loading, getTeamMembers }, onClose}) => (
  <DirectMessageModalContainer>
    <DirectMessageModalTitle>Talk</DirectMessageModalTitle>
    <div>
      {!loading && (
                           <Downshift
                             onChange={(selectedUser) => {
                   history.push(`/viewTeam/user/${teamId}/${selectedUser.id}`)
                   onClose()
                 }}
                           >
                             {({
                                             getInputProps,
                                             getItemProps,
                                             isOpen,
                                             inputValue,
                                             selectedItem,
                                             highlightedIndex,
                                           }) => (
                                             <div>
                                               <Input {...getInputProps({ placeholder: 'Search users..' })} />
                                               {isOpen ? (
                                                             <div style={{ border: '1px solid #ccc' }}>
                                         {getTeamMembers
                              .filter(i => !inputValue ||
                                i.username.toLowerCase().includes(inputValue.toLowerCase()))
                              .map((item, index) => (
                                <div {...getItemProps({ item})} key={item.id} style={{ backgroundColor: highlightedIndex === index ? 'gray' : 'white', fontWeight: selectedItem === item ? 'bold' : 'normal' }}>
                                  {item.username}
                                </div>
                              ))}
                                       </div>
                                                           ) : null}
                                             </div>
                                           )}
                           </Downshift>
                         )}
    </div>
  </DirectMessageModalContainer>
)

const DirectMessageModalTitle = styled.h1`
  font-size: 30px
  color: #4a4a4a
  padding: 10px 0
`

const DirectMessageModalContainer = styled.div`
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  margin: 100px
`

const Input = styled.input`
  border: 1px solid #c5c7c8
  border-radius: 3px
  height: 27px
  color: #060605
  font-size: 12px
  font-weight: 200
  line-height: 1.5
  padding: 0 15px
  margin: 8px 0
  width: 100%
  &:focus {
    outline: none
  }
  -webkit-box-shadow: 0 0 0px 1000px white inset
`

const getTeamMembersQuery = gql`
  query($teamId: Int!) {
    getTeamMembers(teamId: $teamId) {
      id
      username
    }
  }
`

export default withRouter(graphql(getTeamMembersQuery)(DirectMessageModal))
