import '../styles/Title.css';

function Title() {
    return (
        <div id="flex-box">
            <img id="flayn_image" src={require('../images/flayn_logo.png')}></img>
            <p>ANIMINDER = Favorite-anime-tracker[-1]</p>
        </div>
    );
  }
  
  export default Title;