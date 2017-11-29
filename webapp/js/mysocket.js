
class Message {


    constructor() {
        this.show = $('#show');
    }


    myMessage(item) {
        return `
        <div class="my list"><br>
            <pre>${item.message}</pre>
        </div>
        `
    }

    otherMessage(item) {
        return `
        <div class="other list"><br>
            <label>${item.name}:</label>
            <pre>${item.message}</pre>
        </div>
        `
    }

    getDom(item, token) {
        if (token === 'my') {
            return this.myMessage(item);
        } else {
            return this.otherMessage(item);
        }
    }

    say(item, token) {
        let dom = this.getDom(item, token);
        this.show.append(dom);
    }

}


let submit = $('#submit');

let login = $('#login');

let messageDom = $('#message');

let message = new Message();

login.on('click', () => {

    let name = $('#name').val();
    let passwd = $('#passwd').val();

    if ($.trim(passwd) !== '' && $.trim(name) !== '') {
        window.userInfo = {
            name: name
        }

        $('#showUserInfo').html(name);

        $('.mc,.alert').hide();

    }

})

submit.on('click', () => {

    let mes = messageDom.val();

    if ($.trim(mes) === '') {
        return;
    }

    message.say({ message: mes, name: 'fdafa' }, 'my');
    messageDom.val('');

})


var webSocket = io.connect();


webSocket.onopen = () => {
    console.log('链接成功');
    webSocket.send('I am lova');
}
webSocket.onmessage = (res) => {
    console.log(res);
}
webSocket.onclose = () => {
    console.log('oh .. kill webSocket');
}

webSocket.emit('message', { message: new Date().toLocaleString(), state: true });

webSocket.on("server not me", (e) => {
    message.say({ message: e, name: 'fdafa' });
});


webSocket.on('server send', (e) => {
    message.say({ message: e, name: 'fdafa' });
})

webSocket.emit('group');


setTimeout(() => {
    webSocket.emit('login', { login: window.location.href });
}, 2000)

setTimeout(() => {
    webSocket.emit('message', { message: window.navigator.appVersion });
}, 5000)
