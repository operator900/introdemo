const Notification = ({ message, error }) => {
    if (message === null) {
        return null
    }
    // Check if the message is an error
    // If it is, set the class to 'error'
    if (error) {
        return (
            <div className={'error'}>
                {message}
            </div>
        )
    }
    return (
        <div className={'notification'}>
            {message}
        </div>
    )
}

export default Notification