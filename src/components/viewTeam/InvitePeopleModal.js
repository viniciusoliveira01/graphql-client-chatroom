import React from 'react'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'

import normalizeErrors from '../../normalizeErrors'
import {allTeamsQuery} from '../../graphql/Team'

const InvitePeopleModal = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  touched,
  errors
}) => (
  <form>
    <h1>Invite users to slack</h1>
    <input
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
      name='email'
      placeholder='user email' />
    {touched.email && errors.email ? errors.email[0] : null}
    <button disabled={isSubmitting} onClick={handleSubmit}>
      Invite user
    </button>
  </form>
)

const addTeamMemberMutation = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`

export default compose(
  graphql(addTeamMemberMutation),
  withFormik({
    mapPropsToValues: () => ({ email: '' }),
    handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting, setErrors }) => {
      const response = await mutate({
        variables: { teamId, email: values.email }
      })

      const { ok, errors } = response.data.addTeamMember
      if (ok) {
        onClose()
        setSubmitting(false)
      } else {
        setSubmitting(false)
        setErrors(normalizeErrors(errors))
      }
    }
  })
)(InvitePeopleModal)
