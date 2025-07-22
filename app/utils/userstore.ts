// userStore.ts
let users: { username: string; password: string }[] = []; // Store multiple users

export const setRegisteredUser = (username: string, password: string) => {
  users.push({ username, password }); // Add new user to the array
};

export const getUsers = () => users; // Retrieve all users
