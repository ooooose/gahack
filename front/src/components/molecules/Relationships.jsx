import React,{ useState } from 'react';

import FollowButton from '../atoms/buttons/FollowButton';
import UnFollowButton from '../atoms/buttons/UnFollowButton';

const Relationships = ({ user, userId }) => {
  const [followState, setFollowState] = useState(user.following);

  const generateParams = () => {
    const relationshipParams = {
      picture_id: userId,
    };
    return relationshipParams;
  };

  return (
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
  )
};

export default Relationships;