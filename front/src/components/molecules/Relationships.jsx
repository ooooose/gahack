import React,{ useState, useContext } from 'react';

import FollowButton from '../atoms/buttons/FollowButton';
import UnFollowButton from '../atoms/buttons/UnFollowButton';
import { AuthContext } from '../../App';

const Relationships = ({ user, userId }) => {
  const [followState, setFollowState] = useState(user.following);
  const { currentUser } = useContext(AuthContext);

  const generateParams = () => {
    const relationshipParams = {
      picture_id: userId,
    };
    return relationshipParams;
  };

  return (
    <>
    { currentUser.email === "guest@example.com" ? (
      <>
      </>
    ) : (
      <>
        { followState ? (
          <UnFollowButton
            userId={userId}
            params={generateParams()}
            setFollowState={setFollowState}
          />
        ) : (
          <FollowButton 
            userId={userId}
            params={generateParams()} 
            setFollowState={setFollowState}
          />
        )}
      </>
    ) }
    </>
  )
};

export default Relationships;