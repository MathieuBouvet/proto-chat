const getUserName = (user) => user.name ?? user.email ?? "N/A";
const status = (user) => (user.online ? "online" : "offline");

export { getUserName, status };
