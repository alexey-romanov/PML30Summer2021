import _ from 'lodash';
import * as $ from 'jquery';
import { initSocket } from './sockets';

function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

function onLoad() {
    initSocket();
}


$(onLoad)
