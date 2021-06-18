import { io, Socket } from "socket.io-client"
import * as $ from 'jquery';

export function initSocket() {
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
