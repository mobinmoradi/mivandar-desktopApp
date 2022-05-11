const options = { year: 'numeric', month: 'numeric', day: 'numeric',weekday: 'long'};


function display_ct() {
    var x = new Date().toLocaleDateString('fa-IR', options)
    document.getElementById('ct').innerHTML = x;
}