import '../styles/Title.css';

function Title() {
    return (
        <div id="flex-box">
            <img id="flayn_image" src={require('../assets/flayn_logo.png')}></img>
            <p>ANIMINDER</p>
        </div>
    );
  }
  
  export default Title;