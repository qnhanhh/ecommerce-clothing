export const enablePushNoti = () => {
    console.log('noti');
    if (Notification.permission === 'denied') {
        alert('noti blocked')
        return
    }

    navigator.serviceWorker.ready
        .then(res => {
            console.log('ready');
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