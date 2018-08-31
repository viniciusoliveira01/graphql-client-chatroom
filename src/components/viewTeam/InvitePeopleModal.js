import React from 'react'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import styled from 'styled-components'
import LaddaButton, { S, ZOOM_IN } from 'react-ladda'

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
  <InvitePeopleModalContainer>
    <InvitePeopleModalTitle>Invite users to your chatroom</InvitePeopleModalTitle>
    <Input
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
      name='email'
      placeholder='user email' />
    {touched.email && errors.email ? errors.email[0] : null}
    <LaddaButton
      data-color="purple"
      data-size={S}
      data-style={ZOOM_IN}
      data-spinner-size={30}
      data-spinner-color="white"
      data-spinner-lines={12} 
      onClick={this.handleSubmit}>
        Invite friends
    </LaddaButton>
  </InvitePeopleModalContainer>
)

const InvitePeopleModalTitle = styled.h1`
  font-size: 30px
  color: #4a4a4a
  padding: 10px 0
`

const InvitePeopleModalContainer = styled.div`
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
