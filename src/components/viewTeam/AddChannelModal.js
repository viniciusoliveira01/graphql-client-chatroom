import React from 'react'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import findIndex from 'lodash/findIndex'
import styled from 'styled-components'
import LaddaButton, { S, ZOOM_IN } from 'react-ladda'

import {meQuery} from '../../graphql/Team'

const AddChannelModal = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <AddChannelModalContainer>
    <AddChannelModalTitle>Create Channel</AddChannelModalTitle>
    <Input
      value={values.name}
      onChange={handleChange}
      onBlur={handleBlur}
      name='name'
      placeholder='Channel name' />
    <LaddaButton
      data-color="purple"
      data-size={S}
      data-style={ZOOM_IN}
      data-spinner-size={30}
      data-spinner-color="white"
      data-spinner-lines={12} 
      onClick={this.handleSubmit}>
        Create Channel
    </LaddaButton>

  </AddChannelModalContainer>
)

const AddChannelModalTitle = styled.h1`
  font-size: 30px
  color: #4a4a4a
  padding: 10px 0
`

const AddChannelModalContainer = styled.div`
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

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
    }
  }
`

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: '' }),
    handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting }) => {
      await mutate({
        variables: { teamId, name: values.name },
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel
          if (!ok) {
            return
          }

          const data = store.readQuery({query: meQuery})

          const teamIdx = findIndex(data.me.teams, ['id', teamId])
          data.me.teams[teamIdx].channels.push(channel)
          store.writeQuery({ query: meQuery, data })
        },
        optimisticResponse: {
          createChannel: {
            __typename: 'Mutation',
            ok: true,
            channel: {
              __typename: 'Channel',
              id: -1,
              name: values.name
            }
          }
        }
      })
      onClose()
      setSubmitting(false)
    }
  })
)(AddChannelModal)
