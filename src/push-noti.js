export const enablePushNoti = () => {
    if (Notification.permission === 'denied') {
        alert('noti blocked')
        return
    }

    navigator.serviceWorker.ready
        .then(res => {
            if(!res.pushManager){
                alert('noti not supported')
                return
            }
            res.pushManager.subscribe({userVisibleOnly:true})
                .then(res => {
                        console.log(res);
                        //save id
                })
                .catch(error => {
                    console.error(error)
                })
        })
}