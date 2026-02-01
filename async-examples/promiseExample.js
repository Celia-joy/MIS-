function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: 1, username, name: "Joe doe" });
        }, 2000);
    });
}