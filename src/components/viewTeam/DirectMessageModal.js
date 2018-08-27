import React from 'react'
import Downshift from 'downshift';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom'


const DirectMessageModal = ({
  history,
  teamId,
  data: { loading, getTeamMembers },
  onClose
}) => (
  <form>
    <div>
      {!loading && (
        <Downshift
          onChange={(selectedUser) => {
            history.push(`/viewTeam/user/${teamId}/${selectedUser.id}`);
            onClose();
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
              <input {...getInputProps({ placeholder: 'Favorite color ?' })} />
              {isOpen ? (
                <div style={{ border: '1px solid #ccc' }}>
                  {getTeamMembers
                    .filter(i =>
                        !inputValue ||
                        i.username.toLowerCase().includes(inputValue.toLowerCase()))
                    .map((item, index) => (
                      <div
                        {...getItemProps({ item })}
                        key={item.id}
                        style={{
                          backgroundColor: highlightedIndex === index ? 'gray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        }}
                      >
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
  </form>
)

const getTeamMembersQuery = gql`
  query($teamId: Int!) {
    getTeamMembers(teamId: $teamId) {
      id
      username
    }
  }
`;

export default withRouter(graphql(getTeamMembersQuery)(DirectMessageModal));
