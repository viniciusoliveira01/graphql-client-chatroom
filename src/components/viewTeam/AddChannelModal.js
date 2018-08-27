import React from 'react'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import findIndex from 'lodash/findIndex'

import {meQuery} from '../../graphql/Team'

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
