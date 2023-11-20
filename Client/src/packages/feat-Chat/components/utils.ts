import { I_Room, Members, Role, User } from "./types";

export const changeMessageLength = (message: string) => {
  if (message.length > 60) {
    message = message.substring(0, 60);
    return message + "...";
  }
  return message;
};

// function to change date format
export const convertDateTime = (dateString: string): string => {
  const now = new Date();
  const inputDate = new Date(dateString);

  const isSameDate = now.toDateString() === inputDate.toDateString();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = yesterday.toDateString() === inputDate.toDateString();

  if (isSameDate) {
    const hours = inputDate.getHours().toString().padStart(2, "0");
    const minutes = inputDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else if (isYesterday) {
    return `yesterday`;
  } else {
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const day = inputDate.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }
};
export const isOwner = (membership: I_Room, userId: number) => {
  const member = membership.members.find(
    (member) => member.user.intraId === userId
  );
  return member?.isOwner ? true : false;
};

export const isAdmin = (memberships: I_Room, userId: number) => {
  const member = memberships.members.find(
    (member) => member.user.intraId === userId
  );

  return member?.isAdmin ? true : false;
}

export const isFriend = (friends: Array<User>, userId: number) => {
  const isFriend = friends.find((member) => member.intraId === userId);
  return isFriend ? true : false;
};

export const isMuted = (room: I_Room, userId: number) => {
  const member = room.members.find(
    (member) => member.user.intraId === userId
  );
  const date = new Date();
  if (member)
    return (new Date(member.timeMute) > date) ? true : false;
}

export const checkUserRole = (membership: I_Room, userId: number) => {
  const member = membership?.members.find(
    (member) => member.user.intraId === userId
  );
  switch (true) {
    case member?.isOwner:
      return "owner";
    case member?.isAdmin:
      return "admin";
    default:
      return "member";
  }
};
