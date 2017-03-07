function getWelcomeMessage() {
    return Promise.resolve({
        message: 'Welcome to the SFDC Sandbox API!',
        version: 0.1
    });
}

export { getWelcomeMessage }
