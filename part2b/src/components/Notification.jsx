const Notification = ({errorMessage}) => {
    if(errorMessage === null) {
        return null
      }
        const notificationStyle = {
              color: errorMessage.toLowerCase().includes('added') ? 'green' :
              errorMessage.toLowerCase().includes('removed') ? 'red' :
              errorMessage.toLowerCase().includes('updated') ? 'green' : 'black',
              background: 'lightgrey',
              fontSize: 20,
              borderStyle: 'solid',
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
        }
    
      return (
        <div style={notificationStyle}>
          {errorMessage}
        </div>
      )
}

export default Notification