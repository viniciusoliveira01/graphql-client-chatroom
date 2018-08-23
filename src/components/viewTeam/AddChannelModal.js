import React, { Component } from 'react'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import findIndex from 'lodash/findIndex'

import {allTeamsQuery} from '../../graphql/Team'

const AddChannelModal = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <form>
    <input
      value={values.name}
      onChange={handleChange}
      onBlur={handleBlur}
      name='name'
      placeholder='Channel name' />
    <button disabled={isSubmitting} onClick={handleSubmit}>
      Create Channel
    </button>
  </form>
)

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

          const data = store.readQuery({query: allTeamsQuery})

          const teamIdx = findIndex(data.allTeams, ['id', teamId])
          data.allTeams[teamIdx].channels.push(channel)
          store.writeQuery({ query: allTeamsQuery, data })
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
