export const formatPrivacy = (num) => {
  return num === '2' ? 'Private': num === '1' ? 'Friends-only' : 'Public';
}