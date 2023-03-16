import React, { useState, useContext, memo, useCallback } from 'react';

import FollowButton from '../atoms/buttons/FollowButton';
import UnFollowButton from '../atoms/buttons/UnFollowButton';
import { AuthContext } from '../../App';

const Relationships = memo(({ user, userId }) => {
  const [followState, setFollowState] = useState(user.following);
  const { currentUser } = useContext(AuthContext);

  const generateParams = useCallback(() => {
    const relationshipParams = {
      picture_id: userId,
    };
    return relationshipParams;
  }, [userId]);

  return (
    <>
      {currentUser.email === 'guest@example.com' ? (
        <></>
      ) : (
        <>
          {followState ? (
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
      )}
    </>
  );
});

export default Relationships;
