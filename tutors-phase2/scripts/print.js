$('document').ready(function () {
    // Attach print event
    $('#ou-content a.st-print').attr('href', 'javascript:tmt_print("self")');
});

function stopError() {
    return true;
}

function tmt_print(bers) {
    window.onerror = stopError;
    if (window.print) {
        eval(bers + ".print()");
    }
    else {
        if (document.all) {
            var OLECMDID_PRINT = 6;
            var OLECMDEXECOPT_DONTPROMPTUSER = 2;
            var OLECMDEXECOPT_PROMPTUSER = 1;
            var WebBrowser = "<OBJECT ID=\"WebBrowser1\" WIDTH=0 HEIGHT=0 CLASSID=\"CLSID:8856F961-340A-11D0-A96B-00C04FD705A2\"><\/OBJECT>";
            document.body.insertAdjacentHTML("beforeEnd", WebBrowser);
            WebBrowser1.ExecWB(OLECMDID_PRINT, OLECMDEXECOPT_PROMPTUSER);
            WebBrowser1.outerHTML = "";
        }
    }
}
