import _ from 'lodash';
import * as $ from 'jquery';
import { io, Socket } from "socket.io-client"

function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

function onLoad() {
    let socket = io();

    socket.on('heartbeat', (data) => {
        $("body").prepend(`<p>${data.date}</p>`)
    });

    socket.on('broadcast', (data) => {
        $("body").prepend(`<p>Brodcast${data.date}</p>`)
    });

    $("body").append("<div>Hello</div>");
    $("#MainButton").on('click', (evt) => { console.log("ABC"); })
}


$(onLoad)
