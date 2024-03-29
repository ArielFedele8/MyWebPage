function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function openNav(evt) {
  // Declare all variables
  var i, navlinks;

  //Cerca e toglie active da nav-link attivo
  navlinks = document.getElementsByClassName("nav-link");
  for (i = 0; i < navlinks.length; i++) {
    navlinks[i].className = navlinks[i].className.replace(" active", "");
  }

  //aggiunge active al nav-link cliccato
  evt.currentTarget.className += " active";
}

function cliccaSkills() {
  //Cerca l'id defaultOpen e "clicca" quell'elemento
  document.getElementById("defaultOpen").click();
}

function cursore() {
  // set the starting position of the cursor outside of the screen
  let clientX = 100;
  let clientY = 100;
  const innerCursor = document.querySelector(".cursor--small");

  const initCursor = () => {
    // add listener to track the current mouse position
    document.addEventListener("mousemove", (e) => {
      clientX = e.clientX;
      clientY = e.clientY;
    });

    // transform the innerCursor to the current mouse position
    // use requestAnimationFrame() for smooth performance
    const render = () => {
      innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
      // if you are already using TweenMax in your project, you might as well
      // use TweenMax.set() instead
      // TweenMax.set(innerCursor, {
      //   x: clientX,
      //   y: clientY
      // });

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  };

  initCursor();

  let lastX = 0;
  let lastY = 0;
  let isStuck = false;
  let showCursor = false;
  let group, stuckX, stuckY, fillOuterCursor;

  const initCanvas = () => {
    const canvas = document.querySelector(".cursor--canvas");
    const shapeBounds = {
      width: 75,
      height: 75,
    };
    paper.setup(canvas);
    const strokeColor = "rgba(15, 136, 82, 0.5)";
    const strokeWidth = 1;
    const segments = 8;
    const radius = 20;

    // we'll need these later for the noisy circle
    const noiseScale = 150; // speed
    const noiseRange = 4; // range of distortion
    let isNoisy = false; // state

    // the base shape for the noisy circle
    const polygon = new paper.Path.RegularPolygon(
      new paper.Point(0, 0),
      segments,
      radius
    );
    polygon.strokeColor = strokeColor;
    polygon.strokeWidth = strokeWidth;
    polygon.smooth();
    group = new paper.Group([polygon]);
    group.applyMatrix = false;

    const noiseObjects = polygon.segments.map(() => new SimplexNoise());
    let bigCoordinates = [];

    // function for linear interpolation of values
    const lerp = (a, b, n) => {
      return (1 - n) * a + n * b;
    };

    // function to map a value from one range to another range
    const map = (value, in_min, in_max, out_min, out_max) => {
      return (
        ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      );
    };

    // the draw loop of Paper.js
    // (60fps with requestAnimationFrame under the hood)
    paper.view.onFrame = (event) => {
      // using linear interpolation, the circle will move 0.2 (20%)
      // of the distance between its current position and the mouse
      // coordinates per Frame
      lastX = lerp(lastX, clientX, 0.2);
      lastY = lerp(lastY, clientY, 0.2);
      group.position = new paper.Point(lastX, lastY);
    };
  };

  initCanvas();
}

var pippo;

function start() {
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    cursore();
  }
  cliccaSkills();


}

function sendMail() {

  if (document.getElementById("name").value != "" &&
    document.getElementById("email").value != "" &&
    document.getElementById("message").value != "" &&
    document.getElementById("invalidCheck").checked == true) {
      
    emailjs.init("yWCKH1wtPbUb5NEyu");

    var params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };



    const serviceID = "service_tx0kgsn";
    const templateID = "template_qr3bs27";

    emailjs.send(serviceID, templateID, params)
      .then(res => {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        document.getElementById("invalidCheck").checked = false;
        console.log(res);
        alert("Your message sent successfully!!")

      })
      .catch(err => console.log(err));
  }

}



window.onload = start;

