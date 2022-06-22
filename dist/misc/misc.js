function displayTime() {
    const elt = document.getElementById('clock')
    const elt_date = document.getElementById('date')
    const now = new Date()
    elt.innerHTML = `${now.getHours()}:${now.getMinutes()}:${String(now.getSeconds()).padStart(2, '0')},${String(now.getMilliseconds()).slice(0, 1)}`
    elt_date.innerHTML = now.toLocaleDateString()
    setTimeout(displayTime, 100)
}
function pathname() {
    const path = document.getElementById('pathname')
    path.innerHTML = String(window.location.pathname).slice(1)
}
function navigatorInfo() {
    const elt = document.getElementById('navigator')
    const elt2 = document.getElementById('navigator2')
    const elt3 = document.getElementById('navigator3')
    const elt4 = document.getElementById('navigator4')
    const elt5 = document.getElementById('navigator5')
    const elt6 = document.getElementById('navigator6')
    const elt7 = document.getElementById('navigator7')
    elt.innerHTML = `<b>Appname:</b> ${window.navigator.appName}`
    elt2.innerHTML = `<b>AppCodename:</b> ${window.navigator.appCodeName}`
    elt3.innerHTML = `<b>App Version:</b> ${window.navigator.appVersion}`
    elt4.innerHTML = `<b>Platform:</b> ${window.navigator.platform}`
    elt5.innerHTML = `<b>Useragent:</b> ${window.navigator.userAgent}`
    elt6.innerHTML = `<b>Online:</b> ${window.navigator.onLine}`
    navigator.geolocation.getCurrentPosition((position) => {
        elt7.innerHTML = `<b>Geolocation:</b> ${position.coords.latitude}, ${position.coords.longitude}`
    })
}

function screenInfo() {
    const elt1 = document.getElementById('screen1')
    const elt2 = document.getElementById('screen2')
    const elt3 = document.getElementById('screen3')
    elt1.innerHTML = `W: ${window.screen.width}, H: ${window.screen.height}`
    elt2.innerHTML = `Available W: ${window.screen.availWidth}, Available H: ${window.screen.availHeight}`
    elt3.innerHTML = `Colordepth: ${window.screen.colorDepth}`
}
// function changeTitle() {
//    let now = new Date();
//    document.title =`${now.getHours()}:${now.getMinutes()}:${String(now.getSeconds()).padStart(2, '0')},${String(now.getMilliseconds()).slice(0, 1)}`; 
//    setTimeout(changeTitle, 100);
// }
window.onload = function () {
    displayTime()
    pathname()
    navigatorInfo()
    screenInfo()
    console.log(document.getElementById('common-styles').classList)
    //   changeTitle
}
document.onmousemove = function (event) {
    const mpx = document.getElementById('mousePageX')
    const mpy = document.getElementById('mousePageY')
    const mcx = document.getElementById('mouseClientX')
    const mcy = document.getElementById('mouseClientY')
    const msx = document.getElementById('mouseScreenX')
    const msy = document.getElementById('mouseScreenY')
    const mox = document.getElementById('mouseOffsetX')
    const moy = document.getElementById('mouseOffsetY')
    const mx = document.getElementById('mouseX')
    const my = document.getElementById('mouseY')
    const elementAtMousePosition = document.getElementById('elementUnderMouse')
    /* X and clinetX is the same */
    mx.innerHTML = `X:........${String(event.x).padStart(4, ' ')}`
    my.innerHTML = `Y:........${String(event.y).padStart(4, ' ')}`
    mcx.innerHTML = `Client X:.${String(event.clientX).padStart(4, ' ')}`
    mcy.innerHTML = `Client Y:.${String(event.clientY).padStart(4, ' ')}`
    /* Screen is unaffected by zoom || Screen is coordinates for the OS's screen */
    msx.innerHTML = `Screen X:.${String(event.screenX).padStart(4, ' ')}`
    msy.innerHTML = `Screen Y:.${String(event.screenY).padStart(4, ' ')}`
    /* Page is the coordinates for the scrolled client */
    mpx.innerHTML = `Page X:...${String(event.pageX).padStart(4, ' ')}`
    mpy.innerHTML = `Page Y:...${String(event.pageY).padStart(4, ' ')}`
    /* Offset is coordinates for the zoomed page */
    mox.innerHTML = `Offset X:.${String(event.offsetX).padStart(4, ' ')}`
    moy.innerHTML = `Offset Y:.${String(event.offsetY).padStart(4, ' ')}`
    elementAtMousePosition.innerHTML = `${document.elementFromPoint(event.x, event.y)  }\n${  window.getComputedStyle(document.elementFromPoint(event.x, event.y), null)}`

}
window.addEventListener('keydown', (e) => {
    document.getElementById('keypressed-selector').innerHTML = e.key
})
window.addEventListener('click', (e) => {
    document.getElementById('mouseclicked-selector').innerHTML = 'Left click'
})
window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    document.getElementById('mouseclicked-selector').innerHTML = 'Right click'
    return false
})
window.addEventListener('onselect', (e) => {
    alert(2)

    if (window.getSelection) { // The HTML5 standard API
        document.title = window.getSelection().toString()
    }
    else if (document.selection) { // This is the IE-specific technique.
        document.title = document.selection.createRange().text
    }
})

function fetch_todos() {
    let req = new XMLHttpRequest();
    req.open("GET", `https://jsonplaceholder.typicode.com/todos/${Math.floor(Math.random()*100)}`)
    req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status === 200) {
            console.log(JSON.parse(req.responseText || req.responseXML));
        }
    }
    req.send(null);
}