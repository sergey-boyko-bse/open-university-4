import React from 'react'

const Notification = ({ notification }) => {
    if (!notification || !notification.message) {
        return null
    }
  
    return (
        <div className={`message message-${notification.type}`}>
            {notification.message}
        </div>
    )
}

export default Notification