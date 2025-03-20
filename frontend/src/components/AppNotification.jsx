import '../index.css'

const AppNotification = ({message, notif_type})=>{

    if (!message){
        return null
    }

    if (notif_type==='error'){
        return(
        <div data-testid='notif' className='error'>
            {message}
        </div> 
        )
        }

    else if (notif_type==='notification'){
        return(
            <div className='notif'>
                {message}
            </div> 
            )
        }
        return null
    }
    

export default AppNotification