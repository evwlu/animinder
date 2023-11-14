function AccountBlock({dev} : any) {
    return (
        <div key={dev}>
            <h1>Name: {dev.name}</h1>
            <p>Email: {dev.email}</p>
            <p>Anime List: {JSON.stringify(dev.anime_list?.map((num : any) => num.mal_id))}</p>
        </div>
    )
}

export default AccountBlock