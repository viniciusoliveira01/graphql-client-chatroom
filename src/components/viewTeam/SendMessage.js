import React from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'

const AddChannelModal = ({channelName, values, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
  <SendMessageWrapper>
    <Input
      placeholder={`Message #${channelName}`}
      name='message'
      value={values.message}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={e => e.keyCode === 13 && !isSubmitting ? handleSubmit(e) : null} />
  </SendMessageWrapper>
)

const SendMessageWrapper = styled.div`
  grid-column: 3
  grid-row: 3
  margin: 20px
`
const Input = styled.input`
  width: 100%
  height: 30px
  font-size: 14px
  padding-left: 10px
  border: 1px solid #ddd
  border-radius: 4px
`

const createMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`

export default compose(
  graphql(createMessageMutation),
  withFormik({
    mapPropsToValues: () => ({ message: '' }),
    handleSubmit: async (values, { props: { channelId, mutate }, setSubmitting, resetForm }) => {
      if (!values.message || !values.message.trim()) {
        setSubmitting(false)
        return
      }

      await mutate({
        variables: { channelId, text: values.message }
      })
      resetForm(false)
    }
  }))(AddChannelModal)
