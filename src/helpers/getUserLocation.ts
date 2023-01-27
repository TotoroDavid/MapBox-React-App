

export const getUserLocation = async (): Promise<[number, number]> => {

    return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                resolve([coords.longitude, coords.latitude])
            },
            (err) => {
                alert(`cannot get the location`)
                console.log(err)
                reject()
            }
        )

    })
}