import { AnimeData } from "./MultifacetedAnime";

export interface UserData{
    name : string,
    email : string,
    id : string,
    photoURL : string,
    anime_list : Array<AnimeData>,
    friend_list : Array<string>,
    incoming_friends : Array<string>
}
    