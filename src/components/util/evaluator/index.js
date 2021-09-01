export const AreTheyFriends = (friendList, uuid) => {
  friendList.forEach((friend) => {
    if (friend.uuid === uuid) {
      // Friend found
      return true;
    }
  });
  // Return false if it runs through the array without finding the user's uuid
  return false;
}