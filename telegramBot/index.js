const   TelegramApi     =   require('node-telegram-bot-api')

const   token   =   '5232541251:AAFvmWUTPjSloPoDcfLDZyGbU8MOx71SjDQ'

const   bot     =   new TelegramApi(token, {polling: true})

const chats     =   {}

const   registrationOption  =   {
    reply_markup: JSON.stringify({
        inline_keyboard:    [
            [{text: 'Kursni tanlang', callback_data: 'Web dasturlash'}],
            [{text: 'Kursni tanlang', callback_data: 'C++'}],
            [{text: 'Kursni tanlang', callback_data: 'Python'}],
            [{text: 'Kursni tanlang', callback_data: 'Java'}],
        ]
    })
}



const   start =  ()   =>    {
    bot.setMyCommands([
        {command: '/registration', description: 'Kurslardan registratsiyadan otish'}
    ])

    bot.on('message',   async  msg   =>  {
        const text  =   msg.text;
        const chatId    =   msg.chat.id;
    
        if  (text   === '/start')   {
            await    bot.sendMessage(chatId, 'Bizning o‘quv kursimizga xush kelibsiz!');
        }
        if  (text   === '/registration')     {
            return    bot.sendMessage(chatId, 'hello', registrationOption);
        }
        
        return  bot.sendMessage(chatId, 'try again!');
    })

    bot.on('callback_query', msg    =>  {
        const   data    =   msg.data;
        const   chatId  =   msg.message.chat.id;

        bot.sendMessage(chatId, `${data}`)
    })
}

start()